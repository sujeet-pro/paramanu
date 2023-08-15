export function hello(...args: string[]) {
  return `hello, ${args.join(', ')}`
}