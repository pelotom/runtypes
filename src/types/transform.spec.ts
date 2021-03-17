import {
  Transform,
  Static,
  String,
  Intersect,
  Number,
  Record,
  Tuple,
  Union,
  Array,
  InstanceOf,
  Dictionary,
} from '..';

const ParsedInt = Transform(
  String,
  s => {
    const parsed = parseInt(s);
    if (isNaN(parsed)) throw new Error('Parse failed');
    else return parsed;
  },
  { name: 'ParsedInt' },
);

const Value = Union(Number, String);
type Value = Static<typeof Value>;
const toString = (x: Value) => x.toString();

describe('transform', () => {
  it('should convert value', () => {
    const TrimmedString = Transform(String, s => s.trim());
    expect(TrimmedString.check(' spaces around ')).toBe('spaces around');
  });
  it('should chain', () => {
    const AppendedString = String.withTransform(s => s.trim()).withTransform(s => s + ' removed');
    expect(AppendedString.check(' spaces around ')).toBe('spaces around removed');
  });
  it('should convert type', () => {
    type ParsedInt = Static<typeof ParsedInt>;
    // Note that above type is inferred as: `number`
    const expected: ParsedInt = 42;
    expect(ParsedInt.check('42')).toBe(expected);
  });
  it('should throw error', () => {
    expect(() => ParsedInt.check('crap')).toThrowError(
      'Failed transform of ParsedInt: Error: Parse failed',
    );
  });
  it('should work with Dictionary', () => {
    const Dict = Dictionary(Value.withTransform(toString));
    type Dict = Static<typeof Dict>;
    // Note that above type is inferred as:
    // {
    //     [_: string]: string;
    // }
    const expected = { value: '42' };
    expect(Dict.check({ value: 42 })).toEqual(expected);
    expect(Dict.check(expected)).toEqual(expected);
  });
  it('should work with Record and Union', () => {
    const Object = Record({
      value: Value.withTransform(toString),
    });
    const Complex = Union(
      Value.withTransform(x => ({ value: toString(x) })),
      Object,
    );
    type Complex = Static<typeof Complex>;
    // Note that above type is inferred as:
    // {
    //     value: string;
    // } | {
    //     value: string;
    // }
    const expected = { value: '42' };
    expect(Complex.check(42)).toEqual(expected);
    expect(Complex.check('42')).toEqual(expected);
    expect(Complex.check({ value: 42 })).toEqual(expected);
    expect(Complex.check(expected)).toEqual(expected);
  });
  it('should work with Record and Intersect', () => {
    const Object = Intersect(
      Record({ x: Value.withTransform(toString) }),
      Record({ y: Value.withTransform(toString) }),
    );
    type Object = Static<typeof Object>;
    // Note that above type is inferred as:
    // {
    //     x: string;
    // } & {
    //     y: string;
    // }
    const expected = { x: '42', y: '24' };
    expect(Object.check({ x: 42, y: 24 })).toEqual(expected);
    expect(Object.check({ x: '42', y: 24 })).toEqual(expected);
    expect(Object.check({ x: 42, y: '24' })).toEqual(expected);
    expect(Object.check(expected)).toEqual(expected);
  });
  it('should work with Array', () => {
    const Values = Array(Value.withTransform(toString));
    type Values = Static<typeof Values>;
    // Note that above type is inferred as:
    // string[]
    const expected = ['42', '24'];
    expect(Values.check([42, 24])).toEqual(expected);
    expect(Values.check(['42', 24])).toEqual(expected);
    expect(Values.check([42, '24'])).toEqual(expected);
    expect(Values.check(expected)).toEqual(expected);
  });
  it('should work with Tuple', () => {
    const Values = Tuple(Value.withTransform(toString), Value.withTransform(toString));
    type Values = Static<typeof Values>;
    // Note that above type is inferred as:
    // [string, string]
    const expected = ['42', '24'];
    expect(Values.check([42, 24])).toEqual(expected);
    expect(Values.check(['42', 24])).toEqual(expected);
    expect(Values.check([42, '24'])).toEqual(expected);
    expect(Values.check(expected)).toEqual(expected);
  });
  it('should work with Brand', () => {
    const BrandedValue = Value.withTransform(toString).withBrand('BrandedValue');
    type BrandedValue = Static<typeof BrandedValue>;
    // Note that above type is inferred as:
    // string & {
    //     [RuntypeName]: "BrandedValue";
    // }
    const expected = '42';
    expect(BrandedValue.check(42)).toEqual(expected);
    expect(BrandedValue.check(expected)).toEqual(expected);
  });
  it('should work with InstanceOf', () => {
    const TwoUInt8s = InstanceOf(Buffer)
      .withTransform(buffer => [buffer.readUInt8(0), buffer.readUInt8(1)] as const)
      .withTransform(n => [toString(n[0]), toString(n[1])] as const);
    type TwoUInt8s = Static<typeof TwoUInt8s>;
    // Note that above type is inferred as:
    // readonly [string, string]
    const expected = ['42', '24'];
    expect(TwoUInt8s.check(Buffer.from([42, 24]))).toEqual(expected);
  });
});
