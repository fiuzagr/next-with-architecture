import { LeadDTO } from "@packages/customer-acquisition";
import { Event } from "@packages/shared/application/domain";

interface EventData {
  lead: LeadDTO;
}

export class LeadCreatedEvent extends Event<EventData> {}
