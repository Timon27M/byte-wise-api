import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import QuestionRequestDto from "./dto/question/questionRequest.dto";
import type { TUserDecorator } from "src/types/UserDecorator.type";
import type { TDefaultResponse } from "./types/TDefaultResponse.type";
import { Prisma } from "@prisma/client";
import { TQuestion } from "./types/TQuestionResponse.type";
import QuestionsQueryDto from "./dto/questions/questionsQuery.dto";
import {
  UpdateQuestionResponseDto,
  UpdateQuestionTextDto,
} from "./dto/question/questionUpdateRequest.dto";
import { isUpdateQuestionTextDtoData } from "./types/quards/isUpdateQuestionTextDtoData.quard";
import { isUpdateQuestionResponseDtoData } from "./types/quards/isUpdateQuestionResponseDtoData.quard";

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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Вопрос с таким текстом уже существует");
      }

      throw error; // всё остальное пойдёт в 500
    }
  }

  public async getQuestionsByCategory(
    query: QuestionsQueryDto,
  ): Promise<TQuestion[]> {
    const questionsData: TQuestion[] =
      await this.prismaService.question.findMany({
        where: {
          ...(query.category && { category: query.category }),
        },
        select: {
          text: true,
          category: true,
          response: true,
        },
      });

    return questionsData;
  }

  public async updateQuestionData(
    questionId: string,
    questionData: UpdateQuestionTextDto | UpdateQuestionResponseDto,
    userData: TUserDecorator,
  ): Promise<TDefaultResponse> {
    try {
      await this.prismaService.question.update({
        where: {
          id_authorId: {
            id: questionId,
            authorId: userData.id,
          },
        },
        data: {
          ...(isUpdateQuestionTextDtoData(questionData) &&
            questionData.questionText && { text: questionData.questionText }),
          ...(isUpdateQuestionResponseDtoData(questionData) &&
            questionData.questionResponseText && {
              response: questionData.questionResponseText,
            }),
        },
      });
      return {
        statusCode: 200,
        message: "Вопрос успешно обнавлен",
        status: "success",
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ForbiddenException("Вопрос не найден или у вас нет доступа");
      }
      throw error;
    }
  }

  public async deleteQuestionData(
    questionId: string,
    userData: TUserDecorator,
  ): Promise<TDefaultResponse> {
    try {
      await this.prismaService.question.delete({
        where: {
          id_authorId: {
            id: questionId,
            authorId: userData.id,
          },
        },
      });

      return {
        status: "success",
        statusCode: HttpStatus.ACCEPTED,
        message: "Вопрос успешно удален!",
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ForbiddenException("Вопрос не найден или у вас нет доступа");
      }
      throw error;
    }
  }
}
