import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterRequestDto } from "./dto/register/registerRequest.dto";
import { LoginRequestDto } from "./dto/login/loginRequest.dto";
import { RegisterResponseDto } from "./dto/register/registerResponse.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerRequestDto);
  }

  @Post("login")
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }
}
