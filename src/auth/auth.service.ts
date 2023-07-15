import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenDto } from './dto/token.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(credentials: SignInDto): Promise<TokenDto> {
    const user = await this.userService.getByEmail(credentials.email);
    if (!user || !bcrypt.compareSync(credentials.password, user.password))
      throw new UnauthorizedException();
    return this.createToken(user);
  }

  private createToken(user: User): TokenDto {
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token };
  }
}
