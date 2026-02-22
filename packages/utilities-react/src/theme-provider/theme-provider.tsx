import { createContext, useContext, useState, useEffect, useCallback } from "react"
import {
  setTheme as jsSetTheme,
  getTheme as jsGetTheme,
  clearTheme as jsClearTheme,
} from "@paramanu/utilities-js"
import type { ThemeMode } from "@paramanu/utilities-js"

interface ThemeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  clearMode: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "system",
  setMode: () => {},
  clearMode: () => {},
})

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

export interface ReactThemeProps {
  defaultMode?: ThemeMode
  storageKey?: string
  children: React.ReactNode
}

export function Theme({
  defaultMode = "system",
  storageKey = "pm-theme",
  children,
}: ReactThemeProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored
      }
    } catch {
      // localStorage may not be available (SSR, privacy mode)
    }
    return defaultMode
  })

  useEffect(() => {
    jsSetTheme(mode, { storageKey })
  }, [mode, storageKey])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
  }, [])

  const clearMode = useCallback(() => {
    jsClearTheme({ storageKey })
    setModeState("system")
  }, [storageKey])

  return (
    <ThemeContext.Provider value={{ mode, setMode, clearMode }}>{children}</ThemeContext.Provider>
  )
}
