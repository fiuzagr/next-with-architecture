import { EventHandlerPort, EventsManager } from "@packages/core";

export interface EventDispatcherPort {
  register(eventNames: string[], eventHandler: EventHandlerPort): void;

  notify(eventsManagers: EventsManager[]): void;
}
