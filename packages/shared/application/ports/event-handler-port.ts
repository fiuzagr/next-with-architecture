import { EventDataDto } from "@packages/shared";
import { Event } from "@packages/shared/application/domain";

interface EventHandlerPort<
  EventData extends EventDataDto = EventDataDto,
  T extends Event<EventData> = Event<EventData>
> {
  handle(event: T): void;
}

export default EventHandlerPort;
