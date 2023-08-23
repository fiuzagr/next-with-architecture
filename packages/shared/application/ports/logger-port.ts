// ! the order of LogLevels is important
export enum LogLevel {
  error,
  warn,
  info,
  debug,
}

export type LogLevelStrings = keyof typeof LogLevel;

export interface LoggerPort {
  info(...args: any[]): void;

  debug(...args: any[]): void;

  warn(...args: any[]): void;

  error(...args: any[]): void;
}
