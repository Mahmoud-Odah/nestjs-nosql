import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/users/dto/Auth/AuthDto.dto';
import { User } from 'src/users/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    const { password } = body;
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const user = this.userModel.create({
      ...body,
      password: hashPassword,
      role: 'user',
    });
    return user;
  }

  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const token = this.jwtService.sign(
      { email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET },
    );
    return { user, token };
  }
}
