import type { SpacingScale } from "../shared.types.js"

/** Container max-width sizes. */
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"

export interface ContainerClassesOptions {
  /** Maximum width of the container. Defaults to "lg". */
  size?: ContainerSize
  /** Whether the container should be fluid (100% width, no max-width). */
  fluid?: boolean
  /** Horizontal padding using the spacing scale. Defaults to the token --pm-spacing-4. */
  px?: SpacingScale
  /** Whether to center content within the container (flex center). */
  center?: boolean
}

export interface ContainerProps extends ContainerClassesOptions {}
