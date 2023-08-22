import { AsyncPipeCallback, TapCallback } from "./pipe.types"

export class AsyncPipe<T> {
  readonly #value
  constructor(value: Promise<T>) {
    this.#value = value
  }

  get value(): Promise<T> {
    return this.#value
  }

  async #getNextValue<E>(cb: AsyncPipeCallback<T, E>): Promise<E> {
    const val = await this.#value
    const output = await cb(val)
    return output
  }

  pipe<E>(cb: AsyncPipeCallback<T, E>): AsyncPipe<E> {
    return new AsyncPipe(this.#getNextValue(cb))
  }

  tap(tapCallback: TapCallback<T>): AsyncPipe<T> {
    const cb = async () => {
      const val = await this.#value
      tapCallback(val)
    }
    cb()
    return this
  }
}
