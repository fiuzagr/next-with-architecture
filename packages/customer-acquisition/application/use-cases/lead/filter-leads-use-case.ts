import {
  DataSourcePort,
  FilterDto,
  LeadDTO,
} from "@packages/customer-acquisition";
import {
  LoggerProvider,
  RequestDto,
  ResponseDto,
  UseCasePort,
} from "@packages/core";

export type FilterLeadsRequest = RequestDto<FilterDto>;
export type FilterLeadsResponse = ResponseDto<{
  leads: LeadDTO[];
}>;

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
