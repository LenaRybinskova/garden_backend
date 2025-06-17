import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль от 8 до 20 символов с цифрами и буквами ',

  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 20, { message: 'Пароль должен быть от 8 до 20 символов' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: 'Пароль должен содержать цифры и буквы',
  })
  password: string;
}
