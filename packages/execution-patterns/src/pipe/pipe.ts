export class Pipe<I> {
  constructor(
    public value: I
  ) {}

  pipe<E>(cb: (input: I) => E): Pipe<E> {
    const output = cb(this.value)
    return new Pipe(output)
  }
}