import { buttonClasses } from "@paramanu/buttons-js"
import type { ButtonClassesOptions } from "@paramanu/buttons-js"

interface ParamanuGlobal {
  buttonClasses: (options?: ButtonClassesOptions) => string
}

const Paramanu: ParamanuGlobal = {
  buttonClasses,
}

;(globalThis as unknown as { Paramanu: ParamanuGlobal }).Paramanu = Paramanu
