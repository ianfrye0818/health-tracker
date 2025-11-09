import { ZodError } from 'zod';

export class ErrorFormatter {
  static format(
    error: unknown,
    message: string = 'An unknown error occurred'
  ): string {
    if (ErrorFormatter.isZodError(error))
      return ErrorFormatter.formatZodError(error);

    if (ErrorFormatter.isError(error)) return error.message;

    return message;
  }

  static isError(error: unknown): error is Error {
    return error instanceof Error;
  }

  static isZodError(error: unknown): error is ZodError {
    return error instanceof ZodError;
  }

  static formatZodError(error: ZodError): string {
    return error.issues.map((e) => e.message).join(', ');
  }
}
