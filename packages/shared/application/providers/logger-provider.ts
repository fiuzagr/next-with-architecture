import { LoggerPort } from "@packages/shared";
import { Provider } from "./provider";

export class LoggerProvider extends Provider<LoggerPort> {
  static getInstance(): any {
    return super.getInstance(LoggerProvider.name);
  }
}
