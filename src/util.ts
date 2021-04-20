// Type guard to determine if an object has a given key

import { Reflect } from './reflect';
import { Details, Failcode, Failure, Success } from './result';
import show from './show';

// If this feature gets implemented, we can use `in` instead: https://github.com/Microsoft/TypeScript/issues/10485
export function hasKey<K extends string | number | symbol>(
  key: K,
  object: unknown,
): object is { [_ in K]: unknown } {
  return typeof object === 'object' && object !== null && key in object;
}

export const typeOf = (value: unknown) =>
  typeof value === 'object'
    ? value === null
      ? 'null'
      : Array.isArray(value)
      ? 'array'
      : value.constructor.name === 'Object'
      ? 'object'
      : value.constructor.name
    : typeof value;

export const enumerableKeysOf = (object: unknown) =>
  typeof object === 'object' && object !== null
    ? // Objects with a null prototype may not have `propertyIsEnumerable`
      Reflect.ownKeys(object).filter(key => object.propertyIsEnumerable?.(key) ?? true)
    : [];

export function SUCCESS<T extends unknown>(value: T): Success<T> {
  return { success: true, value };
}

export const FAILURE = Object.assign(
  (code: Failcode, message: string, details?: Details): Failure => ({
    success: false,
    code,
    message,
    ...(details ? { details } : {}),
  }),
  {
    TYPE_INCORRECT: (self: Reflect, value: unknown) => {
      const message = `Expected ${show(self)}, but was ${typeOf(value)}`;
      return FAILURE(Failcode.TYPE_INCORRECT, message);
    },
    VALUE_INCORRECT: (name: string, expected: unknown, received: unknown) => {
      return FAILURE(
        Failcode.VALUE_INCORRECT,
        `Expected ${name} ${String(expected)}, but was ${String(received)}`,
      );
    },
    KEY_INCORRECT: (self: Reflect, expected: Reflect, value: unknown) => {
      return FAILURE(
        Failcode.KEY_INCORRECT,
        `Expected ${show(self)} key to be ${show(expected)}, but was ${typeOf(value)}`,
      );
    },
    CONTENT_INCORRECT: (self: Reflect, details: Details) => {
      const message = `Expected ${show(self)}, but was incompatible`;
      return FAILURE(Failcode.CONTENT_INCORRECT, message, details);
    },
    ARGUMENT_INCORRECT: (message: string) => {
      return FAILURE(Failcode.ARGUMENT_INCORRECT, message);
    },
    RETURN_INCORRECT: (message: string) => {
      return FAILURE(Failcode.RETURN_INCORRECT, message);
    },
    CONSTRAINT_FAILED: (self: Reflect, message?: string) => {
      const info = message ? `: ${message}` : '';
      return FAILURE(
        Failcode.CONSTRAINT_FAILED,
        `Failed constraint check for ${show(self)}${info}`,
      );
    },
    PROPERTY_MISSING: (self: Reflect) => {
      const message = `Expected ${show(self)}, but was missing`;
      return FAILURE(Failcode.PROPERTY_MISSING, message);
    },
    PROPERTY_PRESENT: (value: unknown) => {
      const message = `Expected nothing, but was ${typeOf(value)}`;
      return FAILURE(Failcode.PROPERTY_PRESENT, message);
    },
    NOTHING_EXPECTED: (value: unknown) => {
      const message = `Expected nothing, but was ${typeOf(value)}`;
      return FAILURE(Failcode.NOTHING_EXPECTED, message);
    },
  },
);

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
export type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R
  ? R
  : never;
export type Push<T extends any[], V> = [...T, V];
export type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>;

export type TupleToUnion<T extends unknown[]> = T[number];
export type TupleToIntersection<T extends unknown[]> = UnionToIntersection<TupleToUnion<T>>;

export type Merge<T> = Pick<T, keyof T>;

export const isNumberLikeString = (string: string) => /^(?:0|[1-9][0-9]*)$/u.test(string);
