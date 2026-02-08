import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";

@UseGuards(JwtAuthGuard)
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  postQuestion(@Body() data: { title: string }, @GetUser() user) {
    return {
      title: data.title,
      user,
      id: 15,
    };
  }
}
