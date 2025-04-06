// export const GetCurrentUser = createParamDecorator(
//   (data: keyof JwtPayload| undefined, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     if (!data) return request.user;
//     return request.user[data];
//   },
// );
