import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Tabs, TabList, Tab, TabPanel } from "./tabs.js"

afterEach(cleanup)

describe("Tabs", () => {
  it("renders container div", () => {
    render(
      <Tabs data-testid="tabs">
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tabs = screen.getByTestId("tabs")
    expect(tabs).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <Tabs data-testid="tabs">
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tabs = screen.getByTestId("tabs")
    expect(tabs.className).toContain("pm-tabs")
    expect(tabs.className).toContain("pm-tabs--line")
    expect(tabs.className).toContain("pm-tabs--md")
    expect(tabs.className).toContain("pm-tabs--horizontal")
  })

  it("applies variant", () => {
    render(
      <Tabs variant="pill" data-testid="tabs">
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    expect(screen.getByTestId("tabs").className).toContain("pm-tabs--pill")
  })

  it("merges custom className", () => {
    render(
      <Tabs className="custom" data-testid="tabs">
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tabs = screen.getByTestId("tabs")
    expect(tabs.className).toContain("pm-tabs")
    expect(tabs.className).toContain("custom")
  })

  it("forwards ref", () => {
    let tabsRef: HTMLDivElement | null = null
    render(
      <Tabs ref={(el) => (tabsRef = el)}>
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    expect(tabsRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("TabList", () => {
  it("renders with tablist role", () => {
    render(
      <Tabs>
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tablist = screen.getByRole("tablist")
    expect(tablist).toBeInTheDocument()
  })

  it("applies list classes", () => {
    render(
      <Tabs>
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tablist = screen.getByRole("tablist")
    expect(tablist.className).toContain("pm-tabs__list")
  })

  it("forwards ref", () => {
    let listRef: HTMLDivElement | null = null
    render(
      <Tabs>
        <TabList ref={(el) => (listRef = el)}>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    expect(listRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("Tab", () => {
  it("renders with tab role", () => {
    render(
      <Tabs>
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tab = screen.getByRole("tab", { name: "Tab 1" })
    expect(tab).toBeInTheDocument()
  })

  it("sets aria-selected when active", () => {
    render(
      <Tabs>
        <TabList>
          <Tab active>Active</Tab>
          <Tab>Inactive</Tab>
        </TabList>
      </Tabs>,
    )
    expect(screen.getByRole("tab", { name: "Active" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tab", { name: "Inactive" })).toHaveAttribute("aria-selected", "false")
  })

  it("sets disabled and aria-disabled", () => {
    render(
      <Tabs>
        <TabList>
          <Tab disabled>Disabled</Tab>
        </TabList>
      </Tabs>,
    )
    const tab = screen.getByRole("tab", { name: "Disabled" })
    expect(tab).toBeDisabled()
    expect(tab).toHaveAttribute("aria-disabled", "true")
  })

  it("applies tab classes", () => {
    render(
      <Tabs>
        <TabList>
          <Tab active>Tab 1</Tab>
        </TabList>
      </Tabs>,
    )
    const tab = screen.getByRole("tab")
    expect(tab.className).toContain("pm-tabs__tab")
    expect(tab.className).toContain("pm-tabs__tab--active")
  })

  it("forwards ref", () => {
    let tabRef: HTMLButtonElement | null = null
    render(
      <Tabs>
        <TabList>
          <Tab ref={(el) => (tabRef = el)} active>
            Tab 1
          </Tab>
        </TabList>
      </Tabs>,
    )
    expect(tabRef).toBeInstanceOf(HTMLButtonElement)
  })
})

describe("TabPanel", () => {
  it("renders with tabpanel role", () => {
    render(
      <Tabs>
        <TabPanel>Panel content</TabPanel>
      </Tabs>,
    )
    const panel = screen.getByRole("tabpanel")
    expect(panel).toBeInTheDocument()
    expect(panel.textContent).toBe("Panel content")
  })

  it("applies panel classes", () => {
    render(
      <Tabs>
        <TabPanel>Content</TabPanel>
      </Tabs>,
    )
    const panel = screen.getByRole("tabpanel")
    expect(panel.className).toContain("pm-tabs__panel")
  })

  it("forwards ref", () => {
    let panelRef: HTMLDivElement | null = null
    render(
      <Tabs>
        <TabPanel ref={(el) => (panelRef = el)}>Content</TabPanel>
      </Tabs>,
    )
    expect(panelRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Tabs>
        <TabPanel className="custom">Content</TabPanel>
      </Tabs>,
    )
    const panel = screen.getByRole("tabpanel")
    expect(panel.className).toContain("pm-tabs__panel")
    expect(panel.className).toContain("custom")
  })
})
