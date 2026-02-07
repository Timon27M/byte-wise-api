import { Expose, Exclude } from "class-transformer";

export class RegisterResponseDto {
  @Expose()
  user: UserResponseModel;

  @Expose()
  token: string;
}

class UserResponseModel {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Exclude()
  password: string;
}
