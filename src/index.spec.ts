import {
  Runtype,
  Always,
  Never,
  Undefined,
  Null,
  Void,
  Boolean,
  Number,
  String,
  Literal,
  Array,
  Record,
  Optional,
  Tuple,
  Union,
  Intersect,
  Lazy,
  Static,
} from './index'

type Always = Static<typeof Always>

const boolTuple = Tuple(Boolean, Boolean, Boolean)
const record1 = Record({ Boolean, Number })
const union1 = Union(Literal(3), String, boolTuple, record1)

type Person = { name: string, likes: Person[] }
const Person: Runtype<Person> = Lazy(() => Record({ name: String, likes: Array(Person) }))

const runtypes = {
  Always,
  Never,
  Undefined,
  Null,
  Empty: Record({}),
  Void,
  Boolean,
  true: Literal(true),
  false: Literal(false),
  Number,
  3: Literal(3),
  42: Literal(42),
  String,
  'hello world': Literal('hello world'),
  boolArray: Array(Boolean),
  boolTuple,
  record1,
  union1,
  Partial: Record({ Boolean }).And(Optional({ foo: String })),
  Person,
}

type RuntypeName = keyof typeof runtypes

const runtypeNames = Object.keys(runtypes) as RuntypeName[]

const testValues: { value: Always, passes: RuntypeName[] }[] = [
  { value: undefined, passes: ['Undefined', 'Void'] },
  { value: null, passes: ['Null', 'Void'] },
  { value: true, passes: ['Boolean', 'true'] },
  { value: false, passes: ['Boolean', 'false'] },
  { value: 3, passes: ['Number', '3', 'union1'] },
  { value: 42, passes: ['Number', '42'] },
  { value: 'hello world', passes: ['String', 'hello world', 'union1'] },
  { value: [true, false, true], passes: ['boolArray', 'boolTuple', 'union1'] },
  { value: { Boolean: true, Number: 3 }, passes: ['record1', 'union1', 'Partial'] },
  { value: { Boolean: true }, passes: ['Partial'] },
  { value: { Boolean: true, foo: undefined }, passes: ['Partial'] },
  { value: { Boolean: true, foo: 'hello' }, passes: ['Partial'] },
  { value: { name: 'Jimmy', likes: [{ name: 'Peter', likes: [] }] }, passes: ['Person'] },
]

for (const { value, passes } of testValues) {
  const valueName = value === undefined ? 'undefined' : JSON.stringify(value)
  describe(valueName, () => {
    const shouldPass: { [_ in RuntypeName]?: boolean } = {}

    shouldPass.Always = true

    if (value !== undefined && value !== null)
      shouldPass.Empty = true

    for (const name of passes)
      shouldPass[name] = true

    for (const name of runtypeNames) {
      if (shouldPass[name]) {
        it(` : ${name}`, () => assertAccepts(value, runtypes[name]))
      } else {
        it(`~: ${name}`, () => assertRejects(value, runtypes[name]))
      }
    }
  })
}

function assertAccepts<A>(value: Always, runtype: Runtype<A>) {
  const result = runtype.validate(value)
  if (result.success === false)
    fail(result.message)
}

function assertRejects<A>(value: Always, runtype: Runtype<A>) {
  const result = runtype.validate(value)
  if (result.success === true)
    fail('value passed validation even though it was not expected to')
}
