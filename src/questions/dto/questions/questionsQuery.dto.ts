import { Category } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";

export default class QuestionsQueryDto {
  @IsOptional()
  @IsEnum(Category)
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value === "string") {
      return value.toUpperCase();
    }
    return value;
  })
  category?: Category;
}
