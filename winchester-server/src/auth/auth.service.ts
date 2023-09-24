import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  public register = async (user: CreateUserDto) => {
    const userByEmail = await this.userModel.findOne({ email: user.email });
    if (userByEmail) {
      throw new Error('User already exists');
    }
    const newUser = new this.userModel(user);
    return newUser.save();
  };
}
