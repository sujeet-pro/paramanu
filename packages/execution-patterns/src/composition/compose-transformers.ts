export type TransformerFunction<T> = (input: T) => T

export function composeTransformers<T>(...functions: TransformerFunction<T>[]): TransformerFunction<T> {
  return (input: T) => functions.reduceRight<T>((ouput, func) => func(ouput), input)
}

export function pipeTransformer<T> (...transformers: TransformerFunction<T>[]): TransformerFunction<T> {
  return (input: T) => transformers.reduce<T>((output, transformer) => transformer(output), input)
}