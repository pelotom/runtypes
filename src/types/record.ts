import { Runtype, RuntypeBase, Static, create, innerValidate } from '../runtype';
import { enumerableKeysOf, FAILURE, hasKey, SUCCESS } from '../util';
import { Optional } from './optional';
import { Details, Result } from '../result';
import { Never } from './never';

type FilterOptionalKeys<T> = {
  [K in keyof T]: T[K] extends Optional<any> ? K : never;
}[keyof T];
type FilterRequiredKeys<T> = {
  [K in keyof T]: T[K] extends Optional<any> ? never : K;
}[keyof T];

type MergedRecord<O extends { [_: string]: RuntypeBase }> = {
  [K in FilterRequiredKeys<O>]: Static<O[K]>;
} &
  {
    [K in FilterOptionalKeys<O>]?: Static<O[K]>;
  } extends infer P
  ? { [K in keyof P]: P[K] }
  : never;

type MergedRecordReadonly<O extends { [_: string]: RuntypeBase }> = {
  [K in FilterRequiredKeys<O>]: Static<O[K]>;
} &
  {
    [K in FilterOptionalKeys<O>]?: Static<O[K]>;
  } extends infer P
  ? { readonly [K in keyof P]: P[K] }
  : never;

type RecordStaticType<
  O extends { [_: string]: RuntypeBase },
  Part extends boolean,
  RO extends boolean
> = Part extends true
  ? RO extends true
    ? { readonly [K in keyof O]?: Static<O[K]> }
    : { [K in keyof O]?: Static<O[K]> }
  : RO extends true
  ? MergedRecordReadonly<O>
  : MergedRecord<O>;

export interface InternalRecord<
  O extends { [_: string]: RuntypeBase },
  Part extends boolean,
  RO extends boolean
> extends Runtype<RecordStaticType<O, Part, RO>> {
  tag: 'record';
  fields: O;
  isPartial: Part;
  isReadonly: RO;

  asPartial(): InternalRecord<O, true, RO>;
  asReadonly(): InternalRecord<O, Part, true>;

  pick<K extends keyof O>(
    ...keys: K[] extends (keyof O)[] ? K[] : never[]
  ): InternalRecord<Pick<O, K>, Part, RO>;
  omit<K extends keyof O>(
    ...keys: K[] extends (keyof O)[] ? K[] : never[]
  ): InternalRecord<Omit<O, K>, Part, RO>;

  readonly properties: O;
}

export type Record<
  O extends { [_: string]: RuntypeBase },
  RO extends boolean = boolean
> = InternalRecord<O, false, RO>;

export type Partial<
  O extends { [_: string]: RuntypeBase },
  RO extends boolean = boolean
> = InternalRecord<O, true, RO>;

/**
 * Construct a record runtype from runtypes for its values.
 */
export function InternalRecord<
  O extends { [_: string]: RuntypeBase },
  Part extends boolean,
  RO extends boolean
>(fields: O, isPartial: Part, isReadonly: RO): InternalRecord<O, Part, RO> {
  const properties = new Proxy(fields, {
    get: (fields, key) => fields[key as any] || Never,
  });
  const self = { tag: 'record', isPartial, isReadonly, fields, properties } as any;
  return withExtraModifierFuncs(
    create((x, visited) => {
      if (x === null || x === undefined) {
        return FAILURE.TYPE_INCORRECT(self, x);
      }

      const keysOfFields = enumerableKeysOf(fields);
      if (keysOfFields.length !== 0 && typeof x !== 'object')
        return FAILURE.TYPE_INCORRECT(self, x);

      const keys = [...new Set([...keysOfFields, ...enumerableKeysOf(x)])];
      const results = keys.reduce<{ [key in string | number | symbol]: Result<unknown> }>(
        (results, key) => {
          const fieldsHasKey = hasKey(key, fields);
          const xHasKey = hasKey(key, x);
          if (fieldsHasKey) {
            const runtype = fields[key as any];
            const isOptional = isPartial || runtype.reflect.tag === 'optional';
            if (xHasKey) {
              const value = x[key as any];
              if (isOptional && value === undefined) results[key as any] = SUCCESS(value);
              else results[key as any] = innerValidate(runtype, value, visited);
            } else {
              if (!isOptional) results[key as any] = FAILURE.PROPERTY_MISSING(runtype.reflect);
              else results[key as any] = SUCCESS(undefined);
            }
          } else if (xHasKey) {
            // TODO: exact record validation
            const value = x[key as any];
            results[key as any] = SUCCESS(value);
          } else {
            /* istanbul ignore next */
            throw new Error('impossible');
          }
          return results;
        },
        {},
      );

      const details = keys.reduce<{ [key in string | number | symbol]: string | Details }>(
        (details, key) => {
          const result = results[key as any];
          if (!result.success) details[key as any] = result.details || result.message;
          return details;
        },
        {},
      );

      if (enumerableKeysOf(details).length !== 0) return FAILURE.CONTENT_INCORRECT(self, details);
      else return SUCCESS(x);
    }, self),
  );
}

export function Record<O extends { [_: string]: RuntypeBase }>(fields: O): Record<O, false> {
  return InternalRecord(fields, false, false);
}

export function Partial<O extends { [_: string]: RuntypeBase }>(fields: O): Partial<O, false> {
  return InternalRecord(fields, true, false);
}

function withExtraModifierFuncs<
  O extends { [_: string]: RuntypeBase },
  Part extends boolean,
  RO extends boolean
>(A: any): InternalRecord<O, Part, RO> {
  A.asPartial = asPartial;
  A.asReadonly = asReadonly;
  A.pick = pick;
  A.omit = omit;

  return A;

  function asPartial() {
    return InternalRecord(A.fields, true, A.isReadonly);
  }

  function asReadonly() {
    return InternalRecord(A.fields, A.isPartial, true);
  }

  function pick<K extends keyof O>(
    ...keys: K[] extends (keyof O)[] ? K[] : never[]
  ): InternalRecord<Pick<O, K>, Part, RO> {
    const result: any = {};
    keys.forEach(key => {
      result[key] = A.fields[key];
    });
    return InternalRecord(result, A.isPartial, A.isReadonly);
  }

  function omit<K extends keyof O>(
    ...keys: K[] extends (keyof O)[] ? K[] : never[]
  ): InternalRecord<Omit<O, K>, Part, RO> {
    const result: any = {};
    const existingKeys = enumerableKeysOf(A.fields);
    existingKeys.forEach(key => {
      if (!(keys as (string | symbol)[]).includes(key)) result[key] = A.fields[key];
    });
    return InternalRecord(result, A.isPartial, A.isReadonly);
  }
}
