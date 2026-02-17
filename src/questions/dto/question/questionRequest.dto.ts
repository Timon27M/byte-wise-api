import { $Enums } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class QuestionRequestDto {
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsString()
  questionResponseText: string;

  @IsOptional()
  @IsEnum($Enums.Category, {
    message:
      "Category должна быть одной из следуюущих: JAVASCRIPT, TYPESCRIPT, NETWORK, REACT, REDUX, REST",
  })
  @Transform(({ value }): $Enums.Category => value ?? $Enums.Category.REST)
  category: $Enums.Category;
}
