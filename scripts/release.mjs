#!/usr/bin/env node

/**
 * Paramanu Release Script
 *
 * Usage:
 *   node scripts/release.mjs                     # Interactive mode (local)
 *   node scripts/release.mjs --ci --type <type>  # CI mode (no prompts, no OTP)
 *
 * Release types: alpha, rc, patch, minor, major
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { execSync } from "node:child_process"
import { createInterface } from "node:readline"
import { join, resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, "..")

// --- Helpers ---

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf-8"))
}

function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n")
}

function exec(cmd, opts = {}) {
  return execSync(cmd, { cwd: rootDir, encoding: "utf-8", stdio: "pipe", ...opts })
}

function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

// --- Version Logic ---

function parseSemver(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta|rc)\.(\d+))?$/)
  if (!match) throw new Error(`Invalid semver: ${version}`)
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
    prerelease: match[4] || null,
    prereleaseNum: match[5] != null ? parseInt(match[5]) : null,
  }
}

function formatSemver({ major, minor, patch, prerelease, prereleaseNum }) {
  const base = `${major}.${minor}.${patch}`
  return prerelease != null ? `${base}-${prerelease}.${prereleaseNum}` : base
}

function bumpVersion(current, type) {
  const v = parseSemver(current)

  switch (type) {
    case "alpha":
      if (v.prerelease === "alpha") {
        return formatSemver({ ...v, prereleaseNum: v.prereleaseNum + 1 })
      }
      if (v.prerelease) {
        throw new Error(`Cannot create alpha from ${v.prerelease} prerelease`)
      }
      return formatSemver({ ...v, patch: v.patch + 1, prerelease: "alpha", prereleaseNum: 0 })

    case "rc":
      if (v.prerelease === "rc") {
        return formatSemver({ ...v, prereleaseNum: v.prereleaseNum + 1 })
      }
      if (v.prerelease) {
        return formatSemver({ ...v, prerelease: "rc", prereleaseNum: 0 })
      }
      return formatSemver({ ...v, patch: v.patch + 1, prerelease: "rc", prereleaseNum: 0 })

    case "patch":
      if (v.prerelease) {
        return formatSemver({ ...v, prerelease: null, prereleaseNum: null })
      }
      return formatSemver({ ...v, patch: v.patch + 1 })

    case "minor":
      return formatSemver({
        major: v.major,
        minor: v.minor + 1,
        patch: 0,
        prerelease: null,
        prereleaseNum: null,
      })

    case "major":
      return formatSemver({
        major: v.major + 1,
        minor: 0,
        patch: 0,
        prerelease: null,
        prereleaseNum: null,
      })

    default:
      throw new Error(`Unknown release type: ${type}`)
  }
}

// --- Package Updates ---

function getPackagePaths() {
  const packagesDir = join(rootDir, "packages")
  const paths = [join(rootDir, "package.json")]

  for (const name of readdirSync(packagesDir)) {
    const pkgPath = join(packagesDir, name, "package.json")
    try {
      statSync(pkgPath)
      paths.push(pkgPath)
    } catch {
      // skip directories without package.json
    }
  }

  return paths
}

function updateVersions(newVersion) {
  const packagePaths = getPackagePaths()

  for (const pkgPath of packagePaths) {
    const pkg = readJson(pkgPath)
    pkg.version = newVersion
    writeJson(pkgPath, pkg)
  }

  // Update storybook manager version constants
  const managerFiles = [
    join(rootDir, "apps/storybook-react/.storybook/manager.ts"),
    join(rootDir, "apps/storybook-vanilla/.storybook/manager.ts"),
  ]

  for (const file of managerFiles) {
    let content = readFileSync(file, "utf-8")
    content = content.replace(
      /const PARAMANU_VERSION = "[^"]*"/,
      `const PARAMANU_VERSION = "${newVersion}"`,
    )
    writeFileSync(file, content)
  }

  return [...packagePaths, ...managerFiles]
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2)
  const isCI = args.includes("--ci") || !!process.env.CI
  const typeArgIdx = args.indexOf("--type")
  const typeArg = typeArgIdx !== -1 ? args[typeArgIdx + 1] : null

  const rootPkg = readJson(join(rootDir, "package.json"))
  const currentVersion = rootPkg.version

  if (!currentVersion) {
    console.error("Error: No version found in root package.json")
    process.exit(1)
  }

  console.log(`\nCurrent version: ${currentVersion}\n`)

  // Get release type
  const validTypes = ["alpha", "rc", "patch", "minor", "major"]
  let releaseType = typeArg

  if (!releaseType) {
    if (isCI) {
      console.error("Error: --type is required in CI mode")
      process.exit(1)
    }

    console.log("Available release types:")
    for (const type of validTypes) {
      try {
        const next = bumpVersion(currentVersion, type)
        console.log(`  ${type.padEnd(8)} -> ${next}`)
      } catch (e) {
        console.log(`  ${type.padEnd(8)} -> (not available: ${e.message})`)
      }
    }

    releaseType = await prompt("\nRelease type: ")
  }

  if (!validTypes.includes(releaseType)) {
    console.error(
      `Error: Invalid release type "${releaseType}". Must be one of: ${validTypes.join(", ")}`,
    )
    process.exit(1)
  }

  const newVersion = bumpVersion(currentVersion, releaseType)
  const tag = `v${newVersion}`

  console.log(`Bumping: ${currentVersion} -> ${newVersion}\n`)

  // Check for clean working tree
  const status = exec("git status --porcelain").trim()
  if (status) {
    console.error("Error: Working tree is not clean. Commit or stash changes first.")
    process.exit(1)
  }

  // Build packages (skip in CI since workflow builds before running this script)
  if (!isCI) {
    console.log("Building packages...")
    exec("pnpm turbo build --filter='./packages/*'", { stdio: "inherit" })
    console.log("")
  }

  // Update versions in all package.json files and storybook managers
  const updatedPaths = updateVersions(newVersion)
  console.log(`Updated ${updatedPaths.length} files`)

  // Stage and commit
  const relativePaths = updatedPaths.map((p) => p.replace(rootDir + "/", ""))
  exec(`git add ${relativePaths.join(" ")}`)
  exec(`git commit -m "chore: release ${tag}"`)
  console.log(`Committed version bump`)

  // Publish
  try {
    if (isCI) {
      console.log("\nPublishing with provenance (CI mode)...")
      exec("pnpm -r publish --no-private --access public --provenance", { stdio: "inherit" })
    } else {
      const otp = await prompt("\nNPM OTP: ")
      if (!otp) {
        throw new Error("OTP is required for local publishing")
      }
      console.log("\nPublishing...")
      exec(`pnpm -r publish --no-private --access public --otp ${otp}`, { stdio: "inherit" })
    }
  } catch (error) {
    console.error("\nPublish failed! Reverting version bump...")
    console.error(
      "Note: Some packages may have been published already. Check npm for partial publishes.",
    )
    exec("git reset --hard HEAD~1")
    console.error("Version bump commit reverted.")
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }

  // Tag and push
  exec(`git tag ${tag}`)
  console.log(`\nCreated tag: ${tag}`)

  exec("git push origin HEAD --follow-tags")
  console.log(`Pushed to origin with tag ${tag}`)

  console.log(`\nReleased ${tag} successfully!\n`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
