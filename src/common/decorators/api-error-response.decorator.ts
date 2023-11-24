import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseErrorMessage } from '../interfaces/response-message';

/**
 * Response data swagger docs
 *
 * Default errors for routes
 */
export const ApiErrorResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid parameters',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Bussiness rule',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_GATEWAY,
      description: 'Invalid response',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
  );
};
