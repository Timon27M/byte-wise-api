import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from "class-validator";
import { type TStatus } from "../questions/types/TDefaultResponse.type";
import { HttpStatus } from "@nestjs/common";

enum Status {
  SUCCESS = "success",
  ERROR = "error",
}

export class DefaultResponseDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: TStatus;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(HttpStatus)
  statusCode: HttpStatus;

  @IsDateString() // Для ISO строки даты
  @IsOptional() // Можно сделать опциональным, если дата генерируется автоматически
  timestamp: string;

  constructor(status: TStatus, message: string, statusCode: HttpStatus) {
    this.message = message;
    this.status = status;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }

  static success(message: string, statusCode: HttpStatus) {
    return new DefaultResponseDto(Status.SUCCESS, message, statusCode);
  }

  static error(message: string, statusCode: HttpStatus) {
    return new DefaultResponseDto(Status.ERROR, message, statusCode);
  }
}

// Пример использования с данными
export class DefaultResponseWithDataDto<T> extends DefaultResponseDto {
  @IsOptional()
  data?: T;

  constructor(
    status: TStatus,
    message: string,
    statusCode: HttpStatus,
    data?: T,
  ) {
    super(status, message, statusCode);
    this.data = data;
  }

  static success<T>(
    message: string,
    statusCode: HttpStatus,
    data?: T,
  ): DefaultResponseWithDataDto<T> {
    return new DefaultResponseWithDataDto(
      Status.SUCCESS,
      message,
      statusCode,
      data,
    );
  }

  static error<T>(
    message: string,
    statusCode: HttpStatus,
    data?: T,
  ): DefaultResponseWithDataDto<T> {
    return new DefaultResponseWithDataDto(
      Status.ERROR,
      message,
      statusCode,
      data,
    );
  }
}
