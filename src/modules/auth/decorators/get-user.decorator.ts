import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestWithPayload, ITokenPayload } from 'src/types/auth.type';

export const GetUser = createParamDecorator(
  (data: keyof ITokenPayload | undefined, ctx: ExecutionContext) => {
    const request: IRequestWithPayload = ctx.switchToHttp().getRequest();

    const user = request.user;

    return data ? user[data] : user;
  },
);
