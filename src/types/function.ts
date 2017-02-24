import { Runtype, create, ValidationError } from './base'

interface Func extends Runtype<(...args: any[]) => any> { tag: 'function' }

/**
 * Construct a runtype for functions.
 */
const Func = create<Func>(x => {
  if (typeof x !== 'function')
    throw new ValidationError(`Expected a function but was ${typeof x}`)
  return x
}, { tag: 'function' })
export { Func as Function }