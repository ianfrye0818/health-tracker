import { LogLevel } from './LogLevels';

export interface LoggerService {
  log(message: any, ...optionalParams: any[]): any;
  error(message: any, ...optionalParams: any[]): any;
  warn(message: any, ...optionalParams: any[]): any;
  debug(message: any, ...optionalParams: any[]): any;
  verbose(message: any, ...optionalParams: any[]): any;
  fatal(message: any, ...optionalParams: any[]): any;
  setLogLevels?(levels: LogLevel[]): any;
}

export interface ConsoleLoggerOptions {
  logLevels?: LogLevel[];
  timestamp?: boolean;
  prefix?: string;
  json?: boolean;
  colors?: boolean;
  context?: string;
  forceConsole?: boolean;
  compact?: boolean;
  maxArrayLength?: number;
  maxStringLength?: number;
  sorted?: boolean | ((a: string, b: string) => number);
  depth?: number;
  showHidden?: boolean;
  breakLength?: number;
}

export interface LogBufferRecord {
  methodRef: Function;
  arguments: unknown[];
}
