import {
  EventDataDto,
  EventHandlerPort,
  LoggerPort,
  UseCasePort,
} from "@packages/shared";
import { Event } from "@packages/shared/application/domain";
import { CreateCustomerRequest } from "@packages/customer-acquisition";

export class CreateCustomerByLeadEventHandlerAdapter
  implements EventHandlerPort
{
  constructor(
    private readonly useCase: UseCasePort<CreateCustomerRequest, void>,
    private readonly logger: LoggerPort
  ) {}

  handle(event: Event<EventDataDto>) {
    const customer = {
      data: {
        ...event.data.lead,
        id: undefined,
        leadId: event.data.lead.id,
      },
    };
    this.useCase.execute(customer).catch((error) => {
      this.logger.error(error);
    });
  }
}
