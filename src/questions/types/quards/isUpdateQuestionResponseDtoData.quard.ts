import { UpdateQuestionResponseDto } from "src/questions/dto/question/questionUpdateRequest.dto";

export function isUpdateQuestionResponseDtoData(
  questionData: unknown,
): questionData is UpdateQuestionResponseDto {
  if (
    typeof questionData === "object" &&
    questionData !== null &&
    (questionData as Record<string, unknown>).questionResponseText !==
      undefined &&
    typeof (questionData as Record<string, unknown>).questionResponseText ===
      "string" &&
    Object.keys(questionData).length === 1
  ) {
    return true;
  }

  return false;
}
