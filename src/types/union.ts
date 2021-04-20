import { Runtype, RuntypeBase, Static, create, innerValidate } from '../runtype';
import { LiteralBase } from './literal';
import { FAILURE, hasKey, SUCCESS, UnionToTuple, Merge } from '../util';
import { Reflect } from '../reflect';
import { Never } from './never';

export interface Union<A extends readonly [RuntypeBase, ...RuntypeBase[]]>
  extends Runtype<
    {
      [K in keyof A]: A[K] extends RuntypeBase ? Static<A[K]> : unknown;
    }[number]
  > {
  tag: 'union';
  alternatives: A;
  match: Match<A>;

  readonly properties: {
    [K in keyof A]: A[K] extends { properties: unknown } ? never : A[K];
  }[number] extends never
    ? Merge<
        {
          [K in keyof A]: A[K] extends { properties: unknown } ? A[K] : never;
        }[number]['properties']
      > extends infer M
      ? {
          [K in keyof M]: UnionToTuple<M[K]> extends infer T
            ? T extends [RuntypeBase, ...RuntypeBase[]]
              ? T extends [RuntypeBase, RuntypeBase, ...RuntypeBase[]]
                ? Union<T>
                : T[0]
              : never
            : never;
        }
      : never
    : {};
}

/**
 * Construct a union runtype from runtypes for its alternatives.
 */
export function Union<T extends readonly [RuntypeBase, ...RuntypeBase[]]>(
  ...alternatives: T
): Union<T> {
  const match = (...cases: any[]) => (x: any) => {
    for (let i = 0; i < alternatives.length; i++) {
      if (alternatives[i].guard(x)) {
        return cases[i](x);
      }
    }
  };

  const properties = new Proxy(alternatives, {
    get: (alternatives, key) => {
      const alternativesForProperty = alternatives
        .filter(alternative => 'properties' in alternative)
        .map(alternative => (alternative as any).properties[key as any])
        .filter(alternative => alternative.tag !== 'never');
      const runtypeForProperty =
        alternativesForProperty.length !== alternatives.length
          ? Never
          : alternativesForProperty.length === 1
          ? alternativesForProperty[0]
          : Union(...(alternativesForProperty as [Runtype, ...Runtype[]]));
      return runtypeForProperty;
    },
  });
  const self = ({ tag: 'union', alternatives, match, properties } as unknown) as Reflect;
  return create<any>((value, visited) => {
    if (typeof value !== 'object' || value === null) {
      for (const alternative of alternatives)
        if (innerValidate(alternative, value, visited).success) return SUCCESS(value);
      return FAILURE.TYPE_INCORRECT(self, value);
    }

    const commonLiteralFields: { [K: string]: LiteralBase[] } = {};
    for (const alternative of alternatives) {
      if (alternative.reflect.tag === 'record') {
        for (const fieldName in alternative.reflect.fields) {
          const field = alternative.reflect.fields[fieldName];
          if (field.tag === 'literal') {
            if (commonLiteralFields[fieldName]) {
              if (commonLiteralFields[fieldName].every(value => value !== field.value)) {
                commonLiteralFields[fieldName].push(field.value);
              }
            } else {
              commonLiteralFields[fieldName] = [field.value];
            }
          }
        }
      }
    }

    for (const fieldName in commonLiteralFields) {
      if (commonLiteralFields[fieldName].length === alternatives.length) {
        for (const alternative of alternatives) {
          if (alternative.reflect.tag === 'record') {
            const field = alternative.reflect.fields[fieldName];
            if (
              field.tag === 'literal' &&
              hasKey(fieldName, value) &&
              value[fieldName] === field.value
            ) {
              return innerValidate(alternative, value, visited);
            }
          }
        }
      }
    }

    for (const alternative of alternatives)
      if (innerValidate(alternative, value, visited).success) return SUCCESS(value);
    return FAILURE.CONTENT_INCORRECT(self, value);
  }, self);
}

export interface Match<A extends readonly [RuntypeBase, ...RuntypeBase[]]> {
  <Z>(...a: { [K in keyof A]: A[K] extends RuntypeBase ? Case<A[K], Z> : never }): Matcher<A, Z>;
}

export type Case<T extends RuntypeBase, Result> = (v: Static<T>) => Result;

export type Matcher<A extends readonly [RuntypeBase, ...RuntypeBase[]], Z> = (
  x: {
    [K in keyof A]: A[K] extends RuntypeBase<infer Type> ? Type : unknown;
  }[number],
) => Z;
