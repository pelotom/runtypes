# Runtypes [![Build Status](https://travis-ci.org/pelotom/runtypes.svg?branch=master)](https://travis-ci.org/pelotom/runtypes) [![Coverage Status](https://coveralls.io/repos/github/pelotom/runtypes/badge.svg?branch=master)](https://coveralls.io/github/pelotom/runtypes?branch=master)

### Safely bring untyped data into the fold

Runtypes allow you to take values about which you have no assurances and check that they conform to some type `A`.
This is done by means of composable type validators of primitives, literals, arrays, tuples, records, unions,
intersections and more.

## Installation

```
npm install --save runtypes
```

## Example

Suppose you have objects which represent asteroids, planets, ships and crew members. In TypeScript, you might write their types like so:

```ts
type Vector = [number, number, number];

type Asteroid = {
  type: 'asteroid';
  location: Vector;
  mass: number;
};

type Planet = {
  type: 'planet';
  location: Vector;
  mass: number;
  population: number;
  habitable: boolean;
};

type Rank = 'captain' | 'first mate' | 'officer' | 'ensign';

type CrewMember = {
  name: string;
  age: number;
  rank: Rank;
  home: Planet;
};

type Ship = {
  type: 'ship';
  location: Vector;
  mass: number;
  name: string;
  crew: CrewMember[];
};

type SpaceObject = Asteroid | Planet | Ship;
```

If the objects which are supposed to have these shapes are loaded from some external source, perhaps a JSON file, we need to
validate that the objects conform to their specifications. We do so by building corresponding `Runtype`s in a very straightforward
manner:

```ts
import { Boolean, Number, String, Literal, Array, Tuple, Record, Union } from 'runtypes';

const Vector = Tuple(Number, Number, Number);

const Asteroid = Record({
  type: Literal('asteroid'),
  location: Vector,
  mass: Number,
});

const Planet = Record({
  type: Literal('planet'),
  location: Vector,
  mass: Number,
  population: Number,
  habitable: Boolean,
});

const Rank = Union(
  Literal('captain'),
  Literal('first mate'),
  Literal('officer'),
  Literal('ensign'),
);

const CrewMember = Record({
  name: String,
  age: Number,
  rank: Rank,
  home: Planet,
});

const Ship = Record({
  type: Literal('ship'),
  location: Vector,
  mass: Number,
  name: String,
  crew: Array(CrewMember),
});

const SpaceObject = Union(Asteroid, Planet, Ship);
```

(See the [examples](examples) directory for an expanded version of this.)

Now if we are given a putative `SpaceObject` we can validate it like so:

```ts
// spaceObject: SpaceObject
const spaceObject = SpaceObject.check(obj);
```

If the object doesn't conform to the type specification, `check` will throw an exception.

## Static type inference

In TypeScript, the inferred type of `Asteroid` in the above example is

```ts
Runtype<{
  type: 'asteroid'
  location: [number, number, number]
  mass: number
}>
```

That is, it's a `Runtype<Asteroid>`, and you could annotate it as such. But we don't really have to define the
`Asteroid` type in TypeScript at all now, because the inferred type is correct. Defining each of your types
twice, once at the type level and then again at the value level, is a pain and not very [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself).
Fortunately you can define a static `Asteroid` type which is an alias to the `Runtype`-derived type like so:

```ts
import { Static } from 'runtypes';

type Asteroid = Static<typeof Asteroid>;
```

which achieves the same result as

```ts
type Asteroid = {
  type: 'asteroid';
  location: [number, number, number];
  mass: number;
};
```

## Type guards

