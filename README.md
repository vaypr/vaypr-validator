# Vaypr Validator

**This package is in pre-alpha and not ready for public consumption. If you'd like, please take an issue and submit a pull request**

Vaypr validator is a library useful for ensuring runtime validation of class properties using decorators and typescript's built in types to create an extremely simple, DRY and lightweight validation engine for classes.

Vaypr validator is built on top of [joi](https://github.com/hapijs/joi), and uses [reflect-metata](https://github.com/rbuckton/reflect-metadata) for fetching types declared for properties either using typescript or the included babel base types.

## Example:

For babel / es6 examples and instructions [click here](#babel)

```
import { Validate, Max, Min, Required } from '@vaypr/validator';

@Validate
export class User {
  @Max(0) @Min(9999) id: number;
  @Required firstName: string;
  @Required lastName: string;
}

const myUser = new User();
myUser.id = 0;
myUser.firstName = 'jon';
myUser.lastName = 'smit';

myUser.validate();
// no error thrown.

myUser.firstName = 0;
myUser.validate()
// Error thrown: VayprValidationTypeError - property 'firstName' should be string
```

If you prefer constructor validation, you use the `ValidateConstructor` decorator instead of `Validate`.
```
@ValidateConstructor
class User{
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  )
}

const myUser = new User(0, )
```

## Gotchas

**EVERY PROPERTY MUST HAVE A DECORATOR TO BE VALIDATED**

In the following case:
```
@Validate
class MyClass {
  @Required foo: string;
  bar: string;
}

const foobar = new MyClass();
foobar.foo = 'foo';
foobar.bar = 123;
foobar.validate();
```

The validator will pass. This is because Typescript does not currently offer support for design type metadata for non-decorated members. This means the validator library does not know that the `bar` property of MyClass exists, or should be validated. In this case, the `Key` decorator exists for no other purpose as to ensure type metadata:

```
@Validate
class MyClass {
  @Required foo: string;
  @Key bar: string;
}

const foobar = new MyClass();
foobar.foo = 'foo';
foobar.bar = 123;
foobar.validate();
// error thrown
```

## Babel
**Not implemented**

In the case where you can't or don't want to use typescript, you can use our built in primitive types for validation.
```
const { ValidateConstructor, String, Number } = require('@vaypr/validator');

@ValidateConstructor
class MyClass {
  constructor(
    @Number id,
    @String firstName,
    @String lastName
  ) { 
    this.id = id;
    // etc
  }
}
```
