import { describe, it, expect } from "vitest"
import {
  cmdPaletteClasses,
  cmdPaletteModuleClasses,
  commandPaletteInputClasses,
  commandPaletteInputModuleClasses,
  commandPaletteListClasses,
  commandPaletteListModuleClasses,
  cmdPaletteItemClasses,
  cmdPaletteItemModuleClasses,
  commandPaletteGroupClasses,
  commandPaletteGroupModuleClasses,
  commandPaletteEmptyClasses,
  commandPaletteEmptyModuleClasses,
} from "./command-palette.classes.js"

describe("cmdPaletteClasses", () => {
  it("returns base class", () => {
    expect(cmdPaletteClasses()).toBe("pm-cmd-palette")
  })

  it("returns base class with empty options", () => {
    expect(cmdPaletteClasses({})).toBe("pm-cmd-palette")
  })
})

describe("cmdPaletteModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-cmd-palette": "pm_abc_commandPalette",
  }

  it("returns mapped class", () => {
    expect(cmdPaletteModuleClasses(mockClassMap)).toBe("pm_abc_commandPalette")
  })

  it("handles missing class map entry", () => {
    expect(cmdPaletteModuleClasses({})).toBe("")
  })
})

describe("commandPaletteInputClasses", () => {
  it("returns input class", () => {
    expect(commandPaletteInputClasses()).toBe("pm-cmd-palette__input")
  })

  it("returns input class with empty options", () => {
    expect(commandPaletteInputClasses({})).toBe("pm-cmd-palette__input")
  })
})

describe("commandPaletteInputModuleClasses", () => {
  it("returns mapped input class", () => {
    const classMap = { "pm-cmd-palette__input": "pm_abc_input" }
    expect(commandPaletteInputModuleClasses(classMap)).toBe("pm_abc_input")
  })

  it("handles missing class map entry", () => {
    expect(commandPaletteInputModuleClasses({})).toBe("")
  })
})

describe("commandPaletteListClasses", () => {
  it("returns list class", () => {
    expect(commandPaletteListClasses()).toBe("pm-cmd-palette__list")
  })

  it("returns list class with empty options", () => {
    expect(commandPaletteListClasses({})).toBe("pm-cmd-palette__list")
  })
})

describe("commandPaletteListModuleClasses", () => {
  it("returns mapped list class", () => {
    const classMap = { "pm-cmd-palette__list": "pm_abc_list" }
    expect(commandPaletteListModuleClasses(classMap)).toBe("pm_abc_list")
  })

  it("handles missing class map entry", () => {
    expect(commandPaletteListModuleClasses({})).toBe("")
  })
})

describe("cmdPaletteItemClasses", () => {
  it("returns item class without active", () => {
    expect(cmdPaletteItemClasses()).toBe("pm-cmd-palette__item")
  })

  it("returns item class when active is false", () => {
    expect(cmdPaletteItemClasses({ active: false })).toBe("pm-cmd-palette__item")
  })

  it("applies active modifier", () => {
    expect(cmdPaletteItemClasses({ active: true })).toBe(
      "pm-cmd-palette__item pm-cmd-palette__item--active",
    )
  })

  it("always includes base item class", () => {
    expect(cmdPaletteItemClasses({ active: true })).toContain("pm-cmd-palette__item")
  })
})

describe("cmdPaletteItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-cmd-palette__item": "pm_abc_item",
    "pm-cmd-palette__item--active": "pm_abc_itemActive",
  }

  it("returns mapped item class", () => {
    expect(cmdPaletteItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps active class", () => {
    const result = cmdPaletteItemModuleClasses(mockClassMap, { active: true })
    expect(result).toBe("pm_abc_item pm_abc_itemActive")
  })

  it("does not include active class when not active", () => {
    const result = cmdPaletteItemModuleClasses(mockClassMap, { active: false })
    expect(result).toBe("pm_abc_item")
  })

  it("handles missing class map entries", () => {
    const sparseMap: Record<string, string> = {
      "pm-cmd-palette__item": "pm_abc_item",
    }
    const result = cmdPaletteItemModuleClasses(sparseMap, { active: true })
    expect(result).toContain("pm_abc_item")
    expect(result).not.toContain("undefined")
  })

  it("handles completely empty class map", () => {
    const result = cmdPaletteItemModuleClasses({})
    expect(result).toBe("")
  })
})

describe("commandPaletteGroupClasses", () => {
  it("returns group class", () => {
    expect(commandPaletteGroupClasses()).toBe("pm-cmd-palette__group")
  })

  it("returns group class with empty options", () => {
    expect(commandPaletteGroupClasses({})).toBe("pm-cmd-palette__group")
  })
})

describe("commandPaletteGroupModuleClasses", () => {
  it("returns mapped group class", () => {
    const classMap = { "pm-cmd-palette__group": "pm_abc_group" }
    expect(commandPaletteGroupModuleClasses(classMap)).toBe("pm_abc_group")
  })

  it("handles missing class map entry", () => {
    expect(commandPaletteGroupModuleClasses({})).toBe("")
  })
})

describe("commandPaletteEmptyClasses", () => {
  it("returns empty class", () => {
    expect(commandPaletteEmptyClasses()).toBe("pm-cmd-palette__empty")
  })

  it("returns empty class with empty options", () => {
    expect(commandPaletteEmptyClasses({})).toBe("pm-cmd-palette__empty")
  })
})

describe("commandPaletteEmptyModuleClasses", () => {
  it("returns mapped empty class", () => {
    const classMap = { "pm-cmd-palette__empty": "pm_abc_empty" }
    expect(commandPaletteEmptyModuleClasses(classMap)).toBe("pm_abc_empty")
  })

  it("handles missing class map entry", () => {
    expect(commandPaletteEmptyModuleClasses({})).toBe("")
  })
})
