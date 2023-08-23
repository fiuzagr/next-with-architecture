import { DataSourcePort, LeadDTO } from "@packages/customer-acquisition";
import { LoggerProvider, UseCasePort } from "@packages/shared";

export interface FindLeadByIdRequest {
  data: {
    id: string;
  };
}

export interface FindLeadByIdResponse {
  data: {
    lead: LeadDTO;
  };
}

export class FindLeadByIdUseCase
  implements UseCasePort<FindLeadByIdRequest, FindLeadByIdResponse>
{
  constructor(private readonly dataSource: DataSourcePort<LeadDTO>) {}

  async execute(request: FindLeadByIdRequest) {
    const lead = await this.dataSource.find(request.data.id);

    LoggerProvider.getInstance().debug(FindLeadByIdUseCase.name, {
      request,
      lead,
    });

    return {
      data: {
        lead,
      },
    };
  }
}
