import { clc, isColorAllowed, yellow } from './cli-colors';
import { ConsoleLoggerOptions, LoggerService } from './interfaces';
import { DEFAULT_LOG_LEVELS, LogLevel } from './LogLevels';
import {
  dateTimeFormatter,
  isFunction,
  isLogLevelEnabled,
  isPlainObject,
  isString,
  isUndefined,
} from './utils';

export class ConsoleLogger implements LoggerService {
  protected options: ConsoleLoggerOptions;
  protected context?: string;
  protected originalContext?: string;
  protected static lastTimestampAt: number;

  constructor();
  constructor(context: string);
  constructor(options: ConsoleLoggerOptions);
  constructor(context: string, options: ConsoleLoggerOptions);
  constructor(
    contextOrOptions?: string | ConsoleLoggerOptions,
    options?: ConsoleLoggerOptions
  ) {
    let [context, opts] = isString(contextOrOptions)
      ? [contextOrOptions, options]
      : options
      ? [undefined, options]
      : [contextOrOptions?.context, contextOrOptions];

    opts = opts ?? {};
    opts.logLevels ??= DEFAULT_LOG_LEVELS;
    opts.colors ??= opts.colors ?? (opts.json ? false : isColorAllowed());
    opts.prefix ??= 'QTicket';

    this.options = opts;

    if (context) {
      this.context = context;
      this.originalContext = context;
    }
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('log')) return;

    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams,
    ]);
    this.printMessages(messages, context, 'log');
  }

  error(message: any, context?: string): void;
  error(messsage: any, ...optionalParams: [...any, string?]): void;
  error(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('error')) return;
    const { messages, context, stack } =
      this.getContextAndStackAndMessagesToPrint([message, ...optionalParams]);
    this.printMessages(messages, context, 'error', 'stderr', stack);
    this.printStackTrace(stack as string);
  }

  warn(message: any, context?: string): void;
  warn(messsage: any, ...optionalParams: [...any, string?]): void;
  warn(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('warn')) return;
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams,
    ]);
    this.printMessages(messages, context, 'warn');
  }

  debug(message: any, context?: string): void;
  debug(messsage: any, ...optionalParams: [...any, string?]): void;
  debug(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('debug')) return;
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams,
    ]);
    this.printMessages(messages, context, 'debug');
  }

  verbose(message: any, context?: string): void;
  verbose(messsage: any, ...optionalParams: [...any, string?]): void;
  verbose(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('verbose')) return;
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams,
    ]);
    this.printMessages(messages, context, 'verbose');
  }

  fatal(message: any, context?: string): void;
  fatal(messsage: any, ...optionalParams: [...any, string?]): void;
  fatal(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('fatal')) return;
    const { messages, context } = this.getContextAndMessagesToPrint([
      message,
      ...optionalParams,
    ]);
    this.printMessages(messages, context, 'fatal');
  }

  setLogLevels(logLevels: LogLevel[]): void {
    if (!this.options) this.options = {};
    this.options.logLevels = logLevels;
  }

  setContext(context: string): void {
    this.context = context;
  }

  resetContext(): void {
    this.context = this.originalContext;
  }

  protected getTimestamp(): string {
    return dateTimeFormatter.format(Date.now());
  }

  isLevelEnabled(level: LogLevel): boolean {
    const logLevels = this.options?.logLevels;
    return isLogLevelEnabled(level, logLevels);
  }

  protected printMessages(
    messages: unknown[],
    context = '',
    logLevel: LogLevel = 'log',
    writeStreamType?: 'stdout' | 'stderr',
    errorStack?: unknown
  ) {
    messages.forEach((message) => {
      if (this.options.json) {
        this.printAsJson(message, {
          context,
          logLevel,
          writeStreamType,
          errorStack,
        });
        return;
      }
      const pidMessage = this.formatPid();
      const contextMessage = this.formatContext(context);
      const timestampDiff = this.updateAndGetTimestampDiff();
      const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ');
      const formattedMessage = this.formatMessage(
        logLevel,
        message,
        pidMessage,
        formattedLogLevel,
        contextMessage,
        timestampDiff
      );

      if (this.options.forceConsole) {
        if (writeStreamType === 'stderr') {
          console.error(formattedMessage.trim());
        } else {
          console.log(formattedMessage.trim());
        }
      } else {
        // Browser fallback - use console methods since process.stdout/stderr don't exist
        if (writeStreamType === 'stderr') {
          console.error(formattedMessage.trim());
        } else {
          console.log(formattedMessage.trim());
        }
      }
    });
  }

  protected printAsJson(
    message: unknown,
    options: {
      context: string;
      logLevel: LogLevel;
      writeStreamType?: 'stdout' | 'stderr';
      errorStack?: unknown;
    }
  ) {
    const logObject = this.getJsonLogObject(message, options);
    const formattedMessage = JSON.stringify(logObject, this.stringifyReplacer);
    if (this.options.forceConsole) {
      if (options.writeStreamType === 'stderr') {
        console.error(formattedMessage);
      } else {
        console.log(formattedMessage);
      }
    } else {
      // Browser fallback - use console methods since process.stdout/stderr don't exist
      if (options.writeStreamType === 'stderr') {
        console.error(formattedMessage);
      } else {
        console.log(formattedMessage);
      }
    }
  }

  protected getJsonLogObject(
    message: unknown,
    options: {
      context: string;
      logLevel: LogLevel;
      writeStreamType?: 'stdout' | 'stderr';
      errorStack?: unknown;
    }
  ) {
    type JsonLogObject = {
      level: LogLevel;
      pid: number;
      timestamp: number;
      message: unknown;
      context?: string;
      stack?: unknown;
    };

    const logObject: JsonLogObject = {
      level: options.logLevel,
      pid: Math.floor(Math.random() * 10000), // Browser-compatible session ID
      timestamp: Date.now(),
      message,
    };

    if (options.context) {
      logObject.context = options.context;
    }

    if (options.errorStack) {
      logObject.stack = options.errorStack;
    }
    return logObject;
  }

  protected formatPid() {
    // Generate a simple session ID for browser compatibility instead of process.pid
    const sessionId = Math.floor(Math.random() * 10000);
    return `[${this.options.prefix}] ${sessionId}  - `;
  }

  protected formatContext(context: string): string {
    if (!context) {
      return '';
    }

    context = `[${context}] `;
    return this.options.colors ? yellow(context) : context;
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string
  ) {
    const output = this.stringifyMessage(message, logLevel);
    pidMessage = this.colorize(pidMessage, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
    return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}\n`;
  }

  protected stringifyMessage(
    message: unknown,
    logLevel: LogLevel
  ): string | undefined {
    if (isFunction(message)) {
      const messageAsStr = Function.prototype.toString.call(message);
      const isClass = messageAsStr.startsWith('class ');
      if (isClass) {
        // If the message is a class, we will display the class name.
        return this.stringifyMessage(message.name, logLevel);
      }
      // If the message is a non-class function, call it and re-resolve its value.
      return this.stringifyMessage(message(), logLevel);
    }

    if (typeof message === 'string') {
      return this.colorize(message, logLevel);
    }

    const outputText = JSON.stringify(message, this.stringifyReplacer);
    if (isPlainObject(message)) {
      return `Object(${Object.keys(message).length}) ${outputText}`;
    }
    if (Array.isArray(message)) {
      return `Array(${message.length}) ${outputText}`;
    }
    return outputText;
  }

  protected colorize(message: string, logLevel: LogLevel) {
    if (!this.options.colors || this.options.json) {
      return message;
    }
    const color = this.getColorByLogLevel(logLevel);
    return color(message);
  }

  protected printStackTrace(stack: string) {
    if (!stack || this.options.json) {
      return;
    }
    if (this.options.forceConsole) {
      console.error(stack);
    } else {
      // Browser fallback - use console.error since process.stderr doesn't exist
      console.error(stack);
    }
  }

  protected updateAndGetTimestampDiff(): string {
    const includeTimestamp =
      ConsoleLogger.lastTimestampAt && this.options?.timestamp;
    const result = includeTimestamp
      ? this.formatTimestampDiff(Date.now() - ConsoleLogger.lastTimestampAt!)
      : '';
    ConsoleLogger.lastTimestampAt = Date.now();
    return result;
  }

  protected formatTimestampDiff(timestampDiff: number) {
    const formattedDiff = ` +${timestampDiff}ms`;
    return this.options.colors ? yellow(formattedDiff) : formattedDiff;
  }

  protected stringifyReplacer(_key: string, value: unknown) {
    // Mimic util.inspect behavior for JSON logger with compact on and colors off
    if (typeof value === 'bigint') {
      return value.toString();
    }
    if (typeof value === 'symbol') {
      return value.toString();
    }

    if (value instanceof Map) {
      return `Map(${value.size}) {${Array.from(value.entries())
        .map(([k, v]) => `${k} => ${v}`)
        .join(', ')}}`;
    }
    if (value instanceof Set) {
      return `Set(${value.size}) {${Array.from(value).join(', ')}}`;
    }
    if (value instanceof Error) {
      return `${value.name}: ${value.message}${
        value.stack ? '\n' + value.stack : ''
      }`;
    }
    return value;
  }

  private getContextAndMessagesToPrint(args: unknown[]) {
    if (args?.length <= 1) {
      return { messages: args, context: this.context };
    }
    const lastElement = args[args.length - 1];
    const isContext = isString(lastElement);
    if (!isContext) {
      return { messages: args, context: this.context };
    }
    return {
      context: lastElement,
      messages: args.slice(0, args.length - 1),
    };
  }

  private getContextAndStackAndMessagesToPrint(args: unknown[]) {
    if (args.length === 2) {
      return this.isStackFormat(args[1])
        ? {
            messages: [args[0]],
            stack: args[1] as string,
            context: this.context,
          }
        : {
            messages: [args[0]],
            context: args[1] as string,
          };
    }

    const { messages, context } = this.getContextAndMessagesToPrint(args);
    if (messages?.length <= 1) {
      return { messages, context };
    }
    const lastElement = messages[messages.length - 1];
    const isStack = isString(lastElement);
    if (!isStack && !isUndefined(lastElement)) {
      return { messages, context };
    }
    return {
      stack: lastElement,
      messages: messages.slice(0, messages.length - 1),
      context,
    };
  }

  private isStackFormat(stack: unknown) {
    if (!isString(stack) && !isUndefined(stack)) {
      return false;
    }

    return /^(.)+\n\s+at .+:\d+:\d+/.test(stack!);
  }

  private getColorByLogLevel(level: LogLevel) {
    switch (level) {
      case 'debug':
        return clc.magentaBright;
      case 'warn':
        return clc.yellow;
      case 'error':
        return clc.red;
      case 'verbose':
        return clc.cyanBright;
      case 'fatal':
        return clc.bold;
      default:
        return clc.green;
    }
  }
}
