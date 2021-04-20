import {
  Array,
  String,
  Record,
  Number,
  Tuple,
  Boolean,
  Dictionary,
  Never,
  Union,
  Intersect,
  Literal,
  Optional,
} from '.';
import { Static } from './runtype';

describe('properties', () => {
  it('should work with array', () => {
    const R = Array(String);
    expect(R.properties[global.Number.MIN_VALUE]).toBe(Never);
    expect(R.properties[global.Number.MIN_SAFE_INTEGER]).toBe(Never);
    expect(R.properties[-1]).toBe(Never);
    expect(R.properties[0]).toBe(String);
    expect(R.properties[1]).toBe(String);
    expect(R.properties[global.Number.MAX_SAFE_INTEGER]).toBe(String);
    expect(R.properties[global.Number.MAX_VALUE]).toBe(Never);
    expect((R.properties as any)['foo']).toBe(Never);
  });
  it('should work with record', () => {
    const R = Record({ foo: String, bar: Number });
    expect(R.properties.foo).toBe(String);
    expect(R.properties.bar).toBe(Number);
    expect((R.properties as any).baz).toBe(Never);
  });
  it('should work with tuple', () => {
    const R = Tuple(String, Number, Boolean);
    expect(R.properties[0]).toBe(String);
    expect(R.properties[1]).toBe(Number);
    expect(R.properties[2]).toBe(Boolean);
    expect((R.properties as any)[3]).toBe(Never);
  });
  it('should work with dictionary', () => {
    const R = Dictionary(String, Number);
    expect(R.properties[0]).toBe(String);
    expect((R.properties as any)['1']).toBe(String);
    expect(R.properties[0x02]).toBe(String);
    expect((R.properties as any)['0x03']).toBe(Never);
    expect((R.properties as any)['foo']).toBe(Never);
  });
  it('should work with union', () => {
    const R = Union(
      Record({ foo: String, bar: Optional(Boolean) }),
      Record({ foo: Number, bar: Boolean, baz: String }),
    );
    const { foo, bar } = R.properties;
    expect(foo.tag).toBe('union');
    expect(bar.tag).toBe('union');
    expect(foo.alternatives.length).toBe(2);
    expect(bar.alternatives.length).toBe(2);
    expect(foo.guard(42)).toBe(true);
    expect(foo.guard('42')).toBe(true);
    expect(foo.guard(true)).toBe(false);
    expect(bar.guard(undefined)).toBe(true);
    expect(bar.guard(true)).toBe(true);
    expect(bar.guard('true')).toBe(false);
    expect((R.properties as any).baz).toBe(Never);
  });
  it('should work with intersection', () => {
    const R = Intersect(Record({ foo: String }), Record({ foo: Literal('test'), bar: String }));
    const { foo, bar } = R.properties;
    expect(foo.tag).toBe('intersect');
    expect(foo.intersectees.length).toBe(2);
    expect(foo.guard('test')).toBe(true);
    expect(foo.guard('crap')).toBe(false);
    expect(foo.guard(42)).toBe(false);
    expect(bar.tag).toBe('string');
    expect((R.properties as any).baz.tag).toBe('never');
  });
  it('should work with mixed union', () => {
    const R = Union(String, Record({ foo: String, bar: Optional(Boolean) }));
    expect((R.properties as any).foo.tag).toBe('never');
    expect((R.properties as any).bar.tag).toBe('never');
  });
  it('should work with mixed intersection', () => {
    const R = Intersect(String, Record({ foo: String, bar: Optional(Boolean) }));
    type R = Static<typeof R>;
    expect(R.properties.foo.tag).toBe('string');
    expect(R.properties.bar.tag).toBe('optional');
    const foo: R['foo'] = 'some string';
    const bar: R['bar'] = true;
    expect(R.properties.foo.guard(foo)).toBe(true);
    expect(R.properties.bar.guard(bar)).toBe(true);
  });
});
