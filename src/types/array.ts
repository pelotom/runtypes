import { Reflect } from '../reflect';
import { Details, Result } from '../result';
import { Runtype, RuntypeBase, Static, create, innerValidate } from '../runtype';
import { enumerableKeysOf, FAILURE, isNumberLikeString, SUCCESS } from '../util';
import { Never } from './never';

type ArrayStaticType<E extends RuntypeBase, RO extends boolean> = RO extends true
  ? ReadonlyArray<Static<E>>
  : Static<E>[];

interface Arr<E extends RuntypeBase, RO extends boolean = boolean>
  extends Runtype<ArrayStaticType<E, RO>> {
  tag: 'array';
  element: E;
  isReadonly: RO;

  asReadonly(): Arr<E, true>;

  readonly properties: { [_: number]: E };
}

/**
 * Construct an array runtype from a runtype for its elements.
 */
function InternalArr<E extends RuntypeBase, RO extends boolean>(
  element: E,
  isReadonly: RO,
): Arr<E, RO> {
  const properties = new Proxy(
    {},
    {
      get: (_, key) => (typeof key === 'string' && isNumberLikeString(key) ? element : Never),
    },
  );
  const self = ({ tag: 'array', isReadonly, element, properties } as unknown) as Reflect;
  return withExtraModifierFuncs(
    create((xs, visited) => {
      if (!Array.isArray(xs)) return FAILURE.TYPE_INCORRECT(self, xs);

      const keys = enumerableKeysOf(xs);
      const results: Result<unknown>[] = keys.map(key =>
        innerValidate(element, xs[key as any], visited),
      );
      const details = keys.reduce<{ [key: number]: string | Details } & (string | Details)[]>(
        (details, key) => {
          const result = results[key as any];
          if (!result.success) details[key as any] = result.details || result.message;
          return details;
        },
        [],
      );

      if (enumerableKeysOf(details).length !== 0) return FAILURE.CONTENT_INCORRECT(self, details);
      else return SUCCESS(xs);
    }, self),
  );
}

function Arr<E extends RuntypeBase, RO extends boolean>(element: E): Arr<E, false> {
  return InternalArr(element, false);
}

function withExtraModifierFuncs<E extends RuntypeBase, RO extends boolean>(A: any): Arr<E, RO> {
  A.asReadonly = asReadonly;

  return A;

  function asReadonly(): Arr<E, true> {
    return InternalArr(A.element, true);
  }
}

export { Arr as Array };
