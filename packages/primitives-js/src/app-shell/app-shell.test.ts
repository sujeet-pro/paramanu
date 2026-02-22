import { describe, it, expect } from "vitest"
import {
  shellClasses,
  shellModuleClasses,
  appShellHeaderClasses,
  appShellHeaderModuleClasses,
  appShellSidebarClasses,
  appShellSidebarModuleClasses,
  appShellMainClasses,
  appShellMainModuleClasses,
  appShellFooterClasses,
  appShellFooterModuleClasses,
} from "./app-shell.classes.js"

describe("shellClasses", () => {
  it("returns default classes (sidebar-start)", () => {
    const result = shellClasses()
    expect(result).toBe("pm-shell pm-shell--sidebar-start")
  })

  it("applies sidebar-start position", () => {
    expect(shellClasses({ sidebarPosition: "start" })).toContain("pm-shell--sidebar-start")
  })

  it("applies sidebar-end position", () => {
    expect(shellClasses({ sidebarPosition: "end" })).toContain("pm-shell--sidebar-end")
  })

  it("applies sidebar-collapsed modifier", () => {
    expect(shellClasses({ sidebarCollapsed: true })).toContain("pm-shell--sidebar-collapsed")
  })

  it("does not include sidebar-collapsed when false", () => {
    expect(shellClasses({ sidebarCollapsed: false })).not.toContain("pm-shell--sidebar-collapsed")
  })

  it("always includes base class", () => {
    expect(shellClasses()).toMatch(/^pm-shell\s/)
  })

  it("combines multiple options", () => {
    const result = shellClasses({ sidebarPosition: "end", sidebarCollapsed: true })
    expect(result).toBe("pm-shell pm-shell--sidebar-end pm-shell--sidebar-collapsed")
  })
})

describe("shellModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-shell": "pm_abc_shell",
    "pm-shell--sidebar-start": "pm_abc_sidebar_start",
    "pm-shell--sidebar-end": "pm_abc_sidebar_end",
    "pm-shell--sidebar-collapsed": "pm_abc_sidebar_collapsed",
  }

  it("returns mapped default classes", () => {
    const result = shellModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_shell pm_abc_sidebar_start")
  })

  it("maps sidebar-end class correctly", () => {
    const result = shellModuleClasses(mockClassMap, { sidebarPosition: "end" })
    expect(result).toContain("pm_abc_sidebar_end")
  })

  it("maps sidebar-collapsed class correctly", () => {
    const result = shellModuleClasses(mockClassMap, { sidebarCollapsed: true })
    expect(result).toContain("pm_abc_sidebar_collapsed")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-shell": "pm_abc_shell",
    }
    const result = shellModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_shell")
    expect(result).not.toContain("undefined")
  })
})

describe("appShellHeaderClasses", () => {
  it("returns default classes", () => {
    const result = appShellHeaderClasses()
    expect(result).toBe("pm-shell__header")
  })

  it("applies sticky modifier", () => {
    expect(appShellHeaderClasses({ sticky: true })).toContain("pm-shell__header--sticky")
  })

  it("does not include sticky when false", () => {
    expect(appShellHeaderClasses({ sticky: false })).not.toContain("pm-shell__header--sticky")
  })
})

describe("appShellHeaderModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-shell__header": "pm_abc_header",
    "pm-shell__header--sticky": "pm_abc_sticky",
  }

  it("returns mapped default classes", () => {
    const result = appShellHeaderModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_header")
  })

  it("maps sticky class correctly", () => {
    const result = appShellHeaderModuleClasses(mockClassMap, { sticky: true })
    expect(result).toContain("pm_abc_sticky")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-shell__header": "pm_abc_header",
    }
    const result = appShellHeaderModuleClasses(sparseMap, { sticky: true })
    expect(result).toContain("pm_abc_header")
    expect(result).not.toContain("undefined")
  })
})

describe("appShellSidebarClasses", () => {
  it("returns default classes (md width)", () => {
    const result = appShellSidebarClasses()
    expect(result).toBe("pm-shell__sidebar pm-shell__sidebar--md")
  })

  it("applies sm width", () => {
    expect(appShellSidebarClasses({ width: "sm" })).toContain("pm-shell__sidebar--sm")
  })

  it("applies md width", () => {
    expect(appShellSidebarClasses({ width: "md" })).toContain("pm-shell__sidebar--md")
  })

  it("applies lg width", () => {
    expect(appShellSidebarClasses({ width: "lg" })).toContain("pm-shell__sidebar--lg")
  })

  it("applies collapsed modifier", () => {
    expect(appShellSidebarClasses({ collapsed: true })).toContain("pm-shell__sidebar--collapsed")
  })

  it("does not include collapsed when false", () => {
    expect(appShellSidebarClasses({ collapsed: false })).not.toContain(
      "pm-shell__sidebar--collapsed",
    )
  })

  it("combines multiple options", () => {
    const result = appShellSidebarClasses({ width: "lg", collapsed: true })
    expect(result).toBe("pm-shell__sidebar pm-shell__sidebar--lg pm-shell__sidebar--collapsed")
  })
})

describe("appShellSidebarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-shell__sidebar": "pm_abc_sidebar",
    "pm-shell__sidebar--sm": "pm_abc_sm",
    "pm-shell__sidebar--md": "pm_abc_md",
    "pm-shell__sidebar--lg": "pm_abc_lg",
    "pm-shell__sidebar--collapsed": "pm_abc_collapsed",
  }

  it("returns mapped default classes", () => {
    const result = appShellSidebarModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_sidebar pm_abc_md")
  })

  it("maps width classes correctly", () => {
    const result = appShellSidebarModuleClasses(mockClassMap, { width: "lg" })
    expect(result).toContain("pm_abc_lg")
  })

  it("maps collapsed class correctly", () => {
    const result = appShellSidebarModuleClasses(mockClassMap, { collapsed: true })
    expect(result).toContain("pm_abc_collapsed")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-shell__sidebar": "pm_abc_sidebar",
    }
    const result = appShellSidebarModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_sidebar")
    expect(result).not.toContain("undefined")
  })
})

describe("appShellMainClasses", () => {
  it("returns the main class", () => {
    expect(appShellMainClasses()).toBe("pm-shell__main")
  })
})

describe("appShellMainModuleClasses", () => {
  it("returns mapped main class", () => {
    const classMap = { "pm-shell__main": "pm_abc_main" }
    expect(appShellMainModuleClasses(classMap)).toBe("pm_abc_main")
  })

  it("returns empty string for missing entry", () => {
    expect(appShellMainModuleClasses({})).toBe("")
  })
})

describe("appShellFooterClasses", () => {
  it("returns the footer class", () => {
    expect(appShellFooterClasses()).toBe("pm-shell__footer")
  })
})

describe("appShellFooterModuleClasses", () => {
  it("returns mapped footer class", () => {
    const classMap = { "pm-shell__footer": "pm_abc_footer" }
    expect(appShellFooterModuleClasses(classMap)).toBe("pm_abc_footer")
  })

  it("returns empty string for missing entry", () => {
    expect(appShellFooterModuleClasses({})).toBe("")
  })
})
