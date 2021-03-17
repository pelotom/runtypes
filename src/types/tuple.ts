import { Runtype, Static, create, innerValidate } from '../runtype';
import { Array as Arr } from './array';
import { Unknown } from './unknown';

export interface Tuple0 extends Runtype {
  tag: 'tuple';
  components: [];
}

export interface Tuple1<A extends Runtype> extends Runtype<[Static<A>]> {
  tag: 'tuple';
  components: [A];
}

export interface Tuple2<A extends Runtype, B extends Runtype>
  extends Runtype<[Static<A>, Static<B>]> {
  tag: 'tuple';
  components: [A, B];
}

export interface Tuple3<A extends Runtype, B extends Runtype, C extends Runtype>
  extends Runtype<[Static<A>, Static<B>, Static<C>]> {
  tag: 'tuple';
  components: [A, B, C];
}

export interface Tuple4<A extends Runtype, B extends Runtype, C extends Runtype, D extends Runtype>
  extends Runtype<[Static<A>, Static<B>, Static<C>, Static<D>]> {
  tag: 'tuple';
  components: [A, B, C, D];
}

export interface Tuple5<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype
> extends Runtype<[Static<A>, Static<B>, Static<C>, Static<D>, Static<E>]> {
  tag: 'tuple';
  components: [A, B, C, D, E];
}

export interface Tuple6<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype
> extends Runtype<[Static<A>, Static<B>, Static<C>, Static<D>, Static<E>, Static<F>]> {
  tag: 'tuple';
  components: [A, B, C, D, E, F];
}

export interface Tuple7<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype
> extends Runtype<[Static<A>, Static<B>, Static<C>, Static<D>, Static<E>, Static<F>, Static<G>]> {
  tag: 'tuple';
  components: [A, B, C, D, E, F, G];
}

export interface Tuple8<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype
> extends Runtype<
    [Static<A>, Static<B>, Static<C>, Static<D>, Static<E>, Static<F>, Static<G>, Static<H>]
  > {
  tag: 'tuple';
  components: [A, B, C, D, E, F, G, H];
}

export interface Tuple9<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype,
  I extends Runtype
> extends Runtype<
    [
      Static<A>,
      Static<B>,
      Static<C>,
      Static<D>,
      Static<E>,
      Static<F>,
      Static<G>,
      Static<H>,
      Static<I>,
    ]
  > {
  tag: 'tuple';
  components: [A, B, C, D, E, F, G, H, I];
}

export interface Tuple10<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype,
  I extends Runtype,
  J extends Runtype
> extends Runtype<
    [
      Static<A>,
      Static<B>,
      Static<C>,
      Static<D>,
      Static<E>,
      Static<F>,
      Static<G>,
      Static<H>,
      Static<I>,
      Static<J>,
    ]
  > {
  tag: 'tuple';
  components: [A, B, C, D, E, F, G, H, I, J];
}

/**
 * Construct a tuple runtype from runtypes for each of its elements.
 */
export function Tuple(): Tuple0;
export function Tuple<A extends Runtype>(A: A): Tuple1<A>;
export function Tuple<A extends Runtype, B extends Runtype>(A: A, B: B): Tuple2<A, B>;
export function Tuple<A extends Runtype, B extends Runtype, C extends Runtype>(
  A: A,
  B: B,
  C: C,
): Tuple3<A, B, C>;
export function Tuple<A extends Runtype, B extends Runtype, C extends Runtype, D extends Runtype>(
  A: A,
  B: B,
  C: C,
  D: D,
): Tuple4<A, B, C, D>;
export function Tuple<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype
>(A: A, B: B, C: C, D: D, E: E): Tuple5<A, B, C, D, E>;
export function Tuple<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F): Tuple6<A, B, C, D, E, F>;
export function Tuple<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G): Tuple7<A, B, C, D, E, F, G>;
export function Tuple<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H): Tuple8<A, B, C, D, E, F, G, H>;
export function Tuple<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype,
  I extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H, I: I): Tuple9<A, B, C, D, E, F, G, H, I>;
export function Tuple<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype,
  I extends Runtype,
  J extends Runtype
>(
  A: A,
  B: B,
  C: C,
  D: D,
  E: E,
  F: F,
  G: G,
  H: H,
  I: I,
  J: J,
): Tuple10<A, B, C, D, E, F, G, H, I, J>;
export function Tuple(...components: Runtype[]): any {
  return create(
    (x, visited) => {
      const validated = innerValidate(Arr(Unknown), x, visited);

      if (!validated.success) {
        return {
          success: false,
          message: `Expected tuple to be an array: ${validated.message}`,
          key: validated.key,
        };
      }

      if (validated.value.length !== components.length) {
        return {
          success: false,
          message: `Expected an array of length ${components.length}, but was ${validated.value.length}`,
        };
      }

      const result: typeof x = [];

      for (let i = 0; i < components.length; i++) {
        const validatedComponent = innerValidate(components[i], validated.value[i], visited);

        if (!validatedComponent.success) {
          return {
            success: false,
            message: validatedComponent.message,
            key: validatedComponent.key ? `[${i}].${validatedComponent.key}` : `[${i}]`,
          };
        } else result.push(validatedComponent.value);
      }

      return { success: true, value: result };
    },
    { tag: 'tuple', components },
  );
}
