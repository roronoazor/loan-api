import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
  } from '@nestjs/common';
  import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
  
  @Catch(EntityNotFoundError)
  export class EntityNotFoundFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      response.status(404).json({
        statusCode: 404,
        message: 'Record not found',
      });
    }
  }