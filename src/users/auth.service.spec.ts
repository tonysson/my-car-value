import { Test } from '@nestjs/testing';
import {AuthService} from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';


describe('AuthService', () => {

    let service : AuthService ;
    let fakeUsersService : Partial<UsersService>

    beforeEach( async () => {

    //Create a fake  copy of users service
    fakeUsersService = {
        find : () => Promise.resolve([]),
        create : (email : string , password : string) => Promise.resolve({id : 2 , email , password} as User)
    }

    const module = await Test.createTestingModule({
        providers : [
            AuthService,
            {
                provide : UsersService ,
                useValue : fakeUsersService
            }
        ]
    }).compile()

    // get all in authService
    service = module.get(AuthService)

})

it('can create an instance of auth sercve', async() => {
    expect(service).toBeDefined()
})

it('Create new user with a salted and hashed password', async() => {
    const user = await service.signup('tata@gmail.com', 'tata')
    expect(user.password).not.toEqual('tata')
    const [salt , hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
})

it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await service
      .signup('asdf@asdf.com', 'asdf')
      .catch((err: BadRequestException) => {
        expect(err.message);
      });
  });

  it('throws if signin is called with and unused email', async () => {
    await expect(
      service.signin('asdfasdf@asdf.com', 'asdfsadf'),
    ).rejects.toThrowError(NotFoundException);
  });


  
})



