import { LeadDTO } from "@packages/customer-acquisition";
import { Event } from "@packages/core/application/domain";

interface EventData {
  lead: LeadDTO;
}

export class LeadCreatedEvent extends Event<EventData> {}
