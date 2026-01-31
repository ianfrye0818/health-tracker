import { createStart } from '@tanstack/react-start';
import { errorMiddleware } from './server/middleware/error.middleware';
import { loggerMiddleware } from './server/middleware/logger.middleware';

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [errorMiddleware],
    requestMiddleware: [loggerMiddleware],
  };
});
