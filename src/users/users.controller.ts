
import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  Body,
  Delete,
  NotFoundException,
  HttpCode,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from './../guards/auth.guard';



@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersServices: UsersService,
    private authService: AuthService,
  ) {}



  @Get('/currentuser')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user : User){
      return user
  }

  @Post('/signout')
  signOut(@Session() session : any){
     session.userId = null
  }

  @Post('/signup')
 async createUser(@Body() body: CreateUserDto, @Session() session : any) {
   const user = await this.authService.signup(body.email, body.password);
   session.userId = user.id
   return user
  }

    @Post('/signin')
    @HttpCode(200)
   async  signin(@Body() body: CreateUserDto , @Session() session : any) {
      const user =  await this.authService.signin(body.email, body.password);
      session.userId = user.id
      return user
    }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersServices.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User is not found');
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersServices.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersServices.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersServices.update(parseInt(id), body);
  }
}
