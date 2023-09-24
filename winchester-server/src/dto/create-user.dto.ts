import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    example: 'myEmail@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    example: 'myPassword',
  })
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    description: 'First name of the user',
    type: String,
    example: 'John',
  })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the user',
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  last_name: string;
}
