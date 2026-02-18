import { useState, useEffect, lazy, Suspense } from "react"

const SandpackContent = lazy(() => import("./SandpackContent"))

interface SandpackEditorProps {
  reactCode: string
  htmlCode: string
  previewId: string
}

export default function SandpackEditor({ reactCode, htmlCode, previewId }: SandpackEditorProps) {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"react" | "html">("react")

  useEffect(() => {
    const container = document.getElementById(previewId)
    if (!container) return

    const tabHandler = (e: Event) => {
      setActiveTab((e as CustomEvent).detail.tab)
    }
    container.addEventListener("cp:tab", tabHandler)

    const editorEl = container.querySelector("[data-editor]")
    if (editorEl) {
      const observer = new MutationObserver(() => {
        setVisible(!(editorEl as HTMLElement).hidden)
      })
      observer.observe(editorEl, { attributes: true, attributeFilter: ["hidden"] })

      return () => {
        container.removeEventListener("cp:tab", tabHandler)
        observer.disconnect()
      }
    }

    return () => container.removeEventListener("cp:tab", tabHandler)
  }, [previewId])

  if (!visible) return null

  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          Loading editor...
        </div>
      }
    >
      <SandpackContent reactCode={reactCode} htmlCode={htmlCode} activeTab={activeTab} />
    </Suspense>
  )
}
