import type { FormSize } from "../shared.types.js"

export interface UploadClassesOptions {
  size?: FormSize
  disabled?: boolean
}

export interface UploadProps extends UploadClassesOptions {}
