export function deepFreeze<T extends object>(nonFrozenObject: T) {
  const propNames = Reflect.ownKeys(nonFrozenObject)
  for (const name of propNames) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (nonFrozenObject as any)[name]
    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value)
    }
  }
  return Object.freeze(nonFrozenObject)
}
