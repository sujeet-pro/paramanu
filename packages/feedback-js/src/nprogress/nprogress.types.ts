export interface NProgressClassesOptions {
  active?: boolean
}

export interface NProgressInstance {
  start: () => void
  done: () => void
  set: (value: number) => void
  inc: () => void
  getValue: () => number
  isActive: () => boolean
}
