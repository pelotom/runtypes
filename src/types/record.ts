import { Runtype, Static, create, innerValidate } from '../runtype';
import { hasKey } from '../util';
import show from '../show';

type RecordStaticType<
  O extends { [_: string]: Runtype },
  Part extends boolean,
  RO extends boolean
> = Part extends true
  ? RO extends true
    ? { readonly [K in keyof O]?: Static<O[K]> }
    : { [K in keyof O]?: Static<O[K]> }
  : RO extends true
  ? { readonly [K in keyof O]: Static<O[K]> }
  : { [K in keyof O]: Static<O[K]> };

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

        const result: typeof x = {};

        for (const key in fields) {
          if (!isPartial || (hasKey(key, x) && x[key] !== undefined)) {
            const value = isPartial || hasKey(key, x) ? x[key] : undefined;
            const validated = innerValidate(fields[key], value, visited);
            if (!validated.success) {
              return {
                success: false,
                message: validated.message,
                key: validated.key ? `${key}.${validated.key}` : key,
              };
            } else result[key] = validated.value;
          }
        }

        return { success: true, value: result };
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

  return A;

  function asPartial() {
    return InternalRecord(A.fields, true, A.isReadonly);
  }

  function asReadonly() {
    return InternalRecord(A.fields, A.isPartial, true);
  }
}
