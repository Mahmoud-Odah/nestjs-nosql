import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { CreateUserDto } from '../../dto/Admins/createUserDto.dto';
import { UpdateUserDto } from '../../dto/Admins/updateUserDto.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    // exec: Executes the query and returns a promise that resolves with the results
    return await this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserByIdWithoutEmail(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findById(id).select('firstName lastName age').exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userModel.create(createUserDto);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }


  async deleteUser(id :string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
