import { btnClasses } from "@paramanu/buttons-js"
import type { BtnClassesOptions } from "@paramanu/buttons-js"

interface ParamanuGlobal {
  btnClasses: (options?: BtnClassesOptions) => string
}

const Paramanu: ParamanuGlobal = {
  btnClasses,
}

;(globalThis as unknown as { Paramanu: ParamanuGlobal }).Paramanu = Paramanu
