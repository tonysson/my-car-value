import {CanActivate , ExecutionContext} from '@nestjs/common'


/**
 * @description Allow us to know is the user is correctly authenticated
 * We use it to protect routes that only authenticated user can access
 */
export class AuthGuard implements CanActivate {
    canActivate(context : ExecutionContext){
        const request = context.switchToHttp().getRequest()
        return request.session.userId
    }
}