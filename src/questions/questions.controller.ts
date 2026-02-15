import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import QuestionRequestDto from "./dto/question/questionRequest.dto";
import type { TUserDecorator } from "src/types/UserDecorator.type";
import { DefaultResponseDto } from "./dto/defaultResponse.dto";

@UseGuards(JwtAuthGuard)
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post("question")
  async postQuestion(
    @Body() questionRequestDto: QuestionRequestDto,
    @GetUser() user: TUserDecorator,
  ) {
    const res = await this.questionsService.addQuestion(
      questionRequestDto,
      user,
    );
    if (res.status === "error") {
      throw new HttpException(
        new DefaultResponseDto(res.status, res.message, res.statusCode),
        res.statusCode,
      );
    }
    return new DefaultResponseDto(res.status, res.message, res.statusCode);
  }

  @Get()
  async getQuestions() {
    return await this.questionsService.getAllQuestions();
  }
}
