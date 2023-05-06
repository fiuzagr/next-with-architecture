import { FilterDto, LeadDto } from "@packages/customer-acquisition";

interface LeadDataSourcePort {
  save(lead: LeadDto): Promise<void>;

  find(id: string): Promise<LeadDto>;

  filter(filter: FilterDto): Promise<LeadDto[]>;
}

export default LeadDataSourcePort;