In addition to providing a `check` method, runtypes can be used as [type guards](https://basarat.gitbook.io/typescript/type-system/typeguard):

```ts
function disembark(obj: {}) {
  if (SpaceObject.guard(obj)) {
    // obj: SpaceObject
    if (obj.type === 'ship') {
      // obj: Ship
      obj.crew = [];
    }
  }
};
```

## Pattern matching

The `Union` runtype offers the ability to do type-safe, exhaustive case analysis across its variants using the `match` method:

```ts
const isHabitable = SpaceObject.match(
  asteroid => false,
  planet => planet.habitable,
  ship => true,
);

if (isHabitable(spaceObject)) {
  // ...
}
```

There's also a top-level `match` function which allows testing an ad-hoc sequence of runtypes:

```ts
const makeANumber = match(
  [Number, n => n * 3],
  [Boolean, b => b ? 1 : 0],
  [String, s => s.length],
);

makeANumber(9); // = 27
```

To allow the function to be applied to anything and then handle match failures, simply use an `Unknown` case at the end:

```ts
const makeANumber = match(
  [Number, n => n * 3],
  [Boolean, b => b ? 1 : 0],
  [String, s => s.length],
  [Unknown, () => 42]
);
```

## Constraint checking

Beyond mere type checking, we can add arbitrary runtime constraints to a `Runtype`:

```ts
const Positive = Number.withConstraint(n => n > 0);

Positive.check(-3); // Throws error: Failed constraint check
```

You can provide more descriptive error messages for failed constraints by returning
a string instead of `false`:

```ts
const Positive = Number.withConstraint(n => n > 0 || `${n} is not positive`);

Positive.check(-3); // Throws error: -3 is not positive
```

You can set a custom name for your runtype, which will be used in default error
messages and reflection, by using the `name` prop on the optional `options`
parameter: 

```typescript
const C = Number.withConstraint(n => n > 0, {name: 'PositiveNumber'});
```

To change the type, there are two ways to do it: passing a type guard function
to a new `Runtype.withGuard()` method, or using the familiar
`Runtype.withConstraint()` method. (Both methods also accept an `options`
parameter to optionally set the name.) 

Using a type guard function is the easiest option to change the static type,
because TS will infer the desired type from the return type of the guard
function.

```typescript
// use Buffer.isBuffer, which is typed as: isBuffer(obj: any): obj is Buffer;
const B = Unknown.withGuard(Buffer.isBuffer);
type T = Static<typeof B>; // T is Buffer
```

However, if you want to return a custom error message from your constraint
function, you can't do this with a type guard because these functions can only
return boolean values.  Instead, you can roll your own constraint function and
use the `withConstraint<T>()` method. Remember to specify the type parameter for
the `Constraint` because it can't be inferred from your check function!

```typescript
const check = (o: any) => Buffer.isBuffer(o) || 'Dude, not a Buffer!';
const B = Unknown.withConstraint<Buffer>(check);
type T = Static<typeof B>; // T will have type of `Buffer`
```

One important choice when changing `Constraint` static types is choosing the
correct underlying type. The implementation of `Constraint` will validate the
underlying type *before* running your constraint function. So it's important to
use a lowest-common-denominator type that will pass validation for all expected
inputs of your constraint function or type guard.  If there's no obvious
lowest-common-denominator type, you can always use `Unknown` as the underlying
type, as shown in the `Buffer` examples above.  

Speaking of base types, if you're using a type guard function and your base type
is `Unknown`, then there's a convenience runtype `Guard` available, which is a
shorthand for `Unknown.withGuard`.

```typescript
// use Buffer.isBuffer, which is typed as: isBuffer(obj: any): obj is Buffer;
const B = Guard(Buffer.isBuffer);
type T = Static<typeof B>; // T will have type of `Buffer`
```

## Transforms

Sometimes we want to convert values along with validation, for example:

- Populate properties of more descriptive object with a shorthand value
- Deserialize incoming data into hydrated object, e.g. timestamp `number` to `Date`
- Maintain backward compatibility upgrading old input into new representation

We have a Swiss Army knife for such situations, called `Transform`. Usually you
want to use it through `withTransform` method of a `Runtype`:

```ts
const ParsedInt = String.withTransform(s => {
  const parsed = parseInt(s);
  if (isNaN(parsed)) throw new Error('Parse failed');
  else return parsed;
});
```

Errors thrown by transformer functions are gracefully caught by the underlying
`Runtype` and treated as validation errors like usual:

```ts
if (ParsedInt.guard('crap')) return 'Never reach here';
else return 'Always reach here';

ParsedInt.check('crap');
// ValidationError: Failed transform: Error: Parse failed
```

`Static` should work as expected:

```ts
type ParsedInt = Static<typeof ParsedInt>;
// Above type is inferred as: `number`
```

Maybe you've noticed that `Transform` actually covers the same functionalities
of `Constraint` and `Guard`, but it's not recommended using `Transform`s without
any transformation of values, simply because it makes your code look nonsense.

## Function contracts

Runtypes along with constraint checking are a natural fit for enforcing function
contracts. You can construct a contract from `Runtype`s for the parameters and
return type of the function:

```ts
const divide = Contract(
  // Parameters:
  Number,
  Number.withConstraint(n => n !== 0 || 'division by zero'),
  // Return type:
  Number,
).enforce((n, m) => n / m);

divide(10, 2); // 5

divide(10, 0); // Throws error: division by zero
```

## Branded types

Branded types is a way to emphasize the uniqueness of a type. This is useful [until we have nominal types](https://github.com/microsoft/TypeScript/pull/33038):

```ts
const Username = String.withBrand('Username');
const Password = String.withBrand('Password').withConstraint(
  str => str.length >= 8 || 'Too short password',
);

const signIn = Contract(
  Username,
  Password,
  Unknown,
).enforce((username, password) => {/*...*/});

const username = Username.check('someone@example.com');
const password = Password.check('12345678');

// Static type OK, runtime OK
signIn(username, password);

// Static type ERROR, runtime OK
signIn(password, username);

// Static type ERROR, runtime OK
signIn('someone@example.com', '12345678');
```

Branded types are like [opaque types](https://flow.org/en/docs/types/opaque-types) and work as expected, except it is impossible to use as a key of an object type:

```ts
const StringBranded = String.withBrand('StringBranded');
type StringBranded = Static<typeof StringBranded>;
// Then the type `StringBranded` is computed as:
// string & { [RuntypeName]: "StringBranded" }

// TS1023: An index signature parameter type must be either `string` or `number`.
type SomeObject1 = { [K: StringBranded]: number };

// Both of these result in empty object type i.e. `{}`
type SomeObject2 = { [K in StringBranded]: number };
type SomeObject3 = Record<StringBranded, number>;

// You can do like this, but...
const key = StringBranded.check("key");
const SomeRecord = Record({ [key]: Number });
// This type results in { [x: string]: number }
type SomeRecord = Static<typeof SomeRecord>;

// So you have to use `Map` to achieve strongly-typed branded keys
type SomeMap = Map<StringBranded, number>;
```

## Optional values

Runtypes can be used to represent a variable that may be null or undefined
as well as representing keys within records that may or may not be present.


```ts
// For variables that might be undefined or null
const MyString = String;                    // string             (e.g. 'text')
const MyStringMaybe = String.Or(Undefined); // string | undefined (e.g. 'text', undefined)
const MyStringNullable = String.Or(Null);   // string | null      (e.g. 'text', null)
```

If a `Record` may or may not have some keys, we can declare the optional
keys using `myRecord.And(Partial({ ... }))`.  Partial keys validate successfully if
they are absent or undefined (but not null) or the type specified
(which can be null).

```ts
// Using `Ship` from above
const RegisteredShip = Ship.And(Record({
  // All registered ships must have this flag
  isRegistered: Literal(true),
})).And(Partial({
  // We may or may not know the ship's classification
  shipClass: Union(Literal('military'), Literal('civilian')),

  // We may not know the ship's rank (so we allow it to be undefined via `Partial`),
  // we may also know that a civilian ship doesn't have a rank (e.g. null)
  rank: Rank.Or(Null),
}));
```

If a record has keys which _must be present_ but can be null, then use
the `Record` runtype normally instead.

```ts
const MilitaryShip = Ship.And(Record({
  shipClass: Literal('military'),
  
  // Must NOT be undefined, but can be null
  lastDeployedTimestamp: Number.Or(Null),
}));
```

## Readonly records and arrays

Array and Record runtypes have a special function `.asReadonly()`, that creates a new runtype where the values are readonly.

For example:

```typescript
const Asteroid = Record({
  type: Literal('asteroid'),
  location: Vector,
  mass: Number,
}).asReadonly();
type Asteroid = Static<typeof Asteroid>;
// { readonly type: 'asteroid', readonly location: Vector, readonly mass: number }

const AsteroidArray = Array(Asteroid).asReadonly();
type AsteroidArray = Static<typeof AsteroidArray>;
// ReadonlyArray<Asteroid>
```

## Related libraries

* [runtypes-generate](https://github.com/typeetfunc/runtypes-generate) Generates random data by `Runtype` for property-based testing
* [rest.ts](https://github.com/hmil/rest.ts) Allows building type safe and runtime-checked APIs
