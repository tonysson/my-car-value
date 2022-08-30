import { createParamDecorator , ExecutionContext } from "@nestjs/common";

// Custum decorator Automatically Tell a handler who the currently signed in user is
export const CurrentUser = createParamDecorator((data : never , context : ExecutionContext) => {
    // get the incoming request
  const request  = context.switchToHttp().getRequest()
  // currentUser comes from the CurrentUserInterceptor class
  return request.currentUser
})