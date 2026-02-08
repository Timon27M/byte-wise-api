import { Expose, Exclude, Type } from "class-transformer";

export class UserResponseModel {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Exclude()
  password: string;
}
export class RegisterResponseDto {
  @Expose()
  @Type(() => UserResponseModel)
  user: UserResponseModel;

  @Expose()
  token: string;
}
