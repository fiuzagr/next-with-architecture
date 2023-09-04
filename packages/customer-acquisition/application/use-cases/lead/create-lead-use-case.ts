import {
  CreateLeadError,
  LeadRepositoryPort,
} from "@packages/customer-acquisition";
import { Lead } from "@packages/customer-acquisition/application/domain";
import {
  EventDispatcherPort,
  LoggerProvider,
  RequestDto,
  UseCasePort,
} from "@packages/core";

export type CreateLeadRequest = RequestDto<{
  fullName: string;
  cpf: string;
  email: string;
}>;

export class CreateLeadUseCase implements UseCasePort<CreateLeadRequest, void> {
  constructor(
    private readonly repository: LeadRepositoryPort,
    private readonly eventDispatcher: EventDispatcherPort
  ) {}

  async execute(request: CreateLeadRequest) {
    try {
      const lead = Lead.fromDTO(request.data);
      await this.repository.save(lead);

      this.eventDispatcher.notify([lead]);

      LoggerProvider.getInstance().debug(CreateLeadUseCase.name, {
        request,
        lead,
      });
    } catch (error) {
      throw new CreateLeadError(error as Error);
    }
  }
}
