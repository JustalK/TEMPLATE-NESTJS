import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

/**
 * Manage the data coming from the db for returning a graph that can be controlled with the decorateur
 * @param classToIntercept The class of the model to intercept
 */
function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    /**
     * Return the object from a json format
     * @param document The document to transform
     * @returns The document transform to an object
     */
    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }

      return plainToClass(classToIntercept, document.toJSON());
    }

    /**
     * Depending of the type of the response, change every object or the single response to obj
     * @param response The response from the database
     * @returns The data without some data
     */
    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(response);
    }

    /**
     * serialize the object into data that can be pass over the graph
     * @param response The response from the database
     * @returns The data without some data
     */
    serialize(response: PlainLiteralObject | PlainLiteralObject[]) {
      return this.prepareResponse(response);
    }
  };
}

export default MongooseClassSerializerInterceptor;
