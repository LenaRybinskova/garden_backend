import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/registration.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import {Response} from "express"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registration(@Res() res: Response,@Body() dto: RegisterDto) {
    return this.authService.registration(res,dto);
  }

  @Post('login')
  async login(@Res() res: Response,@Body() dto: LoginDto) {
    return this.authService.login(res,dto);
  }
}
