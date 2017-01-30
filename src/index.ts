/**
 * A successful validation result.
 */
export type Success<A> = {
  /**
   * A tag indicating success.
   */
  success: true

  /**
   * The original value, cast to its validated type.
   */
  value: A
}

/**
 * A failed validation result.
 */
export type Failure = {
  /**
   * A tag indicating failure.
   */
  success: false

  /**
   * A message indicating the reason validation failed.
   */
  message: string
}

/**
 * The result of a type validation.
 */
export type Result<A> = Success<A> | Failure

/**
 * A runtype determines at runtime whether a value conforms to a type specification.
 */
export type Runtype<A> = {
  /**
   * Attempts to cast a value to the type for this runtype and return it.
   * Throws an exception if validation fails.
   */
  coerce(x: {}): A

  /**
   * Validates that a value conforms to this type, and returns a result indicating
   * success or failure (does not throw).
   */
  validate(x: {}): Result<A>

  /**
   * A type guard for this runtype.
   */
  guard(x: {}): x is A

  /**
   * Provides a way to reference the constructed type that this runtype
   * validates. Note that this is a false witness; it's always undefined.
   */
  witness: A
}

/**
 * Validates anything, but provides no new type information about it.
 */
export const Anything: Runtype<{}> = runtype(x => x)

/**
 * Validates nothing (always fails).
 */
export const Nothing: Runtype<never> = runtype(x => {
  throw new ValidationError('Expected nothing but got something')
})

/**
 * Validates that a value is undefined.
 */
export const Undefined: Runtype<undefined> = runtype(x => {
  if (x !== undefined)
    throw new ValidationError(`Expected undefined but was ${typeof x}`)
  return x
})

/**
 * Validates that a value is null.
 */
export const Null: Runtype<null> = runtype(x => {
  if (x !== null)
    throw new ValidationError(`Expected null but was ${typeof x}`)
  return x
})

/**
 * Validates that a value is void (null or undefined).
 */
export const Void: Runtype<void> = runtype(x => {
  if (x !== undefined && x !== null)
    throw new ValidationError(`Expected null but was ${typeof x}`)
  return x
})

/**
 * Validates that a value is a boolean.
 */
export const Boolean: Runtype<boolean> = runtype(x => {
  if (typeof x !== 'boolean')
    throw new ValidationError(`Expected boolean but was ${typeof x}`)
  return x
})

/**
 * Validates that a value is a number.
 */
export const Number: Runtype<number> = runtype(x => {
  if (typeof x !== 'number')
    throw new ValidationError(`Expected number but was ${typeof x}`)
  return x
})

/**
 * Validates that a value is a string.
 */
export const String: Runtype<string> = runtype(x => {
  if (typeof x !== 'string')
    throw new ValidationError(`Expected string but was ${typeof x}`)
  return x
})

/**
 * Construct a literal runtype.
 */
export function Literal<K extends string | number | boolean>(l: K): Runtype<K> {
  return runtype(x => {
    if (x !== l)
      throw new ValidationError(`Expected literal '${l}' but was '${x}'`)
    return x as K
  })
}

/**
 * Construct an array runtype from a runtype for its elements.
 */
function arr<A>(v: Runtype<A>): Runtype<A[]> {
  return runtype(xs => {
    if (!(xs instanceof Array))
      throw new ValidationError(`Expected array but was ${typeof xs}`)
    for (const x of xs)
      v.coerce(x)
    return xs
  })
}
export { arr as Array }

/**
 * Construct a tuple runtype from runtypes for each of its elements.
 */
