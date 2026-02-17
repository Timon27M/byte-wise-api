import { HttpStatus } from "@nestjs/common";

export type TStatus = "success" | "error";

export type TDefaultResponse = {
  status: TStatus;
  statusCode: HttpStatus;
  message: string;
};
