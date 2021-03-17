import {
  Unknown,
  Never,
  Undefined,
  Null,
  Void,
  Boolean,
  Number,
  String,
  Symbol,
  Literal,
  Array,
  Dictionary,
  Record,
  Partial,
  Tuple,
  Union,
  Intersect,
  Function,
  Lazy,
  InstanceOf,
  Reflect,
} from '.';
import show from './show';

class TestClass {}

const cases: [Reflect, string][] = [
  [Unknown, 'unknown'],
  [Never, 'never'],
  [Undefined, 'undefined'],
  [Null, 'null'],
  [Void, 'unknown'],
  [Boolean, 'boolean'],
  [Number, 'number'],
  [String, 'string'],
  [Symbol, 'symbol'],
  [Literal(true), 'true'],
  [Literal(3), '3'],
  [Literal('foo'), '"foo"'],
  [Array(String), 'string[]'],
  [Array(String).asReadonly(), 'readonly string[]'],
  [Dictionary(Array(Boolean)), '{ [_: string]: boolean[] }'],
  [Dictionary(Array(Boolean), 'string'), '{ [_: string]: boolean[] }'],
  [Dictionary(Array(Boolean), 'number'), '{ [_: number]: boolean[] }'],
  [Record({}), '{}'],
  [Record({}).asReadonly(), '{}'],
  [Partial({}), '{}'],
  [InstanceOf(TestClass), 'InstanceOf<TestClass>'],
  [Array(InstanceOf(TestClass)), 'InstanceOf<TestClass>[]'],
  [Record({ x: String, y: Array(Boolean) }), '{ x: string; y: boolean[]; }'],
  [Record({ x: String, y: Array(Boolean) }), '{ x: string; y: boolean[]; }'],
  [Record({ x: Number }).And(Partial({ y: Number })), '{ x: number; } & { y?: number; }'],
  [
    Record({ x: String, y: Array(Boolean) }).asReadonly(),
    '{ readonly x: string; readonly y: boolean[]; }',
  ],
  [Record({ x: String, y: Array(Boolean).asReadonly() }), '{ x: string; y: readonly boolean[]; }'],
  [
    Record({ x: String, y: Array(Boolean).asReadonly() }).asReadonly(),
    '{ readonly x: string; readonly y: readonly boolean[]; }',
  ],
  [Partial({ x: String, y: Array(Boolean) }), '{ x?: string; y?: boolean[]; }'],
  [Record({ x: String, y: Array(Boolean) }).asPartial(), '{ x?: string; y?: boolean[]; }'],
  [Tuple(Boolean, Number), '[boolean, number]'],
  [Union(Boolean, Number), 'boolean | number'],
  [Intersect(Boolean, Number), 'boolean & number'],
  [Function, 'function'],
  [Lazy(() => Boolean), 'boolean'],
  [Number.withConstraint(x => x > 3), 'number'],
  [String.withTransform(parseInt), 'string'],
  [Array(String.withTransform(parseInt)), 'string[]'],
  [Number.withBrand('someNumber'), 'number'],
  [Number.withBrand('someNumber').withConstraint(x => x > 3), 'number'],

  // Parenthesization
  [Boolean.And(Number.Or(String)), 'boolean & (number | string)'],
  [Boolean.Or(Number.And(String)), 'boolean | (number & string)'],
  [Boolean.Or(Record({ x: String, y: Number })), 'boolean | { x: string; y: number; }'],
];

for (const [T, expected] of cases) {
  const s = show(T);
  it(s, () => {
    expect(s).toBe(expected);
    expect(T.toString()).toBe(`Runtype<${s}>`);
  });
}
