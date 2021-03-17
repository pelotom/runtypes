import { Runtype, Static, create, innerValidate } from '../runtype';

export interface Intersect1<A extends Runtype> extends Runtype<Static<A>> {
  tag: 'intersect';
  intersectees: [A];
}

export interface Intersect2<A extends Runtype, B extends Runtype>
  extends Runtype<Static<A> & Static<B>> {
  tag: 'intersect';
  intersectees: [A, B];
}
export interface Intersect3<A extends Runtype, B extends Runtype, C extends Runtype>
  extends Runtype<Static<A> & Static<B> & Static<C>> {
  tag: 'intersect';
  intersectees: [A, B, C];
}

export interface Intersect4<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype
> extends Runtype<Static<A> & Static<B> & Static<C> & Static<D>> {
  tag: 'intersect';
  intersectees: [A, B, C, D];
}

export interface Intersect5<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype
> extends Runtype<Static<A> & Static<B> & Static<C> & Static<D> & Static<E>> {
  tag: 'intersect';
  intersectees: [A, B, C, D, E];
}

export interface Intersect6<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype
> extends Runtype<Static<A> & Static<B> & Static<C> & Static<D> & Static<E> & Static<F>> {
  tag: 'intersect';
  intersectees: [A, B, C, D, E, F];
}

export interface Intersect7<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype
> extends Runtype<
    Static<A> & Static<B> & Static<C> & Static<D> & Static<E> & Static<F> & Static<G>
  > {
  tag: 'intersect';
  intersectees: [A, B, C, D, E, F, G];
}

export interface Intersect8<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype
> extends Runtype<
    Static<A> & Static<B> & Static<C> & Static<D> & Static<E> & Static<F> & Static<G> & Static<H>
  > {
  tag: 'intersect';
  intersectees: [A, B, C, D, E, F, G, H];
}

export interface Intersect9<
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
    Static<A> &
      Static<B> &
      Static<C> &
      Static<D> &
      Static<E> &
      Static<F> &
      Static<G> &
      Static<H> &
      Static<I>
  > {
  tag: 'intersect';
  intersectees: [A, B, C, D, E, F, G, H, I];
}

export interface Intersect10<
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
    Static<A> &
      Static<B> &
      Static<C> &
      Static<D> &
      Static<E> &
      Static<F> &
      Static<G> &
      Static<H> &
      Static<I> &
      Static<J>
  > {
  tag: 'intersect';
  intersectees: [A, B, C, D, E, F, G, H, I, J];
}

/**
 * Construct an intersection runtype from runtypes for its alternatives.
 */
export function Intersect<A extends Runtype>(A: A): Intersect1<A>;
export function Intersect<A extends Runtype, B extends Runtype>(A: A, B: B): Intersect2<A, B>;
export function Intersect<A extends Runtype, B extends Runtype, C extends Runtype>(
  A: A,
  B: B,
  C: C,
): Intersect3<A, B, C>;
export function Intersect<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype
>(A: A, B: B, C: C, D: D): Intersect4<A, B, C, D>;
export function Intersect<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype
>(A: A, B: B, C: C, D: D, E: E): Intersect5<A, B, C, D, E>;
export function Intersect<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F): Intersect6<A, B, C, D, E, F>;
export function Intersect<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G): Intersect7<A, B, C, D, E, F, G>;
export function Intersect<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H): Intersect8<A, B, C, D, E, F, G, H>;
export function Intersect<
  A extends Runtype,
  B extends Runtype,
  C extends Runtype,
  D extends Runtype,
  E extends Runtype,
  F extends Runtype,
  G extends Runtype,
  H extends Runtype,
  I extends Runtype
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H, I: I): Intersect9<A, B, C, D, E, F, G, H, I>;
export function Intersect<
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
): Intersect10<A, B, C, D, E, F, G, H, I, J>;
export function Intersect(...intersectees: Runtype[]): any {
  return create(
    (value, visited) => {
      const result: typeof value = {};

      for (const targetType of intersectees) {
        const validated = innerValidate(targetType, value, visited);
        if (!validated.success) return validated;
        else Object.assign(result, validated.value);
      }
      return { success: true, value: result };
    },
    { tag: 'intersect', intersectees },
  );
}
