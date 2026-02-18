import { describe, it, expect } from "vitest"
import {
  appShellClasses,
  appShellModuleClasses,
  appShellHeaderClasses,
  appShellHeaderModuleClasses,
  appShellSidebarClasses,
  appShellSidebarModuleClasses,
  appShellMainClasses,
  appShellMainModuleClasses,
  appShellFooterClasses,
  appShellFooterModuleClasses,
} from "./app-shell.classes.js"

describe("appShellClasses", () => {
  it("returns default classes (sidebar-start)", () => {
    const result = appShellClasses()
    expect(result).toBe("pm-app-shell pm-app-shell--sidebar-start")
  })

  it("applies sidebar-start position", () => {
    expect(appShellClasses({ sidebarPosition: "start" })).toContain(
      "pm-app-shell--sidebar-start",
    )
  })

  it("applies sidebar-end position", () => {
    expect(appShellClasses({ sidebarPosition: "end" })).toContain("pm-app-shell--sidebar-end")
  })

  it("applies sidebar-collapsed modifier", () => {
    expect(appShellClasses({ sidebarCollapsed: true })).toContain(
      "pm-app-shell--sidebar-collapsed",
    )
  })

  it("does not include sidebar-collapsed when false", () => {
    expect(appShellClasses({ sidebarCollapsed: false })).not.toContain(
      "pm-app-shell--sidebar-collapsed",
    )
  })

  it("always includes base class", () => {
    expect(appShellClasses()).toMatch(/^pm-app-shell\s/)
  })

  it("combines multiple options", () => {
    const result = appShellClasses({ sidebarPosition: "end", sidebarCollapsed: true })
    expect(result).toBe(
      "pm-app-shell pm-app-shell--sidebar-end pm-app-shell--sidebar-collapsed",
    )
  })
})

describe("appShellModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-app-shell": "pm_abc_shell",
    "pm-app-shell--sidebar-start": "pm_abc_sidebar_start",
    "pm-app-shell--sidebar-end": "pm_abc_sidebar_end",
    "pm-app-shell--sidebar-collapsed": "pm_abc_sidebar_collapsed",
  }

  it("returns mapped default classes", () => {
    const result = appShellModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_shell pm_abc_sidebar_start")
  })

  it("maps sidebar-end class correctly", () => {
    const result = appShellModuleClasses(mockClassMap, { sidebarPosition: "end" })
    expect(result).toContain("pm_abc_sidebar_end")
  })

  it("maps sidebar-collapsed class correctly", () => {
    const result = appShellModuleClasses(mockClassMap, { sidebarCollapsed: true })
    expect(result).toContain("pm_abc_sidebar_collapsed")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-app-shell": "pm_abc_shell",
    }
    const result = appShellModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_shell")
    expect(result).not.toContain("undefined")
  })
})

describe("appShellHeaderClasses", () => {
  it("returns default classes", () => {
    const result = appShellHeaderClasses()
    expect(result).toBe("pm-app-shell__header")
  })

  it("applies sticky modifier", () => {
    expect(appShellHeaderClasses({ sticky: true })).toContain("pm-app-shell__header--sticky")
  })

  it("does not include sticky when false", () => {
    expect(appShellHeaderClasses({ sticky: false })).not.toContain("pm-app-shell__header--sticky")
  })
})

describe("appShellHeaderModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-app-shell__header": "pm_abc_header",
    "pm-app-shell__header--sticky": "pm_abc_sticky",
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
      "pm-app-shell__header": "pm_abc_header",
    }
    const result = appShellHeaderModuleClasses(sparseMap, { sticky: true })
    expect(result).toContain("pm_abc_header")
    expect(result).not.toContain("undefined")
  })
})

describe("appShellSidebarClasses", () => {
  it("returns default classes (md width)", () => {
    const result = appShellSidebarClasses()
    expect(result).toBe("pm-app-shell__sidebar pm-app-shell__sidebar--md")
  })

  it("applies sm width", () => {
    expect(appShellSidebarClasses({ width: "sm" })).toContain("pm-app-shell__sidebar--sm")
  })

  it("applies md width", () => {
    expect(appShellSidebarClasses({ width: "md" })).toContain("pm-app-shell__sidebar--md")
  })

  it("applies lg width", () => {
    expect(appShellSidebarClasses({ width: "lg" })).toContain("pm-app-shell__sidebar--lg")
  })

  it("applies collapsed modifier", () => {
    expect(appShellSidebarClasses({ collapsed: true })).toContain(
      "pm-app-shell__sidebar--collapsed",
    )
  })

  it("does not include collapsed when false", () => {
    expect(appShellSidebarClasses({ collapsed: false })).not.toContain(
      "pm-app-shell__sidebar--collapsed",
    )
  })

  it("combines multiple options", () => {
    const result = appShellSidebarClasses({ width: "lg", collapsed: true })
    expect(result).toBe(
      "pm-app-shell__sidebar pm-app-shell__sidebar--lg pm-app-shell__sidebar--collapsed",
    )
  })
})

describe("appShellSidebarModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-app-shell__sidebar": "pm_abc_sidebar",
    "pm-app-shell__sidebar--sm": "pm_abc_sm",
    "pm-app-shell__sidebar--md": "pm_abc_md",
    "pm-app-shell__sidebar--lg": "pm_abc_lg",
    "pm-app-shell__sidebar--collapsed": "pm_abc_collapsed",
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
      "pm-app-shell__sidebar": "pm_abc_sidebar",
    }
    const result = appShellSidebarModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_sidebar")
    expect(result).not.toContain("undefined")
  })
})

describe("appShellMainClasses", () => {
  it("returns the main class", () => {
    expect(appShellMainClasses()).toBe("pm-app-shell__main")
  })
})

describe("appShellMainModuleClasses", () => {
  it("returns mapped main class", () => {
    const classMap = { "pm-app-shell__main": "pm_abc_main" }
    expect(appShellMainModuleClasses(classMap)).toBe("pm_abc_main")
  })

  it("returns empty string for missing entry", () => {
    expect(appShellMainModuleClasses({})).toBe("")
  })
})

describe("appShellFooterClasses", () => {
  it("returns the footer class", () => {
    expect(appShellFooterClasses()).toBe("pm-app-shell__footer")
  })
})

describe("appShellFooterModuleClasses", () => {
  it("returns mapped footer class", () => {
    const classMap = { "pm-app-shell__footer": "pm_abc_footer" }
    expect(appShellFooterModuleClasses(classMap)).toBe("pm_abc_footer")
  })

  it("returns empty string for missing entry", () => {
    expect(appShellFooterModuleClasses({})).toBe("")
  })
})