export function Tuple<A>(
  a: Runtype<A>,
  strict?: boolean
): Runtype<[A]>
export function Tuple<A, B>(
  a: Runtype<A>,
  b: Runtype<B>,
  strict?: boolean
): Runtype<[A, B]>
export function Tuple<A, B, C>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  strict?: boolean
): Runtype<[A, B, C]>
export function Tuple<A, B, C, D>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  strict?: boolean
): Runtype<[A, B, C, D]>
export function Tuple<A, B, C, D, E>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  e: Runtype<E>,
  strict?: boolean
): Runtype<[A, B, C, D, E]>
export function Tuple<A, B, C, D, E, F>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  e: Runtype<E>,
  f: Runtype<F>,
  strict?: boolean
): Runtype<[A, B, C, D, E, F]>
export function Tuple<A, B, C, D, E, F, G>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  e: Runtype<E>,
  f: Runtype<F>,
  g: Runtype<G>,
  strict?: boolean
): Runtype<[A, B, C, D, E, F, G]>
export function Tuple(...args: any[]) {
  const lastArg = args[args.length - 1]
  let strict: boolean
  let runtypes: Runtype<{}>[]
  if (Boolean.guard(lastArg)) {
    strict = lastArg
    runtypes = args.slice(0, args.length - 1)
  } else {
    strict = false
    runtypes = args
  }
  return runtype(x => {
    const xs = arr(Anything).coerce(x)
    if (strict ? xs.length !== runtypes.length : xs.length < runtypes.length)
      throw new ValidationError(`Expected array of ${runtypes.length} but was ${xs.length}`)
    for (let i = 0; i < runtypes.length; i++)
      runtypes[i].coerce(xs[i])
    return x
  })
}

/**
 * Construct a record runtype from runtypes for its values.
 */
export function Record<O>(runtypes: {[K in keyof O]: Runtype<O[K]> }): Runtype<O> {
  return runtype<O>(x => {
    if (typeof x !== 'object')
      throw new ValidationError(`Expected object but was ${typeof x}`)

    // tslint:disable-next-line:forin
    for (const key in runtypes)
      runtypes[key].coerce((x as any)[key])

    return x as O
  })
}

/**
 * Construct a union runtype from runtypes for its alternatives.
 */
export function Union(
): Runtype<never>
export function Union<A>(
  a: Runtype<A>,
): Runtype<A>
export function Union<A, B>(
  a: Runtype<A>,
  b: Runtype<B>,
): Runtype<A | B>
export function Union<A, B, C>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
): Runtype<A | B | C>
export function Union<A, B, C, D>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
): Runtype<A | B | C | D>
export function Union<A, B, C, D, E>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  e: Runtype<E>,
): Runtype<A | B | C | D | E>
export function Union<A, B, C, D, E, F>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  e: Runtype<E>,
  f: Runtype<F>,
): Runtype<A | B | C | D | E | F>
export function Union<A, B, C, D, E, F, G>(
  a: Runtype<A>,
  b: Runtype<B>,
  c: Runtype<C>,
  d: Runtype<D>,
  e: Runtype<E>,
  f: Runtype<F>,
  g: Runtype<G>,
): Runtype<A | B | C | D | E | F | G>
export function Union(...runtypes: Runtype<any>[]) {
  return runtype(x => {
    for (const { guard } of runtypes)
      if (guard(x))
        return x
    throw new Error('No alternatives were matched')
  })
}

/**
 * Constructs a possibly-undefined Runtype.
 */
export function Optional<A>(runtype: Runtype<A>): Runtype<A | undefined> {
  return Union(runtype, Undefined)
}

/**
 * Constructs a possibly-recursive Runtype.
 */
export function Lazy<A>(fn: () => Runtype<A>): Runtype<A> {
  let cached: Runtype<A>
  return runtype(x => {
    if (!cached)
      cached = fn()
    return cached.coerce(x)
  })
}

function runtype<A>(coerce: (x: {}) => A): Runtype<A> {
  let witness: A = undefined as any as A

  return { coerce, validate, guard, witness }

  function validate(value: any): Result<A> {
    try {
      coerce(value)
      return { success: true, value }
    } catch ({ message }) {
      return { success: false, message }
    }
  }

  function guard(x: any): x is A {
    return validate(x).success
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message)
  }
}
