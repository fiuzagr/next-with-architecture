import {
  CreateLeadDto,
  CreateLeadError,
  LeadRepositoryPort,
} from "@packages/customer-acquisition";
import { Lead } from "@packages/customer-acquisition/application/domain";
import {
  EventDispatcherPort,
  LoggerProvider,
  UseCasePort,
} from "@packages/shared";

class CreateLeadUseCase implements UseCasePort<CreateLeadDto, void> {
  constructor(
    private repository: LeadRepositoryPort,
    private eventDispatcher: EventDispatcherPort
  ) {}

  async execute(leadDto: CreateLeadDto) {
    try {
      const lead = Lead.fromJSON(leadDto);
      await this.repository.save(lead);

      this.eventDispatcher.notify([lead]);

      LoggerProvider.getInstance().debug(CreateLeadUseCase.name, {
        leadDto,
        lead,
      });
    } catch (error) {
      throw new CreateLeadError(error as Error);
    }
  }
}

export default CreateLeadUseCase;
