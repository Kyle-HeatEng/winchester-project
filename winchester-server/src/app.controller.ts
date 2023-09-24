import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Character, CharacterList } from './openai/schema/Winchester';
import { ApiOperation } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

type Response<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get('/enter-winchester')
  async getWinchesterStart() {
    const characterList = await this.appService.getCharacterList();

    const chatConversation =
      await this.appService.getChatConversation(characterList);
    return chatConversation;
  }

  @ApiOperation({ summary: 'Register a new user' })
  @Post('/auth/register')
  async register(
    @Body() user: CreateUserDto,
  ): Promise<Response<User | undefined>> {
    try {
      const new_user = await this.authService.register(user);
      if (!new_user) {
        throw new Error('User not created');
      }
      return {
        success: true,
        data: new_user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}
