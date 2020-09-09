import { ValidationError } from './errors';
import { innerGuard, innerValidate, RuntypeBase } from './runtype';

export interface AsyncContract<A extends any[], Z> {
  enforce(f: (...a: A) => Promise<Z>): (...a: A) => Promise<Z>;
}

/**
 * Create a function contract.
 */
export function AsyncContract<A extends [any, ...any[]] | [], Z>(
  argTypes: { [key in keyof A]: key extends 'length' ? A['length'] : RuntypeBase<A[key]> },
  returnType: RuntypeBase<Z>,
): AsyncContract<A, Z> {
  return {
    enforce: (f: (...args: any[]) => any) => (...args: any[]) => {
      if (args.length < argTypes.length) {
        return Promise.reject(
          new ValidationError(
            `Expected ${argTypes.length} arguments but only received ${args.length}`,
          ),
        );
      }
      const visited = new Map<RuntypeBase, Map<any, any>>();
      for (let i = 0; i < argTypes.length; i++) {
        const result = innerValidate(argTypes[i], args[i], visited);
        if (result.success) {
          args[i] = result.value;
        } else {
          return Promise.reject(new ValidationError(result.message, result.key));
        }
      }
      const returnedPromise = f(...args);
      if (!(returnedPromise instanceof Promise)) {
        return Promise.reject(
          new ValidationError(
            `Expected function to return a promise, but instead got ${returnedPromise}`,
          ),
        );
      }
      return returnedPromise.then(value => {
        const result = innerGuard(returnType, value, new Map());
        if (result) {
          throw new ValidationError(result.message, result.key);
        }
        return value;
      });
    },
  };
}
