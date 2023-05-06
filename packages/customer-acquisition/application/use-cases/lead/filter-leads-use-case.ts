import {
  FilterDto,
  LeadDataSourcePort,
  LeadDto,
} from "@packages/customer-acquisition";
import { LoggerProvider, UseCasePort } from "@packages/shared";

class FilterLeadsUseCase implements UseCasePort<FilterDto, LeadDto[]> {
  constructor(private dataSource: LeadDataSourcePort) {}

  async execute(filter: FilterDto) {
    const leads = await this.dataSource.filter(filter);

    LoggerProvider.getInstance().debug(FilterLeadsUseCase.name, {
      filter,
      leads,
    });

    return leads;
  }
}

export default FilterLeadsUseCase;
