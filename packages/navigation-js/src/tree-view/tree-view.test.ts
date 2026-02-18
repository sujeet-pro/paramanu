import { describe, it, expect } from "vitest"
import {
  treeViewClasses,
  treeViewModuleClasses,
  treeViewBranchClasses,
  treeViewBranchModuleClasses,
  treeViewItemClasses,
  treeViewItemModuleClasses,
  treeViewItemContentClasses,
  treeViewItemContentModuleClasses,
  treeViewIndicatorClasses,
  treeViewIndicatorModuleClasses,
  treeViewGroupClasses,
  treeViewGroupModuleClasses,
} from "./tree-view.classes.js"

describe("treeViewClasses", () => {
  it("returns default classes", () => {
    const result = treeViewClasses()
    expect(result).toBe("pm-tree-view pm-tree-view--md")
  })

  it("applies size variant", () => {
    expect(treeViewClasses({ size: "sm" })).toContain("pm-tree-view--sm")
    expect(treeViewClasses({ size: "md" })).toContain("pm-tree-view--md")
  })

  it("always includes base class", () => {
    expect(treeViewClasses()).toMatch(/^pm-tree-view\s/)
  })
})

describe("treeViewModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree-view": "pm_abc_tree",
    "pm-tree-view--sm": "pm_abc_sm",
    "pm-tree-view--md": "pm_abc_md",
  }

  it("returns mapped default classes", () => {
    const result = treeViewModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_tree pm_abc_md")
  })

  it("maps size variant correctly", () => {
    const result = treeViewModuleClasses(mockClassMap, { size: "sm" })
    expect(result).toContain("pm_abc_sm")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-tree-view": "pm_abc_tree",
    }
    const result = treeViewModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_tree")
    expect(result).not.toContain("undefined")
  })
})

describe("treeViewBranchClasses", () => {
  it("returns default branch class", () => {
    expect(treeViewBranchClasses()).toBe("pm-tree-view__branch")
  })

  it("applies expanded modifier", () => {
    expect(treeViewBranchClasses({ expanded: true })).toContain(
      "pm-tree-view__branch--expanded",
    )
  })

  it("does not apply expanded when false", () => {
    expect(treeViewBranchClasses({ expanded: false })).not.toContain(
      "pm-tree-view__branch--expanded",
    )
  })
})

describe("treeViewBranchModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree-view__branch": "pm_abc_branch",
    "pm-tree-view__branch--expanded": "pm_abc_expanded",
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

describe("treeViewItemClasses", () => {
  it("returns default item class", () => {
    expect(treeViewItemClasses()).toBe("pm-tree-view__item")
  })

  it("applies selected modifier", () => {
    expect(treeViewItemClasses({ selected: true })).toContain("pm-tree-view__item--selected")
  })

  it("does not apply selected when false", () => {
    expect(treeViewItemClasses({ selected: false })).not.toContain(
      "pm-tree-view__item--selected",
    )
  })

  it("applies disabled modifier", () => {
    expect(treeViewItemClasses({ disabled: true })).toContain("pm-tree-view__item--disabled")
  })

  it("does not apply disabled when false", () => {
    expect(treeViewItemClasses({ disabled: false })).not.toContain(
      "pm-tree-view__item--disabled",
    )
  })
})

describe("treeViewItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree-view__item": "pm_abc_item",
    "pm-tree-view__item--selected": "pm_abc_selected",
    "pm-tree-view__item--disabled": "pm_abc_disabled",
  }

  it("returns mapped item class", () => {
    expect(treeViewItemModuleClasses(mockClassMap)).toBe("pm_abc_item")
  })

  it("maps selected class", () => {
    expect(treeViewItemModuleClasses(mockClassMap, { selected: true })).toContain(
      "pm_abc_selected",
    )
  })

  it("maps disabled class", () => {
    expect(treeViewItemModuleClasses(mockClassMap, { disabled: true })).toContain(
      "pm_abc_disabled",
    )
  })
})

describe("treeViewItemContentClasses", () => {
  it("returns item content class", () => {
    expect(treeViewItemContentClasses()).toBe("pm-tree-view__item-content")
  })
})

describe("treeViewItemContentModuleClasses", () => {
  it("returns mapped item content class", () => {
    const classMap = { "pm-tree-view__item-content": "pm_abc_content" }
    expect(treeViewItemContentModuleClasses(classMap)).toBe("pm_abc_content")
  })

  it("handles missing class map entry gracefully", () => {
    expect(treeViewItemContentModuleClasses({})).toBe("")
  })
})

describe("treeViewIndicatorClasses", () => {
  it("returns default indicator class", () => {
    expect(treeViewIndicatorClasses()).toBe("pm-tree-view__indicator")
  })

  it("applies expanded modifier", () => {
    expect(treeViewIndicatorClasses({ expanded: true })).toContain(
      "pm-tree-view__indicator--expanded",
    )
  })

  it("does not apply expanded when false", () => {
    expect(treeViewIndicatorClasses({ expanded: false })).not.toContain(
      "pm-tree-view__indicator--expanded",
    )
  })
})

describe("treeViewIndicatorModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-tree-view__indicator": "pm_abc_indicator",
    "pm-tree-view__indicator--expanded": "pm_abc_expanded",
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
    expect(treeViewGroupClasses()).toBe("pm-tree-view__group")
  })
})

describe("treeViewGroupModuleClasses", () => {
  it("returns mapped group class", () => {
    const classMap = { "pm-tree-view__group": "pm_abc_group" }
    expect(treeViewGroupModuleClasses(classMap)).toBe("pm_abc_group")
  })

  it("handles missing class map entry gracefully", () => {
    expect(treeViewGroupModuleClasses({})).toBe("")
  })
})
