import { createContext, useContext, useState, useEffect, useCallback } from "react"
import {
  setDirection as jsSetDirection,
  getDirection as jsGetDirection,
} from "@paramanu/utilities-js"
import type { Direction } from "@paramanu/utilities-js"

interface DirectionContextValue {
  dir: Direction
  setDir: (dir: Direction) => void
}

const DirectionContext = createContext<DirectionContextValue>({
  dir: "ltr",
  setDir: () => {},
})

export function useDirection(): DirectionContextValue {
  return useContext(DirectionContext)
}

export interface ReactDirectionProviderProps {
  defaultDir?: Direction
  children: React.ReactNode
}

export function DirectionProvider({ defaultDir, children }: ReactDirectionProviderProps) {
  const [dir, setDirState] = useState<Direction>(() => {
    try {
      return defaultDir ?? jsGetDirection()
    } catch {
      return defaultDir ?? "ltr"
    }
  })

  useEffect(() => {
    jsSetDirection(dir)
  }, [dir])

  const setDir = useCallback((newDir: Direction) => {
    setDirState(newDir)
  }, [])

  return <DirectionContext.Provider value={{ dir, setDir }}>{children}</DirectionContext.Provider>
}
