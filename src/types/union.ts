import { Runtype as Rt, Static, create, innerValidate } from '../runtype';
import show from '../show';
import { LiteralBase } from './literal';
import { hasKey } from '../util';

export interface Union1<A extends Rt> extends Rt<Static<A>> {
  tag: 'union';
  alternatives: [A];
  match: Match1<A>;
}

export interface Union2<A extends Rt, B extends Rt> extends Rt<Static<A> | Static<B>> {
  tag: 'union';
  alternatives: [A, B];
  match: Match2<A, B>;
}

export interface Union3<A extends Rt, B extends Rt, C extends Rt>
  extends Rt<Static<A> | Static<B> | Static<C>> {
  tag: 'union';
  alternatives: [A, B, C];
  match: Match3<A, B, C>;
}

export interface Union4<A extends Rt, B extends Rt, C extends Rt, D extends Rt>
  extends Rt<Static<A> | Static<B> | Static<C> | Static<D>> {
  tag: 'union';
  alternatives: [A, B, C, D];
  match: Match4<A, B, C, D>;
}

export interface Union5<A extends Rt, B extends Rt, C extends Rt, D extends Rt, E extends Rt>
  extends Rt<Static<A> | Static<B> | Static<C> | Static<D> | Static<E>> {
  tag: 'union';
  alternatives: [A, B, C, D, E];
  match: Match5<A, B, C, D, E>;
}

export interface Union6<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt
> extends Rt<Static<A> | Static<B> | Static<C> | Static<D> | Static<E> | Static<F>> {
  tag: 'union';
  alternatives: [A, B, C, D, E, F];
  match: Match6<A, B, C, D, E, F>;
}

export interface Union7<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt
> extends Rt<Static<A> | Static<B> | Static<C> | Static<D> | Static<E> | Static<F> | Static<G>> {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G];
  match: Match7<A, B, C, D, E, F, G>;
}

export interface Union8<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt
> extends Rt<
    Static<A> | Static<B> | Static<C> | Static<D> | Static<E> | Static<F> | Static<G> | Static<H>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H];
  match: Match8<A, B, C, D, E, F, G, H>;
}

export interface Union9<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I];
  match: Match9<A, B, C, D, E, F, G, H, I>;
}

export interface Union10<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J];
  match: Match10<A, B, C, D, E, F, G, H, I, J>;
}

export interface Union11<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K];
  match: Match11<A, B, C, D, E, F, G, H, I, J, K>;
}

export interface Union12<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L];
  match: Match12<A, B, C, D, E, F, G, H, I, J, K, L>;
}

export interface Union13<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M];
  match: Match13<A, B, C, D, E, F, G, H, I, J, K, L, M>;
}

export interface Union14<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N];
  match: Match14<A, B, C, D, E, F, G, H, I, J, K, L, M, N>;
}

export interface Union15<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];
  match: Match15<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>;
}

export interface Union16<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P];
  match: Match16<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>;
}

export interface Union17<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q];
  match: Match17<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>;
}

export interface Union18<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
    | Static<R>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R];
  match: Match18<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>;
}

export interface Union19<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
    | Static<R>
    | Static<S>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S];
  match: Match19<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>;
}

export interface Union20<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt,
  T extends Rt
> extends Rt<
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
    | Static<R>
    | Static<S>
    | Static<T>
  > {
  tag: 'union';
  alternatives: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T];
  match: Match20<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>;
}

/**
 * Construct a union runtype from runtypes for its alternatives.
 */
export function Union<A extends Rt>(A: A): Union1<A>;
export function Union<A extends Rt, B extends Rt>(A: A, B: B): Union2<A, B>;
export function Union<A extends Rt, B extends Rt, C extends Rt>(A: A, B: B, C: C): Union3<A, B, C>;
export function Union<A extends Rt, B extends Rt, C extends Rt, D extends Rt>(
  A: A,
  B: B,
  C: C,
  D: D,
): Union4<A, B, C, D>;
export function Union<A extends Rt, B extends Rt, C extends Rt, D extends Rt, E extends Rt>(
  A: A,
  B: B,
  C: C,
  D: D,
  E: E,
): Union5<A, B, C, D, E>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt
>(A: A, B: B, C: C, D: D, E: E, F: F): Union6<A, B, C, D, E, F>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G): Union7<A, B, C, D, E, F, G>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H): Union8<A, B, C, D, E, F, G, H>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt
>(A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H, I: I): Union9<A, B, C, D, E, F, G, H, I>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt
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
): Union10<A, B, C, D, E, F, G, H, I, J>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt
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
  K: K,
): Union11<A, B, C, D, E, F, G, H, I, J, K>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt
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
  K: K,
  L: L,
): Union12<A, B, C, D, E, F, G, H, I, J, K, L>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt
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
  K: K,
  L: L,
  M: M,
): Union13<A, B, C, D, E, F, G, H, I, J, K, L, M>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
): Union14<A, B, C, D, E, F, G, H, I, J, K, L, M, N>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
): Union15<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
): Union16<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
  Q: Q,
): Union17<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
  Q: Q,
  R: R,
): Union18<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
  Q: Q,
  R: R,
  S: S,
): Union19<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>;
export function Union<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt,
  T extends Rt
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
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
  Q: Q,
  R: R,
  S: S,
  T: T,
): Union20<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>;
export function Union(...alternatives: Rt[]): any {
  const match = (...cases: any[]) => (x: any) => {
    for (let i = 0; i < alternatives.length; i++) {
      if (alternatives[i].guard(x)) {
        return cases[i](x);
      }
    }
  };

  return create(
    (value, visited) => {
      const commonLiteralFields: { [key: string]: LiteralBase[] } = {};
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

      for (const targetType of alternatives) {
        const validated = innerValidate(targetType, value, visited);
        if (validated.success) return validated;
      }

      const a = create<any>(value as never, { tag: 'union', alternatives });
      return {
        success: false,
        message: `Expected ${show(a)}, but was ${value === null ? value : typeof value}`,
      };
    },
    { tag: 'union', alternatives, match },
  );
}

