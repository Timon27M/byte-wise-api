import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import QuestionRequestDto from "./dto/question/questionRequest.dto";
import type { TUserDecorator } from "src/types/UserDecorator.type";
import { DefaultResponseDto } from "../utils/defaultResponse.dto";
import QuestionsMapper from "./mappers/questionsMapper";
import QuestionsQueryDto from "./dto/questions/questionsQuery.dto";
import {
  UpdateQuestionResponseDto,
  UpdateQuestionTextDto,
} from "./dto/question/questionUpdateRequest.dto";
import { UpdateQuestionPipe } from "./pipes/updateQuestionPipe.pipe";

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
    return new DefaultResponseDto(res.status, res.message, res.statusCode);
  }

  @Get()
  async getQuestionsByCategory(@Query() query: QuestionsQueryDto) {
    const questionsData =
      await this.questionsService.getQuestionsByCategory(query);

    const questionsResponse =
      QuestionsMapper.getAllQuestionsResponse(questionsData);

    return questionsResponse;
  }

  @Patch(":id")
  async patchQuestionData(
    @Param("id") questionId: string,
    @Body(UpdateQuestionPipe)
    questionData: UpdateQuestionTextDto | UpdateQuestionResponseDto,
    @GetUser() userData: TUserDecorator,
  ) {
    const res = await this.questionsService.updateQuestionData(
      questionId,
      questionData,
      userData,
    );

    return new DefaultResponseDto(res.status, res.message, res.statusCode);
  }
}
