import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PageDto } from '../../common/dto';

interface IPaginatedDecoratorApiResponse<T> {
  type: Type<any & T>;
  description?: string;
}
/**
 * Response marvel swagger docs
 */
export const ApiMarvelResponse = <TModel extends Type<any>>(
  options: IPaginatedDecoratorApiResponse<TModel>,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: options.description || 'Successfully received model list',
      schema: {
        properties: {
          data: {
            type: 'object',
            $ref: getSchemaPath(PageDto),
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        },
      },
    }),
  );
};
