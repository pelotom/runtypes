import { Runtype, Static, create } from '../runtype';

export type Transformer<A extends Runtype, B extends unknown> = (x: Static<A>) => B;

export interface Transform<A extends Runtype, B extends unknown> extends Runtype<B> {
  tag: 'transform';
  underlying: A;
  transformer: Transformer<A, B>;
  name?: string;
}

export function Transform<A extends Runtype, B extends unknown>(
  underlying: A,
  transformer: Transformer<A, B>,
  options?: { name?: string },
): Transform<A, B> {
  return create<Transform<A, B>>(
    value => {
      const name = options && options.name;
      const validated = underlying.validate(value);

      if (!validated.success) return validated;
      try {
        const value = transformer(validated.value);
        return { success: true, value };
      } catch (error) {
        const message = `Failed transform${name ? ` of ${name}` : ''}: ${error.toString()}`;
        return { success: false, message };
      }
    },
    {
      tag: 'transform',
      underlying,
      transformer,
      name: options && options.name,
    },
  );
}
