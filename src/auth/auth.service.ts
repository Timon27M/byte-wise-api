import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RegisterRequestDto } from "./dto/register/registerRequest.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginRequestDto } from "./dto/login/loginRequest.dto";
import { RegisterResponseDto } from "./dto/register/registerResponse.dto";
import { plainToInstance } from "class-transformer";
import { LoginResponseDto } from "./dto/login/loginResponse.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error("Error hashing password", error);
    }
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      throw new Error("Error comparing passwords:", error);
    }
  }

  public async register(
    registerRequest: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { login: registerRequest.login },
    });

    if (existingUser) {
      throw new ConflictException(
        "Пользователь с таким логином уже существует",
      );
    }

    const hashedPassword = await this.hashPassword(registerRequest.password);

    const user = await this.prismaService.user.create({
      data: {
        login: registerRequest.login,
        password: hashedPassword,
      },
    });

    const payload = { sub: user.id, login: user.login };
    const token = this.jwtService.sign(payload);

    return plainToInstance(RegisterResponseDto, {
      user,
      token,
    });
  }

  public async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { login: loginRequest.login },
    });

    if (!user) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }

    const isPasswordValid = await this.comparePasswords(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }

    const payload = { sub: user.id, login: user.login };
    const token = this.jwtService.sign(payload);

    return plainToInstance(RegisterResponseDto, {
      user,
      token,
    });
  }
}
