import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly role: string;
}