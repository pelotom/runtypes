import {
  Result,
  Union,
  Union2,
  Intersect,
  Intersect2,
  Constraint,
  ConstraintCheck,
  Brand,
  Transform,
  Transformer,
} from './index';
import { Reflect } from './reflect';
import show from './show';
import { ValidationError } from './errors';

/**
 * A runtype determines at runtime whether a value conforms to a type specification.
 */
export interface Runtype<A = unknown> {
  /**
   * Verifies that a value conforms to this runtype. When given a value that does
   * not conform to the runtype, throws an exception.
   */
  assert(x: any): asserts x is A;

  /**
   * Verifies that a value conforms to this runtype. If so, returns the same value,
   * statically typed. Otherwise throws an exception.
   */
  check(x: any): A;

  /**
   * Validates that a value conforms to this type, and returns a result indicating
   * success or failure (does not throw).
   */
  validate(x: any): Result<A>;

  /**
   * A type guard for this runtype.
   */
  guard(x: any): x is A;

  /**
   * Union this Runtype with another.
   */
  Or<B extends Runtype>(B: B): Union2<this, B>;

  /**
   * Intersect this Runtype with another.
   */
  And<B extends Runtype>(B: B): Intersect2<this, B>;

  /**
   * Use an arbitrary constraint function to validate a runtype, and optionally
   * to change its name and/or its static type.
   *
   * @template T - Optionally override the static type of the resulting runtype
   * @param {(x: Static<this>) => boolean | string} constraint - Custom function
   * that returns `true` if the constraint is satisfied, `false` or a custom
   * error message if not.
   * @param [options]
   * @param {string} [options.name] - allows setting the name of this
   * constrained runtype, which is helpful in reflection or diagnostic
   * use-cases.
   */
  withConstraint<T extends Static<this>, K = unknown>(
    constraint: ConstraintCheck<this>,
    options?: { name?: string; args?: K },
  ): Constraint<this, T, K>;

  /**
   * Helper function to convert an underlying Runtype into another static type
   * via a type guard function.  The static type of the runtype is inferred from
   * the type of the guard function.
   *
   * @template T - Typically inferred from the return type of the type guard
   * function, so usually not needed to specify manually.
   * @param {(x: Static<this>) => x is T} guard - Type guard function (see
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
   *
   * @param [options]
   * @param {string} [options.name] - allows setting the name of this
   * constrained runtype, which is helpful in reflection or diagnostic
   * use-cases.
   */
  withGuard<T extends Static<this>, K = unknown>(
    guard: (x: Static<this>) => x is T,
    options?: { name?: string; args?: K },
  ): Constraint<this, T, K>;

  /**
   * Performs arbitrary transformation of the value when validating.
   *
   * @template T - Typically inferred from the return type of the transformer
   * function, so usually not needed to specify manually.
   * @template R - Typically inferred from the underlying runtype so usually not
   * needed to specify manually.
   * @param {(x: Static<R>) => T} transformer - If the transformation succeeded,
   * return resulting value. If it failed, throw with a value that describes the
   * error, for example "Error message" or `new Error("message")`. The exception
   * is caught by the runtype.
   * @param [options]
   * @param {string} [options.name] - Allows setting the name of this which is
   * helpful in reflection or diagnostic use-cases.
   */
  withTransform<T extends unknown, R extends Runtype = this>(
    transformer: Transformer<this, T>,
    options?: { name?: string },
  ): Transform<R, T>;

  /**
   * Adds a brand to the type.
   */
  withBrand<B extends string>(brand: B): Brand<B, this>;

  /**
   * Convert this to a Reflect, capable of introspecting the structure of the type.
   */
  reflect: Reflect;

  /* @internal */ _falseWitness: A;
}

/**
 * Obtains the static type associated with a Runtype.
 */
export type Static<A extends Runtype> = A['_falseWitness'];

export function create<A extends Runtype>(
  validate: (x: any, visited: VisitedState) => Result<Static<A>>,
  A: any,
): A {
  A.check = check;
  A.assert = check;
  A._innerValidate = (value: any, visited: VisitedState) => {
    if (visited.has(value, A)) return { success: true, value };
    return validate(value, visited);
  };
  A.validate = (value: any) => A._innerValidate(value, VisitedState());
  A.guard = guard;
  A.Or = Or;
  A.And = And;
  A.withConstraint = withConstraint;
  A.withGuard = withGuard;
  A.withTransform = withTransform;
  A.withBrand = withBrand;
  A.reflect = A;
  A.toString = () => `Runtype<${show(A)}>`;

  return A;

  function check(x: any) {
    const validated = A.validate(x);
    if (validated.success) {
      return validated.value;
    }
    throw new ValidationError(validated.message, validated.key);
  }

  function guard(x: any): x is A {
    return A.validate(x).success;
  }

  function Or<B extends Runtype>(B: B): Union2<A, B> {
    return Union(A, B);
  }

  function And<B extends Runtype>(B: B): Intersect2<A, B> {
    return Intersect(A, B);
  }

  function withConstraint<T extends Static<A>, K = unknown>(
    constraint: ConstraintCheck<A>,
    options?: { name?: string; args?: K },
  ): Constraint<A, T, K> {
    return Constraint<A, T, K>(A, constraint, options);
  }

  function withGuard<T extends Static<A>, K = unknown>(
    guard: (x: Static<A>) => x is T,
    options?: { name?: string; args?: K },
  ): Constraint<A, T, K> {
    return Constraint<A, T, K>(A, guard, options);
  }

  function withTransform<T extends unknown>(
    transformer: Transformer<A, T>,
    options?: { name?: string },
  ): Transform<A, T> {
    return Transform(A, transformer, options);
  }

  function withBrand<B extends string>(B: B): Brand<B, A> {
    return Brand(B, A);
  }
}

export function innerValidate<A extends Runtype>(
  targetType: A,
  value: any,
  visited: VisitedState,
): Result<Static<A>> {
  return (targetType as any)._innerValidate(value, visited);
}

type VisitedState = {
  has: (candidate: object, type: Runtype) => boolean;
};
function VisitedState(): VisitedState {
  const members: WeakMap<object, WeakMap<Runtype, true>> = new WeakMap();

  const add = (candidate: object, type: Runtype) => {
    if (candidate === null || !(typeof candidate === 'object')) return;
    const typeSet = members.get(candidate);
    members.set(
      candidate,
      typeSet ? typeSet.set(type, true) : (new WeakMap() as WeakMap<Runtype, true>).set(type, true),
    );
  };

  const has = (candidate: object, type: Runtype) => {
    const typeSet = members.get(candidate);
    const value = (typeSet && typeSet.get(type)) || false;
    add(candidate, type);
    return value;
  };

  return { has };
}
