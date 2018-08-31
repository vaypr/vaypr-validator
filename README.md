# Vaypr Validator

* This package is in pre-alpha and not ready for public consumption. If you'd like, please take an issue and submit a pull request *

Vaypr validator is a library useful for validating classes using decorators and typescript's built in types to create an extremely simple, DRY and lightweight validation engine for classes.

Vaypr validator is built on top of [joi](https://github.com/hapijs/joi).

## Example:

```
import { Validate, Max, Min } from '@vaypr/validator';

@Validate
export class User {
  @Max(0) @Min(9999) id: number;
  firstName: string;
  lastName: string;
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
