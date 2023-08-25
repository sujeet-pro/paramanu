import { PipeCallback, TapCallback } from "./pipe.types"

export class Pipe<T> {
  #value: T
  constructor(value: T) {
    this.#value = value
  }

  get value(): T {
    return this.#value
  }

  /**
   *
   * @param cb - callback function
   * @returns a new pipeable with the updated value
   */
  pipe<E>(cb: PipeCallback<T, E>): Pipe<E> {
    const output = cb(this.#value)
    return new Pipe(output)
  }

  tap(tapCallback: TapCallback<T>): Pipe<T> {
    tapCallback(this.#value)
    return this
  }
}
