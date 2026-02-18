import { Category } from "@prisma/client";
import { Expose, Type } from "class-transformer";

export default class QuestionsAllResponseDto {
  @Expose()
  @Type(() => QuestionDataDto)
  questions: Array<QuestionDataDto>;
}

export class QuestionDataDto {
  @Expose()
  text: string;

  @Expose()
  response: string | null;

  @Expose()
  category: Category;
}
