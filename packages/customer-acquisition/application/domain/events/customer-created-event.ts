import { Event } from "@packages/shared/application/domain";
import { CustomerDTO } from "@packages/customer-acquisition";

interface EventData {
  customer: CustomerDTO;
}

export class CustomerCreatedEvent extends Event<EventData> {}
