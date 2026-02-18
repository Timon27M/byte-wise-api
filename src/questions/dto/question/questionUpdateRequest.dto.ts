import { IsNotEmpty, IsString } from "class-validator";

// export default class QuestionUpdateDto {
//   @IsOptional()
//   @IsString()
//   questionText?: string;

//   @IsOptional()
//   @IsString()
//   questionResponseText?: string;
// }

export class UpdateQuestionTextDto {
  @IsString()
  @IsNotEmpty()
  questionText: string;
}

// DTO для обновления ответа
export class UpdateQuestionResponseDto {
  @IsString()
  @IsNotEmpty()
  questionResponseText: string;
}
