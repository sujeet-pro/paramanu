import { describe, it, expect } from "vitest"
import {
  treeClasses,
  treeModuleClasses,
  treeViewBranchClasses,
  treeViewBranchModuleClasses,
  treeItemClasses,
  treeItemModuleClasses,
  treeViewItemContentClasses,
  treeViewItemContentModuleClasses,
  treeViewIndicatorClasses,
  treeViewIndicatorModuleClasses,
  treeViewGroupClasses,
  treeViewGroupModuleClasses,
} from "./tree-view.classes.js"

describe("treeClasses", () => {
  it("returns default classes", () => {
    const result = treeClasses()
    expect(result).toBe("pm-tree pm-tree--md")
  })

  it("applies size variant", () => {
    expect(treeClasses({ size: "sm" })).toContain("pm-tree--sm")
    expect(treeClasses({ size: "md" })).toContain("pm-tree--md")
  })

  it("always includes base class", () => {
    expect(treeClasses()).toMatch(/^pm-tree\s/)
  })
})

describe("treeModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree": "pm_abc_tree",
    "pm-tree--sm": "pm_abc_sm",
    "pm-tree--md": "pm_abc_md",
  }

  it("returns mapped default classes", () => {
    const result = treeModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tree pm_abc_md")
  })

  it("maps size variant correctly", () => {
    const result = treeModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tree": "pm_abc_tree",
    }
    const result = treeModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tree")
    expect(result).not.toContain("undefined")
  })
})

describe("treeViewBranchClasses", () => {
  it("returns default branch class", () => {
    expect(treeViewBranchClasses()).toBe("pm-tree__branch")
  })

  it("applies expanded modifier", () => {
    expect(treeViewBranchClasses({ expanded: true })).toContain(
      "pm-tree__branch--expanded",
    )
  })

  it("does not apply expanded when false", () => {
    expect(treeViewBranchClasses({ expanded: false })).not.toContain(
      "pm-tree__branch--expanded",
    )
  })
})

describe("treeViewBranchModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree__branch": "pm_abc_branch",
    "pm-tree__branch--expanded": "pm_abc_expanded",
  }

  it("returns mapped branch class", () => {
    expect(treeViewBranchModuleClasses(mockClassMap)).toBe("pm_abc_branch")
  })

  it("maps expanded class", () => {
    expect(treeViewBranchModuleClasses(mockClassMap, { expanded: true })).toContain(
      "pm_abc_expanded",
    )
  })
})

describe("treeItemClasses", () => {
  it("returns default item class", () => {
    expect(treeItemClasses()).toBe("pm-tree__item")
  })

  it("applies selected modifier", () => {
    expect(treeItemClasses({ selected: true })).toContain("pm-tree__item--selected")
  })

  it("does not apply selected when false", () => {
    expect(treeItemClasses({ selected: false })).not.toContain(
      "pm-tree__item--selected",
    )
  })

  it("applies disabled modifier", () => {
    expect(treeItemClasses({ disabled: true })).toContain("pm-tree__item--disabled")
  })

  it("does not apply disabled when false", () => {
    expect(treeItemClasses({ disabled: false })).not.toContain(
      "pm-tree__item--disabled",
    )
  })
})

describe("treeItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree__item": "pm_abc_item",
    "pm-tree__item--selected": "pm_abc_selected",
    "pm-tree__item--disabled": "pm_abc_disabled",
  }

  it("returns mapped item class", () => {
    expect(treeItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps selected class", () => {
    expect(treeItemModuleClasses(mockClassMap, { selected: true })).toContain(
      "pm_abc_selected",
    )
  })

  it("maps disabled class", () => {
    expect(treeItemModuleClasses(mockClassMap, { disabled: true })).toContain(
      "pm_abc_disabled",
    )
  })
})

describe("treeViewItemContentClasses", () => {
  it("returns item content class", () => {
    expect(treeViewItemContentClasses()).toBe("pm-tree__item-content")
  })
})

describe("treeViewItemContentModuleClasses", () => {
  it("returns mapped item content class", () => {
    const classMap = { "pm-tree__item-content": "pm_abc_content" }
    expect(treeViewItemContentModuleClasses(classMap)).toBe("pm_abc_content")
  })

  it("handles missing class map entry gracefully", () => {
    expect(treeViewItemContentModuleClasses({})).toBe("")
  })
})

describe("treeViewIndicatorClasses", () => {
  it("returns default indicator class", () => {
    expect(treeViewIndicatorClasses()).toBe("pm-tree__indicator")
  })

  it("applies expanded modifier", () => {
    expect(treeViewIndicatorClasses({ expanded: true })).toContain(
      "pm-tree__indicator--expanded",
    )
  })

  it("does not apply expanded when false", () => {
    expect(treeViewIndicatorClasses({ expanded: false })).not.toContain(
      "pm-tree__indicator--expanded",
    )
  })
})

describe("treeViewIndicatorModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree__indicator": "pm_abc_indicator",
    "pm-tree__indicator--expanded": "pm_abc_expanded",
  }

  it("returns mapped indicator class", () => {
    expect(treeViewIndicatorModuleClasses(mockClassMap)).toBe("pm_abc_indicator")
  })

  it("maps expanded class", () => {
    expect(treeViewIndicatorModuleClasses(mockClassMap, { expanded: true })).toContain(
      "pm_abc_expanded",
    )
  })
})

describe("treeViewGroupClasses", () => {
  it("returns group class", () => {
    expect(treeViewGroupClasses()).toBe("pm-tree__group")
  })
})

describe("treeViewGroupModuleClasses", () => {
  it("returns mapped group class", () => {
    const classMap = { "pm-tree__group": "pm_abc_group" }
    expect(treeViewGroupModuleClasses(classMap)).toBe("pm_abc_group")
  })

  it("handles missing class map entry gracefully", () => {
    expect(treeViewGroupModuleClasses({})).toBe("")
  })
})
