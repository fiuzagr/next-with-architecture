import { Event } from "@packages/core/application/domain";
import { CustomerDTO } from "@packages/customer-acquisition";

interface EventData {
  customer: CustomerDTO;
}

export class CustomerCreatedEvent extends Event<EventData> {}
