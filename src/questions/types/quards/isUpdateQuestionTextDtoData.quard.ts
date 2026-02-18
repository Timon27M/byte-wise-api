import { UpdateQuestionTextDto } from "src/questions/dto/question/questionUpdateRequest.dto";

export function isUpdateQuestionTextDtoData(
  questionData: unknown,
): questionData is UpdateQuestionTextDto {
  if (
    typeof questionData === "object" &&
    questionData !== null &&
    (questionData as Record<string, unknown>).questionText !== undefined &&
    typeof (questionData as Record<string, unknown>).questionText ===
      "string" &&
    Object.keys(questionData).length === 1
  ) {
    return true;
  }

  return false;
}
