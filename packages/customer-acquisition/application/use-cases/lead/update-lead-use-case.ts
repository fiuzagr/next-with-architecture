import {
  LeadRepositoryPort,
  UpdateLeadError,
} from "@packages/customer-acquisition";
import {
  EventDispatcherPort,
  LoggerProvider,
  RequestDto,
  UseCasePort,
} from "@packages/core";

export type UpdateLeadRequest = RequestDto<{
  id: string;
  fullName: string;
  cpf: string;
  email: string;
}>;

export class UpdateLeadUseCase implements UseCasePort<UpdateLeadRequest, void> {
  constructor(
    private readonly repository: LeadRepositoryPort,
    private readonly eventDispatcher: EventDispatcherPort
  ) {}

  async execute(request: UpdateLeadRequest) {
    try {
      const lead = await this.repository.find(request.data.id);

      lead.update(request.data);

      await this.repository.save(lead);

      this.eventDispatcher.notify([lead]);

      LoggerProvider.getInstance().debug(UpdateLeadUseCase.name, {
        request,
        lead,
      });
    } catch (error) {
      throw new UpdateLeadError(error as Error);
    }
  }
}
