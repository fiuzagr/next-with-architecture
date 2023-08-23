import { EventDataDto } from "@packages/shared";

export abstract class Event<T extends EventDataDto = EventDataDto> {
  public constructor(
    public readonly data: T,
    public readonly timestamp: Date = new Date()
  ) {}
}
