import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FailureResponse } from 'src/common/utils/handleErrors/responseFactory';
import { Request, Response } from 'express';

export class GlobalFilterException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';
    let details: any = null;

    // throw new NotFoundException('Сообщение') или NotFoundException({ message: 'Сообщение', error: 'Not Found' }
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      status = exception.getStatus();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        errorCode = (exceptionResponse as any).code || errorCode;
      }
    }

    // ошибки из Prisma
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = 409;
        errorCode = 'UNIQUE_CONSTRAINT';
        message = 'Record already exists';
      } else if (exception.code === 'P2025') {
        status = 404;
        errorCode = 'RECORD_NOT_FOUND';
        message = 'Record not found';
      }

      details = exception.meta;
    }
    else if (exception instanceof Error) {
      message = exception.message;
      errorCode = 'INTERNAL_ERROR';
      details =
        process.env.NODE_ENV === 'development'
          ? { stack: exception.stack }
          : null;
    }

    const failureResponse = new FailureResponse(
      errorCode,
      { message, details },
      request.url,
    );

    response.status(status).json(failureResponse);
  }
}
