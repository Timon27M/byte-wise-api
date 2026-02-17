import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class QuestionUpdateDto {
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  response?: string;
}
