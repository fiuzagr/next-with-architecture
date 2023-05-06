import { LoggerPort, LogLevel, LogLevelStrings } from "@packages/shared";

interface LoggerSettings {
  level: LogLevelStrings;
}

const defaultLoggerSettings = {
  level: "warn" as LogLevelStrings,
};

class ConsoleLoggerAdapter implements LoggerPort {
  private settings: LoggerSettings;

  constructor(settings: LoggerSettings = defaultLoggerSettings) {
    this.settings = Object.assign({}, defaultLoggerSettings, settings);
  }

  private isLogLevelEnabled(level: LogLevelStrings) {
    return LogLevel[level] <= LogLevel[this.settings.level];
  }

  private log(level: LogLevelStrings, ...args: any[]) {
    if (this.isLogLevelEnabled(level)) {
      args.push(Date.now());

      if (level in console) {
        console[level](...args);
      } else {
        console.log(level, ...args);
      }
    }
  }

  debug(...args: any[]) {
    this.log("debug", ...args);
  }

  info(...args: any[]) {
    this.log("info", ...args);
  }

  warn(...args: any[]) {
    this.log("warn", ...args);
  }

  error(...args: any[]) {
    this.log("error", ...args);
  }
}

export default ConsoleLoggerAdapter;
