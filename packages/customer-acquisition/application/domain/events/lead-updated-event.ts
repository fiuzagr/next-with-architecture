import { Event } from "@packages/core/application/domain";
import { LeadDTO } from "@packages/customer-acquisition";

interface EventData {
  lead: LeadDTO;
}

export class LeadUpdatedEvent extends Event<EventData> {}
