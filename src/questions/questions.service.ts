import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import QuestionRequestDto from "./dto/question/questionRequest.dto";
import type { TUserDecorator } from "src/types/UserDecorator.type";
import type { TDefaultResponse } from "./types/DefaultResponse.type";
import { Prisma } from "@prisma/client";
import QuestionsAllResponseDto, {
  QuestionDataDto,
} from "./dto/questionsAllResponse.dto";
import { DefaultResponseDto } from "./dto/defaultResponse.dto";

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async addQuestion(
    questionData: QuestionRequestDto,
    userData: TUserDecorator,
  ): Promise<TDefaultResponse> {
    try {
      await this.prismaService.question.create({
        data: {
          text: questionData.questionText,
          response: questionData.questionResponseText,
          category: questionData.category,
          author: {
            connect: {
              id: userData.id,
            },
          },
        },
      });

      return {
        status: "success",
        statusCode: HttpStatus.CREATED,
        message: "Вопрос успешно добавлен!",
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          status: "error",
          statusCode: HttpStatus.CONFLICT,
          message: "Вопрос с таким текстом уже существует",
        };
      }
      if (error instanceof Error) {
        return {
          status: "error",
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
      return {
        status: "error",
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Ошибка базы данных: ${error}`,
      };
    }
  }

  public async getAllQuestions() {
    try {
      const questions = await this.prismaService.question.findMany({
        select: {
          text: true,
          category: true,
          response: true,
        },
      });

      const responseDto = new QuestionsAllResponseDto();

      // переписать chatgpt предложил создать globalexceptionFilter
      responseDto.questions = questions.map((q) => {
        const questionDto = new QuestionDataDto();
        questionDto.text = q.text;
        questionDto.category = q.category;
        questionDto.response = q.response;
        return questionDto;
      });

      return responseDto;
    } catch (error) {
      throw new HttpException(
        new DefaultResponseDto("error", error, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
