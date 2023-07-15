import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  async signin(@Body() credentials: SignInDto): Promise<TokenDto> {
    const response = await this.authService.signin(credentials);
    return response;
  }
}
