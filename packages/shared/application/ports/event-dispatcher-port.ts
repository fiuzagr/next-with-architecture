import { EventHandlerPort, EventsManager } from "@packages/shared";

export interface EventDispatcherPort {
  register(eventNames: string[], eventHandler: EventHandlerPort): void;

  notify(eventsManagers: EventsManager[]): void;
}
