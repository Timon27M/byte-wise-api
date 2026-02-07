import { IsNotEmpty, IsString, MinLength, Matches } from "class-validator";

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[a-zA-Z])(?=.*\d)/, {
    message: "Пароль должен содержать буквы и цифры",
  })
  password: string;
}
