import { DataSourcePort, LeadDTO } from "@packages/customer-acquisition";
import {
  LoggerProvider,
  RequestDto,
  ResponseDto,
  UseCasePort,
} from "@packages/core";

export type FindLeadByIdRequest = RequestDto<{
  id: string;
}>;

export type FindLeadByIdResponse = ResponseDto<{
  lead: LeadDTO;
}>;

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
