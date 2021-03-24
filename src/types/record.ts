import { Runtype, Static, create, innerValidate } from '../runtype';
import { hasKey, pick as pickByKey, omit as omitByKey } from '../util';
import show from '../show';
import { Optional } from './optional';

type FilterOptionalKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends Optional<any> ? K : never;
  }[keyof T],
  undefined
>;
type FilterRequiredKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends Optional<any> ? never : K;
  }[keyof T],
  undefined
>;

type MergedRecord<O extends { [_: string]: Runtype }> = {
  [K in FilterRequiredKeys<O>]: Static<O[K]>;
} &
  {
    [K in FilterOptionalKeys<O>]?: Static<O[K]>;
  } extends infer P
  ? { [K in keyof P]: P[K] }
  : never;

type MergedRecordReadonly<O extends { [_: string]: Runtype }> = {
  [K in FilterRequiredKeys<O>]: Static<O[K]>;
} &
  {
    [K in FilterOptionalKeys<O>]?: Static<O[K]>;
  } extends infer P
  ? { readonly [K in keyof P]: P[K] }
  : never;

type RecordStaticType<
  O extends { [_: string]: Runtype },
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
  O extends { [_: string]: Runtype },
  Part extends boolean,
  RO extends boolean
> extends Runtype<RecordStaticType<O, Part, RO>> {
  tag: 'record';
  fields: O;
  isPartial: Part;
  isReadonly: RO;

  asPartial(): InternalRecord<O, true, RO>;
  asReadonly(): InternalRecord<O, Part, true>;
  pick<K extends keyof O>(keys: K[]): InternalRecord<Pick<O, K>, Part, RO>;
  omit<K extends keyof O>(keys: K[]): InternalRecord<Omit<O, K>, Part, RO>;
}

export type Record<O extends { [_: string]: Runtype }, RO extends boolean> = InternalRecord<
  O,
  false,
  RO
>;

export type Partial<O extends { [_: string]: Runtype }, RO extends boolean> = InternalRecord<
  O,
  true,
  RO
>;

/**
 * Construct a record runtype from runtypes for its values.
 */
export function InternalRecord<
  O extends { [_: string]: Runtype },
  Part extends boolean,
  RO extends boolean
>(fields: O, isPartial: Part, isReadonly: RO): InternalRecord<O, Part, RO> {
  return withExtraModifierFuncs(
    create(
      (x, visited) => {
        if (x === null || x === undefined) {
          const a = create<any>(_x => ({ success: true, value: _x }), { tag: 'record', fields });
          return { success: false, message: `Expected ${show(a)}, but was ${x}` };
        }

        for (const key in fields) {
          const isOptional = isPartial || fields[key].reflect.tag === 'optional';
          if (hasKey(key, x)) {
            if (isOptional && x[key] === undefined) continue;
            const validated = innerValidate(fields[key], x[key], visited);
            if (!validated.success) {
              return {
                success: false,
                message: validated.message,
                key: validated.key ? `${key}.${validated.key}` : key,
              };
            }
          } else if (!isOptional) {
            return {
              success: false,
              message: `Expected "${key}" property to be present, but was missing`,
              key,
            };
          }
        }

        return { success: true, value: x };
      },
      { tag: 'record', isPartial, isReadonly, fields },
    ),
  );
}

export function Record<O extends { [_: string]: Runtype }>(fields: O): Record<O, false> {
  return InternalRecord(fields, false, false);
}

export function Partial<O extends { [_: string]: Runtype }>(fields: O): Partial<O, false> {
  return InternalRecord(fields, true, false);
}

function withExtraModifierFuncs<
  O extends { [_: string]: Runtype },
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

  function pick<K extends keyof O>(keys: K[]): InternalRecord<Pick<O, K>, Part, RO> {
    return InternalRecord(pickByKey(A.fields, keys), A.isPartial, A.isReadonly);
  }

  function omit<K extends keyof O>(keys: K[]): InternalRecord<Omit<O, K>, Part, RO> {
    return InternalRecord(omitByKey(A.fields, keys), A.isPartial, A.isReadonly);
  }
}
