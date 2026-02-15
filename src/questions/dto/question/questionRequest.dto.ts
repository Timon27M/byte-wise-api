import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum Category {
  JAVASCRIPT = "JAVASCRIPT",
  TYPESCRIPT = "TYPESCRIPT",
  NETWORK = "NETWORK",
  REACT = "REACT",
  REDUX = "REDUX",
  REST = "REST",
}

export default class QuestionRequestDto {
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsString()
  questionResponseText: string;

  @IsOptional()
  @IsEnum(Category, {
    message:
      "Category должна быть одной из следуюущих: JAVASCRIPT, TYPESCRIPT, NETWORK, REACT, REDUX, REST",
  })
  @Transform(({ value }): Category => value ?? Category.REST)
  category: Category;
}
