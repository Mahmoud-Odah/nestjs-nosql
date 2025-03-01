import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  LastName: String,
  age: Number,
  email: String,
});