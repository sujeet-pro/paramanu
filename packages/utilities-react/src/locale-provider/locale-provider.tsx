import { createContext, useContext, useState, useEffect, useCallback } from "react"
import {
  setLocale as jsSetLocale,
  getLocale as jsGetLocale,
} from "@paramanu/utilities-js"

interface LocaleContextValue {
  locale: string
  setLocale: (locale: string) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
})

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}

export interface ReactLocaleProviderProps {
  defaultLocale?: string
  children: React.ReactNode
}

export function LocaleProvider({
  defaultLocale,
  children,
}: ReactLocaleProviderProps) {
  const [locale, setLocaleState] = useState<string>(() => {
    try {
      return defaultLocale ?? jsGetLocale()
    } catch {
      return defaultLocale ?? "en"
    }
  })

  useEffect(() => {
    jsSetLocale(locale)
  }, [locale])

  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale)
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
