import { Logger } from '@/lib/Logger';
import { useAppSession } from '@/lib/session';
import { createMiddleware } from '@tanstack/react-start';
import { getRequestHost, getRequestIP } from '@tanstack/react-start/server';

export const loggerMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ next, request }) => {
    const logger = new Logger('Logging Middleware', { timestamp: true });
    const session = await useAppSession();
    const url = new URL(request.url);
    const user = session.data;
    const host = getRequestHost();
    const ip = getRequestIP() ?? '127.0.0.1';

    const log = {
      timestamp: new Date().toISOString(),
      user: JSON.stringify(user),
      url: url.toString(),
      host,
      ip,
      method: request.method,
    };

    logger.log(log, 'request');

    return next();
  }
);
