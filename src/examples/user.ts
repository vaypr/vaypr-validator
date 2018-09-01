import { Key, Validate } from '../index';

@Validate
export class User {
  @Key id: number;
  @Key firstName: string;
  @Key lastName: string;
}
