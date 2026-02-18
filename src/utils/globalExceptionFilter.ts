import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { DefaultResponseDto } from "./defaultResponse.dto";

function hasMessage(obj: unknown): obj is { message: string } {
  if (
    typeof obj === "object" &&
    obj !== null &&
    "message" in obj &&
    typeof obj.message === "string"
  ) {
    return true;
  }

  return false;
}

@Catch()
export class GlobalexceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === "string"
          ? res
          : hasMessage(res)
            ? res.message
            : exception.message;
    }

    response
      .status(status)
      .json(new DefaultResponseDto("error", message, status));
  }
}
