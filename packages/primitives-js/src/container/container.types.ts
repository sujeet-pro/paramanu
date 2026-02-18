export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full"

export interface ContainerClassesOptions {
  size?: ContainerSize
}

export interface ContainerProps extends ContainerClassesOptions {}
