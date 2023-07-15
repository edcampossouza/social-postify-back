import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenDto } from './dto/token.dto';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

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

  public async getUserFromToken(token: string): Promise<User | null> {
    let user = null;
    try {
      const payload = this.jwtService.verify(token);
      if (!payload || !payload.sub) {
        return null;
      }
      user = await this.userService.getById(+payload.sub);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
