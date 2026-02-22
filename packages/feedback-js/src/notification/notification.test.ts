import { describe, it, expect } from "vitest"
import { notifClasses, notifModuleClasses } from "./notification.classes.js"

describe("notifClasses", () => {
  it("returns default classes (neutral variant)", () => {
    const result = notifClasses()
    expect(result.root).toBe("pm-notif pm-notif--neutral")
    expect(result.icon).toBe("pm-notif__icon")
    expect(result.content).toBe("pm-notif__content")
    expect(result.title).toBe("pm-notif__title")
    expect(result.message).toBe("pm-notif__message")
    expect(result.timestamp).toBe("pm-notif__timestamp")
    expect(result.actions).toBe("pm-notif__actions")
    expect(result.close).toBe("pm-notif__close")
  })

  it("applies unread modifier", () => {
    const result = notifClasses({ unread: true })
    expect(result.root).toContain("pm-notif--unread")
  })

  it("does not apply unread modifier when false", () => {
    const result = notifClasses({ unread: false })
    expect(result.root).not.toContain("pm-notif--unread")
  })

  it("applies dismissible modifier", () => {
    const result = notifClasses({ dismissible: true })
    expect(result.root).toContain("pm-notif--dismissible")
  })

  it("does not apply dismissible modifier when false", () => {
    const result = notifClasses({ dismissible: false })
    expect(result.root).not.toContain("pm-notif--dismissible")
  })

  it("combines multiple modifiers", () => {
    const result = notifClasses({ unread: true, dismissible: true })
    expect(result.root).toBe("pm-notif pm-notif--neutral pm-notif--unread pm-notif--dismissible")
  })

  it("always includes base class in root", () => {
    expect(notifClasses().root).toMatch(/^pm-notif/)
    expect(notifClasses({ unread: true }).root).toMatch(/^pm-notif\s/)
  })

  it("returns all sub-element classes", () => {
    const result = notifClasses()
    expect(result).toHaveProperty("root")
    expect(result).toHaveProperty("icon")
    expect(result).toHaveProperty("content")
    expect(result).toHaveProperty("title")
    expect(result).toHaveProperty("message")
    expect(result).toHaveProperty("timestamp")
    expect(result).toHaveProperty("actions")
    expect(result).toHaveProperty("close")
  })
})

describe("notifModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-notif": "pm_abc_notification",
    "pm-notif--neutral": "pm_abc_neutral",
    "pm-notif--info": "pm_abc_info",
    "pm-notif--success": "pm_abc_success",
    "pm-notif--warning": "pm_abc_warning",
    "pm-notif--danger": "pm_abc_danger",
    "pm-notif--unread": "pm_abc_unread",
    "pm-notif--dismissible": "pm_abc_dismissible",
    "pm-notif__icon": "pm_abc_icon",
    "pm-notif__content": "pm_abc_content",
    "pm-notif__title": "pm_abc_title",
    "pm-notif__message": "pm_abc_message",
    "pm-notif__timestamp": "pm_abc_timestamp",
    "pm-notif__actions": "pm_abc_actions",
    "pm-notif__close": "pm_abc_close",
  }

  it("returns mapped default classes", () => {
    const result = notifModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_notification pm_abc_neutral")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.content).toBe("pm_abc_content")
    expect(result.title).toBe("pm_abc_title")
    expect(result.message).toBe("pm_abc_message")
    expect(result.timestamp).toBe("pm_abc_timestamp")
    expect(result.actions).toBe("pm_abc_actions")
    expect(result.close).toBe("pm_abc_close")
  })

  it("maps unread class", () => {
    const result = notifModuleClasses(mockClassMap, { unread: true })
    expect(result.root).toContain("pm_abc_unread")
  })

  it("maps dismissible class", () => {
    const result = notifModuleClasses(mockClassMap, { dismissible: true })
    expect(result.root).toContain("pm_abc_dismissible")
  })

  it("combines multiple mapped modifiers", () => {
    const result = notifModuleClasses(mockClassMap, { unread: true, dismissible: true })
    expect(result.root).toBe("pm_abc_notification pm_abc_neutral pm_abc_unread pm_abc_dismissible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-notif": "pm_abc_notification",
    }
    const result = notifModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_notification")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
    expect(result.content).toBe("")
    expect(result.title).toBe("")
    expect(result.message).toBe("")
    expect(result.timestamp).toBe("")
    expect(result.actions).toBe("")
    expect(result.close).toBe("")
  })
})
