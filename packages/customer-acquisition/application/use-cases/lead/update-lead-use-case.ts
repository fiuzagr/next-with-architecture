import {
  LeadRepositoryPort,
  UpdateLeadDto,
  UpdateLeadError,
} from "@packages/customer-acquisition";
import {
  EventDispatcherPort,
  LoggerProvider,
  UseCasePort,
} from "@packages/shared";

class UpdateLeadUseCase implements UseCasePort<UpdateLeadDto, void> {
  constructor(
    private repository: LeadRepositoryPort,
    private eventDispatcher: EventDispatcherPort
  ) {}

  async execute(leadDto: UpdateLeadDto) {
    try {
      const lead = await this.repository.find(leadDto.id);

      lead.update(leadDto);

      await this.repository.save(lead);

      this.eventDispatcher.notify([lead]);

      LoggerProvider.getInstance().debug(UpdateLeadUseCase.name, {
        leadDto,
        lead,
      });
    } catch (error) {
      throw new UpdateLeadError(error as Error);
    }
  }
}

export default UpdateLeadUseCase;
