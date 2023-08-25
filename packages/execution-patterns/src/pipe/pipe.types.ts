export type PipeCallback<T, E> = (input: T) => E
export type AsyncPipeCallback<T, E> = (input: T) => Promise<E>
export type TapCallback<T> = (input: T) => void

// export type CollectorInputBase<T> = { [key: string | symbol]: (input: T) => unknown }
// export type CollectorResponse<T, CT extends CollectorInputBase<T>> = {
//   [Property in keyof CT]: ReturnType<CT[Property]>
// }
