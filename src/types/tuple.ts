import { Reflect } from '../reflect';
import { Details, Result } from '../result';
import { Runtype, RuntypeBase, Static, create, innerValidate } from '../runtype';
import { enumerableKeysOf, FAILURE, SUCCESS } from '../util';
import { Never } from './never';

export interface Tuple<A extends readonly RuntypeBase[]>
  extends Runtype<
    {
      [K in keyof A]: A[K] extends RuntypeBase ? Static<A[K]> : unknown;
    }
  > {
  tag: 'tuple';
  components: A;

  readonly properties: A;
}

/**
 * Construct a tuple runtype from runtypes for each of its elements.
 */
export function Tuple<T extends readonly RuntypeBase[]>(...components: T): Tuple<T> {
  const properties = new Proxy(components, {
    get: (components, key) => components[key as any] || Never,
  });
  const self = ({ tag: 'tuple', components, properties } as unknown) as Reflect;
  return create<any>((xs, visited) => {
    if (!Array.isArray(xs)) return FAILURE.TYPE_INCORRECT(self, xs);

    if (xs.length !== components.length)
      return FAILURE.CONSTRAINT_FAILED(
        self,
        `Expected length ${components.length}, but was ${xs.length}`,
      );

    const keys = enumerableKeysOf(xs);
    const results: Result<unknown>[] = keys.map(key =>
      innerValidate(components[key as any], xs[key as any], visited),
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
  }, self);
}