export interface Match1<A extends Rt> {
  <Z>(a: Case<A, Z>): Matcher1<A, Z>;
}
export interface Match2<A extends Rt, B extends Rt> {
  <Z>(a: Case<A, Z>, b: Case<B, Z>): Matcher2<A, B, Z>;
}
export interface Match3<A extends Rt, B extends Rt, C extends Rt> {
  <Z>(a: Case<A, Z>, b: Case<B, Z>, c: Case<C, Z>): Matcher3<A, B, C, Z>;
}
export interface Match4<A extends Rt, B extends Rt, C extends Rt, D extends Rt> {
  <Z>(a: Case<A, Z>, b: Case<B, Z>, c: Case<C, Z>, d: Case<D, Z>): Matcher4<A, B, C, D, Z>;
}
export interface Match5<A extends Rt, B extends Rt, C extends Rt, D extends Rt, E extends Rt> {
  <Z>(a: Case<A, Z>, b: Case<B, Z>, c: Case<C, Z>, d: Case<D, Z>, e: Case<E, Z>): Matcher5<
    A,
    B,
    C,
    D,
    E,
    Z
  >;
}
export interface Match6<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt
> {
  <Z>(
    a: Case<A, Z>,
    b: Case<B, Z>,
    c: Case<C, Z>,
    d: Case<D, Z>,
    e: Case<E, Z>,
    f: Case<F, Z>,
  ): Matcher6<A, B, C, D, E, F, Z>;
}
export interface Match7<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt
> {
  <Z>(
    a: Case<A, Z>,
    b: Case<B, Z>,
    c: Case<C, Z>,
    d: Case<D, Z>,
    e: Case<E, Z>,
    f: Case<F, Z>,
    g: Case<G, Z>,
  ): Matcher7<A, B, C, D, E, F, G, Z>;
}
export interface Match8<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt
> {
  <Z>(
    a: Case<A, Z>,
    b: Case<B, Z>,
    c: Case<C, Z>,
    d: Case<D, Z>,
    e: Case<E, Z>,
    f: Case<F, Z>,
    g: Case<G, Z>,
    h: Case<H, Z>,
  ): Matcher8<A, B, C, D, E, F, G, H, Z>;
}
export interface Match9<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt
> {
  <Z>(
    a: Case<A, Z>,
    b: Case<B, Z>,
    c: Case<C, Z>,
    d: Case<D, Z>,
    e: Case<E, Z>,
    f: Case<F, Z>,
    g: Case<G, Z>,
    h: Case<H, Z>,
    i: Case<I, Z>,
  ): Matcher9<A, B, C, D, E, F, G, H, I, Z>;
}
export interface Match10<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt
> {
  <Z>(
    a: Case<A, Z>,
    b: Case<B, Z>,
    c: Case<C, Z>,
    d: Case<D, Z>,
    e: Case<E, Z>,
    f: Case<F, Z>,
    g: Case<G, Z>,
    h: Case<H, Z>,
    i: Case<I, Z>,
    j: Case<J, Z>,
  ): Matcher10<A, B, C, D, E, F, G, H, I, J, Z>;
}
export interface Match11<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt
> {
  <Z>(
    a: Case<A, Z>,
    b: Case<B, Z>,
    c: Case<C, Z>,
    d: Case<D, Z>,
    e: Case<E, Z>,
    f: Case<F, Z>,
    g: Case<G, Z>,
    h: Case<H, Z>,
    i: Case<I, Z>,
    j: Case<J, Z>,
    k: Case<K, Z>,
  ): Matcher11<A, B, C, D, E, F, G, H, I, J, K, Z>;
}

