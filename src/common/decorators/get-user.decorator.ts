import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '@prisma/client';

//декоратор просто достает объект Юзер. Объект Юзер возвращает после проверки авторизации АУсГард
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
