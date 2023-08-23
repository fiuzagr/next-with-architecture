import {
  EventDataDto,
  EventHandlerPort,
  LoggerPort,
  LogLevelStrings,
} from "@packages/shared";
import { Event } from "@packages/shared/application/domain";

interface Settings {
  logLevel: LogLevelStrings;
}

const defaultSettings: Settings = {
  logLevel: "info",
};

export class LoggerEventHandlerAdapter implements EventHandlerPort {
  constructor(
    private readonly logger: LoggerPort,
    private readonly settings: Settings = defaultSettings
  ) {}

  handle(event: Event<EventDataDto>) {
    this.logger[this.settings.logLevel](event);
  }
}
