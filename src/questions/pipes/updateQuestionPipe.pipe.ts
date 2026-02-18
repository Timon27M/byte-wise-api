import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isUpdateQuestionTextDtoData } from "../types/quards/isUpdateQuestionTextDtoData.quard";
import {
  UpdateQuestionResponseDto,
  UpdateQuestionTextDto,
} from "../dto/question/questionUpdateRequest.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { isUpdateQuestionResponseDtoData } from "../types/quards/isUpdateQuestionResponseDtoData.quard";

@Injectable()
export class UpdateQuestionPipe implements PipeTransform {
  async transform(value: any) {
    if (!value || typeof value !== "object") {
      throw new BadRequestException("Invalid request body");
    }

    const keys = Object.keys(value);

    // Проверяем, что передан только один ключ
    if (keys.length !== 1) {
      throw new BadRequestException(
        "Должно быть указано только одно поле: questionText или questionResponseText",
      );
    }

    const [fieldName] = keys;
    const fieldValue = (value as Record<string, unknown>)[fieldName];

    // Проверяем, что значение не пустое
    if (!fieldValue || typeof fieldValue !== "string") {
      throw new BadRequestException("Значение должно быть непустой строкой");
    }

    // Определяем тип DTO на основе имени поля
    if (isUpdateQuestionTextDtoData(value)) {
      const dto = plainToInstance(UpdateQuestionTextDto, value);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new BadRequestException("Ошибка валидации questionText");
      }
      return dto;
    }

    if (isUpdateQuestionResponseDtoData(value)) {
      const dto = plainToInstance(UpdateQuestionResponseDto, value);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new BadRequestException("Ошибка валидации questionText");
      }
      return dto;
    }

    throw new BadRequestException("Недопустимое имя поля");
  }
}
