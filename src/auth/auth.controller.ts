import {
  Body,
  Controller,
  Get, HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/registration.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenResponseDto } from 'src/auth/dto/AccessTokenRes.dto';
import { MeAccessResDto } from 'src/auth/dto/MeAccessRes.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: RegisterDto, description: 'Необходимые данные для регистрации нового пользователя:' })
  @ApiResponse({ status: HttpStatus.OK, type:AccessTokenResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description:"'Email already exists'", example: {
      statusCode: 409,
      message: 'Email already exists',
      error: 'Conflict',
    } })

  @Post('register')
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto,
  ) {
    return this.authService.registration(res, dto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({ type: LoginDto, description: 'Необходимые данные для авторизации пользователя:' })
  @ApiResponse({ status: HttpStatus.OK, type:AccessTokenResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description:'User not exists', example: {
      statusCode: 404,
      message: 'User not exists',
      error: 'Not Found',
    } })
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(res, dto);
  }


  @ApiOperation({ summary: 'Запрос новой пары токенов ' })
  @ApiResponse({ status: HttpStatus.OK, type:AccessTokenResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description:'Проблемы с refresh token, нет такого пользователя', example: {
      statusCode: 401,
      message: 'Проблемы с refresh token, нет такого пользователя',
      error: 'Not Found',
    }})
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.refresh(req, res);
  }


  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @ApiResponse({ status: HttpStatus.OK,schema: { example: true, type: 'boolean' }})
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }


  @ApiOperation({ summary: 'Получение данных авторизованного пользователя', description:"В заголовке укажите Authorization: Bearer AccessToken" })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ status: HttpStatus.OK, type:MeAccessResDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description:'User not found', example: {
      statusCode: 401,
      message: 'User not found',
      error: 'Not Found',
    } })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() req: Request) {
    return req.user;
  }
}
