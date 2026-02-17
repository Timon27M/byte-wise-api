import QuestionsAllResponseDto, {
  QuestionDataDto,
} from "../dto/questions/questionsAllResponse.dto";
import type { TQuestion } from "../types/TQuestionResponse.type";

export default class QuestionsMapper {
  static getAllQuestionsResponse(
    questionsData: TQuestion[],
  ): QuestionsAllResponseDto {
    const responseDto = new QuestionsAllResponseDto();

    responseDto.questions = questionsData.map((question) => {
      const questionDto = new QuestionDataDto();
      questionDto.text = question.text;
      questionDto.category = question.category;
      questionDto.response = question.response;
      return questionDto;
    });

    return responseDto;
  }
}
