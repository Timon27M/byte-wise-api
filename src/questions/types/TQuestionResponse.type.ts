import { Question } from "@prisma/client";

export type TQuestion = {
  text: Question["text"];
  response: Question["response"];
  category: Question["category"];
};
