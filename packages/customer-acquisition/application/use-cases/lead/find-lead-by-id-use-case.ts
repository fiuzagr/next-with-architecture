import { LeadDataSourcePort, LeadDto } from "@packages/customer-acquisition";
import { LoggerProvider, UseCasePort } from "@packages/shared";

class FindLeadByIdUseCase implements UseCasePort<string, LeadDto> {
  constructor(private dataSource: LeadDataSourcePort) {}

  async execute(id: string) {
    const lead = await this.dataSource.find(id);

    LoggerProvider.getInstance().debug(FindLeadByIdUseCase.name, { id, lead });

    return lead;
  }
}

export default FindLeadByIdUseCase;
