import  {UseInterceptors , NestInterceptor , ExecutionContext , CallHandler} from '@nestjs/common'
import { Observable } from 'rxjs'
import {map} from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

// Any Class interface
interface ClassConstructor {
    new (...args : any[]) : {}
}

export function Serialize(dto : ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto :any){}

    intercept (context: ExecutionContext, next: CallHandler) : Observable<any>
    {
        // Run smthing before a request is handled by the request handler
        // console.log('Running before the handler',context)
        return next.handle().pipe(map((data : any) => {
            //Run smthing before the response is sent out
           return plainToInstance(this.dto , data , {
            // the key that make our Entity work (exclude the password for the exemple)
            excludeExtraneousValues : true
        })
        }))
    }

}