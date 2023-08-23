import {
  DataSourcePort,
  FilterDto,
  LeadDTO,
} from "@packages/customer-acquisition";
import { LoggerProvider, UseCasePort } from "@packages/shared";

export interface FilterLeadsRequest {
  data: FilterDto;
}

export interface FilterLeadsResponse {
  data: {
    leads: LeadDTO[];
  };
}

export class FilterLeadsUseCase
  implements UseCasePort<FilterLeadsRequest, FilterLeadsResponse>
{
  constructor(private readonly dataSource: DataSourcePort<LeadDTO>) {}

  async execute(request: FilterLeadsRequest) {
    const leads = await this.dataSource.filter(request.data);

    LoggerProvider.getInstance().debug(FilterLeadsUseCase.name, {
      request,
      leads,
    });

    return {
      data: {
        leads,
      },
    };
  }
}
