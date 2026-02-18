import type { FormSize } from "../shared.types.js"

export interface FileUploadClassesOptions {
  size?: FormSize
  disabled?: boolean
}

export interface FileUploadProps extends FileUploadClassesOptions {}
