import  {Expose , Transform} from 'class-transformer'
import {User} from '../../users/user.entity'


export class ReportDto {

    @Expose()
    id : number ;

    @Expose()
    price : number;

    @Expose()
    year : number;

    @Expose()
    lng : number;

    @Expose()
    lat:number;

    @Expose()
    make:string;

    @Expose()
    model:string;

    @Expose()
    mileage: number;

    @Expose()
    approved : boolean;

    // look at the obj property , take the user property and get id property and assign it to userId
    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId : number
}