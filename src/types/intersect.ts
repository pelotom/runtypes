import { Reflect } from '../reflect';
import { Runtype, RuntypeBase, Static, create, innerValidate } from '../runtype';
import { Merge, SUCCESS, UnionToIntersection, UnionToTuple } from '../util';
import { Never } from './never';

export interface Intersect<A extends readonly [RuntypeBase, ...RuntypeBase[]]>
  extends Runtype<
    // We use the fact that a union of functions is effectively an intersection of parameters
    // e.g. to safely call (({x: 1}) => void | ({y: 2}) => void) you must pass {x: 1, y: 2}
    {
      [K in keyof A]: A[K] extends RuntypeBase ? (parameter: Static<A[K]>) => any : unknown;
    }[number] extends (k: infer I) => void
      ? I
      : never
  > {
  tag: 'intersect';
  intersectees: A;

  readonly properties: {
    [K in keyof A]: A[K] extends { properties: unknown } ? A[K] : never;
  }[number] extends never
    ? {}
    : {
        [K in keyof A]: A[K] extends { properties: unknown } ? A[K] : never;
      }[number]['properties'] extends infer U
    ? UnionToIntersection<U> extends infer I
      ? Merge<{ [K in keyof I]: I[K] extends never ? unknown : I[K] } & U> extends infer M
        ? {
            [K in keyof M]: UnionToTuple<M[K]> extends infer T
              ? T extends [RuntypeBase, ...RuntypeBase[]]
                ? T extends [RuntypeBase, RuntypeBase, ...RuntypeBase[]]
                  ? Intersect<T>
                  : T[0]
                : never
              : never;
          }
        : never
      : never
    : never;
}

/**
 * Construct an intersection runtype from runtypes for its alternatives.
 */
export function Intersect<A extends readonly [RuntypeBase, ...RuntypeBase[]]>(
  ...intersectees: A
): Intersect<A> {
  const properties = new Proxy(intersectees, {
    get: (intersectees, key) => {
      const intersecteesForProperty = intersectees
        .filter(intersectee => 'properties' in intersectee)
        .map(intersectee => (intersectee as any).properties[key as any])
        .filter(alternative => alternative.tag !== 'never');
      const runtypeForProperty =
        intersecteesForProperty.length === 0
          ? Never
          : intersecteesForProperty.length === 1
          ? intersecteesForProperty[0]
          : Intersect(...(intersecteesForProperty as [RuntypeBase, ...RuntypeBase[]]));
      return runtypeForProperty;
    },
  });
  const self = ({ tag: 'intersect', intersectees, properties } as unknown) as Reflect;
  return create((value, visited) => {
    for (const targetType of intersectees) {
      const result = innerValidate(targetType, value, visited);
      if (!result.success) return result;
    }
    return SUCCESS(value);
  }, self);
}
