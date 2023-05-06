import { EventHandlerPort, EventsManager } from "@packages/shared";

interface EventDispatcherPort {
  register(eventName: string, eventHandler: EventHandlerPort): void;

  notify(eventsManagers: EventsManager[]): void;
}

export default EventDispatcherPort;
