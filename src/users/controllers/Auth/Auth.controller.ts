import { LoginDto, RegisterDto } from 'src/users/dto/Auth/AuthDto.dto';
import { AuthService } from './../../services/Auth/Auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: RegisterDto,
  ) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: LoginDto,
  ) {
    return await this.authService.login(body);
  }
}