export interface Match12<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
  ): Matcher12<A, B, C, D, E, F, G, H, I, J, K, L, Z>;
}

export interface Match13<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
  ): Matcher13<A, B, C, D, E, F, G, H, I, J, K, L, M, Z>;
}

export interface Match14<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
  ): Matcher14<A, B, C, D, E, F, G, H, I, J, K, L, M, N, Z>;
}

export interface Match15<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
    O: Case<O, Z>,
  ): Matcher15<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Z>;
}

export interface Match16<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
    O: Case<O, Z>,
    P: Case<P, Z>,
  ): Matcher16<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Z>;
}

export interface Match17<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
    O: Case<O, Z>,
    P: Case<P, Z>,
    Q: Case<Q, Z>,
  ): Matcher17<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, Z>;
}

export interface Match18<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
    O: Case<O, Z>,
    P: Case<P, Z>,
    Q: Case<Q, Z>,
    R: Case<R, Z>,
  ): Matcher18<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Z>;
}

export interface Match19<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
    O: Case<O, Z>,
    P: Case<P, Z>,
    Q: Case<Q, Z>,
    R: Case<R, Z>,
    S: Case<S, Z>,
  ): Matcher19<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, Z>;
}

export interface Match20<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt,
  T extends Rt
> {
  <Z>(
    A: Case<A, Z>,
    B: Case<B, Z>,
    C: Case<C, Z>,
    D: Case<D, Z>,
    E: Case<E, Z>,
    F: Case<F, Z>,
    G: Case<G, Z>,
    H: Case<H, Z>,
    I: Case<I, Z>,
    J: Case<J, Z>,
    K: Case<K, Z>,
    L: Case<L, Z>,
    M: Case<M, Z>,
    N: Case<N, Z>,
    O: Case<O, Z>,
    P: Case<P, Z>,
    Q: Case<Q, Z>,
    R: Case<R, Z>,
    S: Case<S, Z>,
    T: Case<T, Z>,
  ): Matcher20<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, Z>;
}

export type Case<T extends Rt, Result> = (v: Static<T>) => Result;

export type Matcher1<A extends Rt, Z> = (x: Static<A>) => Z;
export type Matcher2<A extends Rt, B extends Rt, Z> = (x: Static<A> | Static<B>) => Z;
export type Matcher3<A extends Rt, B extends Rt, C extends Rt, Z> = (
  x: Static<A> | Static<B> | Static<C>,
) => Z;
export type Matcher4<A extends Rt, B extends Rt, C extends Rt, D extends Rt, Z> = (
  x: Static<A> | Static<B> | Static<C> | Static<D>,
) => Z;
export type Matcher5<A extends Rt, B extends Rt, C extends Rt, D extends Rt, E extends Rt, Z> = (
  x: Static<A> | Static<B> | Static<C> | Static<D> | Static<E>,
) => Z;
export type Matcher6<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  Z
> = (x: Static<A> | Static<B> | Static<C> | Static<D> | Static<E> | Static<F>) => Z;
export type Matcher7<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  Z
> = (x: Static<A> | Static<B> | Static<C> | Static<D> | Static<E> | Static<F> | Static<G>) => Z;
export type Matcher8<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  Z
> = (
  x: Static<A> | Static<B> | Static<C> | Static<D> | Static<E> | Static<F> | Static<G> | Static<H>,
) => Z;
export type Matcher9<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>,
) => Z;
export type Matcher10<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>,
) => Z;
export type Matcher11<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>,
) => Z;
export type Matcher12<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>,
) => Z;
export type Matcher13<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>,
) => Z;
export type Matcher14<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>,
) => Z;
export type Matcher15<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>,
) => Z;
export type Matcher16<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>,
) => Z;
export type Matcher17<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>,
) => Z;
export type Matcher18<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
    | Static<R>,
) => Z;
export type Matcher19<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
    | Static<R>
    | Static<S>,
) => Z;
export type Matcher20<
  A extends Rt,
  B extends Rt,
  C extends Rt,
  D extends Rt,
  E extends Rt,
  F extends Rt,
  G extends Rt,
  H extends Rt,
  I extends Rt,
  J extends Rt,
  K extends Rt,
  L extends Rt,
  M extends Rt,
  N extends Rt,
  O extends Rt,
  P extends Rt,
  Q extends Rt,
  R extends Rt,
  S extends Rt,
  T extends Rt,
  Z
> = (
  x:
    | Static<A>
    | Static<B>
    | Static<C>
    | Static<D>
    | Static<E>
    | Static<F>
    | Static<G>
    | Static<H>
    | Static<I>
    | Static<J>
    | Static<K>
    | Static<L>
    | Static<M>
    | Static<N>
    | Static<O>
    | Static<P>
    | Static<Q>
    | Static<R>
    | Static<S>
    | Static<T>,
) => Z;
