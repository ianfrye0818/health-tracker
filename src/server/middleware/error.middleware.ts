import { BadRequestException } from '@/exceptions';
import { Logger } from '@/lib/Logger';
import { Prisma } from '@prisma/generated';
import { createMiddleware } from '@tanstack/react-start';

const PrismaErrorCodeMap = {
  P2002: 'Unique constraint failed',
  P2003: 'Foreign key constraint failed',
  P2004: 'A database constraint failed',
  P2006: 'A Field Name is not valid',
  P2007: 'Data validation failed',
  P2008: 'Failed to parse query',
  P2011: 'Null Constraint Failed',
  P2012: 'Missing Required Path',
  P2013: 'Missing Required Argument',
  P2015: 'Missing Relationship',
  P2018: 'Related Records Not Found',
  P2024: 'Timout While Waiting For Resource',
  P2033:
    "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers",
} as const;

export const errorMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    try {
      return await next();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        handlePrismaError(error);
      }
      throw error;
    }
  }
);

const handlePrismaError = (
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError
    | Prisma.PrismaClientUnknownRequestError
) => {
  const logger = new Logger('Prisma Error');
  logger.error({ erroType: error.name, errorMessage: error.message });

  if ('code' in error && error.code) {
    const message =
      PrismaErrorCodeMap[error.code as keyof typeof PrismaErrorCodeMap] ??
      'A Database Error Occured';
    throw new BadRequestException(message);
  }

  if ((error as Prisma.PrismaClientValidationError).message) {
    throw new BadRequestException('Invalid data provided');
  }

  throw new BadRequestException('An unexpected error occurred');
};
