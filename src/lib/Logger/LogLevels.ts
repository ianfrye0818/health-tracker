export const LOG_LEVELS = [
  'verbose',
  'debug',
  'info',
  'log',
  'warn',
  'error',
  'fatal',
] as const satisfies string[];
export const DEFAULT_DEPTH = 5;
export type LogLevel = (typeof LOG_LEVELS)[number];

export const DEFAULT_LOG_LEVELS: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
  'fatal',
];

export const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  verbose: 0,
  debug: 1,
  log: 2,
  warn: 3,
  error: 4,
  fatal: 5,
  info: 6,
};
