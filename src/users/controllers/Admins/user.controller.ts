import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from '../../services/Admins/user.service';
import { CreateUserDto } from '../../dto/Admins/createUserDto.dto';
import { UpdateUserDto } from '../../dto/Admins/updateUserDto.dto';
import { Roles } from '../../guards/Roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('user')
@UseGuards(UsersGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(["admin", "manager"])
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @Roles(["admin", "manager"])
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Get('without-email/:id')
  @Roles(["admin", "manager"])
  async getUserByIdWithoutEmail(@Param('id') id: string) {
    return await this.userService.getUserByIdWithoutEmail(id);
  }

  @Post()
  @Roles(["admin"])
  async createUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDot: CreateUserDto,
  ) {
    return await this.userService.createUser(createUserDot);
  }

  @Put(":id")
  @Roles(["admin", "manager"])
  async updateUser(
    @Param("id") id : string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(["admin"])
  async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }
}
