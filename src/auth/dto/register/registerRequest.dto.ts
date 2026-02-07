import {
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface IPasswordConfirmable {
  password: string;
}

@ValidatorConstraint({ name: "passwordMatch", async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(passwordConfirm: string, args: ValidationArguments) {
    const object = args.object as IPasswordConfirmable;
    return object.password === passwordConfirm;
  }

  defaultMessage() {
    return "Пароли не совпадают";
  }
}

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Validate(PasswordMatchConstraint)
  passwordConfirm: string;
}
