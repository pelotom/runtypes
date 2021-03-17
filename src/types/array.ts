import { Runtype, Static, create, innerValidate } from '../runtype';

type ArrayStaticType<E extends Runtype, RO extends boolean> = RO extends true
  ? ReadonlyArray<Static<E>>
  : Static<E>[];

interface Arr<E extends Runtype, RO extends boolean> extends Runtype<ArrayStaticType<E, RO>> {
  tag: 'array';
  element: E;
  isReadonly: RO;

  asReadonly(): Arr<E, true>;
}

/**
 * Construct an array runtype from a runtype for its elements.
 */
function InternalArr<E extends Runtype, RO extends boolean>(
  element: E,
  isReadonly: RO,
): Arr<E, RO> {
  return withExtraModifierFuncs(
    create(
      (xs, visited) => {
        if (!Array.isArray(xs)) {
          return {
            success: false,
            message: `Expected array, but was ${xs === null ? xs : typeof xs}`,
          };
        }

        const result: typeof xs = [];

        for (const x of xs) {
          const validated = innerValidate(element, x, visited);
          if (!validated.success) {
            return {
              success: false,
              message: validated.message,
              key: validated.key ? `[${xs.indexOf(x)}].${validated.key}` : `[${xs.indexOf(x)}]`,
            };
          } else result.push(validated.value);
        }

        return { success: true, value: result };
      },
      { tag: 'array', isReadonly, element },
    ),
  );
}

function Arr<E extends Runtype, RO extends boolean>(element: E): Arr<E, false> {
  return InternalArr(element, false);
}

function withExtraModifierFuncs<E extends Runtype, RO extends boolean>(A: any): Arr<E, RO> {
  A.asReadonly = asReadonly;

  return A;

  function asReadonly(): Arr<E, true> {
    return InternalArr(A.element, true);
  }
}

export { Arr as Array };
