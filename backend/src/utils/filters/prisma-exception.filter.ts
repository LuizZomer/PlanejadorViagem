import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GlobalError } from '../exceptions/global-error.exception';
import { Response } from 'express';

const logger = new Logger();

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === 'P2002') {
      const fields = (exception.meta?.target as string[]) || [];
      logger.log('Ola');

      response.status(400).json({
        message: `O campo ${fields[0]} já existe`,
        statusCode: 400,
        type: 'repeated_field',
      });
    } else {
      response.status(500).json({
        message: `Internal Server Error`,
        statusCode: 500,
      });
    }
  }
}
