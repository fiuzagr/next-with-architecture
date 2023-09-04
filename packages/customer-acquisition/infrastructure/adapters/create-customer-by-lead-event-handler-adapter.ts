import { EventHandlerPort, LoggerPort, UseCasePort } from "@packages/core";
import { Event } from "@packages/core/application/domain";
import { CreateCustomerRequest } from "@packages/customer-acquisition";

export class CreateCustomerByLeadEventHandlerAdapter
  implements EventHandlerPort
{
  constructor(
    private readonly useCase: UseCasePort<CreateCustomerRequest, void>,
    private readonly logger: LoggerPort
  ) {}

  async handle(event: Event) {
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
