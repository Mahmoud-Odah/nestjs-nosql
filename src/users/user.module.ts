import { Module } from '@nestjs/common';
import { UserService } from './services/Admins/user.service';
import { UserController } from './controllers/Admins/user.controller';
import { usersProviders } from './providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/Auth/Auth.controller';
import { AuthService } from './services/Auth/Auth.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [...usersProviders, UserService, AuthService],
})
export class UserModule {}
