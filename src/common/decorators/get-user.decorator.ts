import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

//декоратор просто достает объект Юзер. Объект Юзер возвращает после проверки авторизации АУсГард
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

//  create(@Body() dto: CreatePlantDto, @GetUser() user: User)
