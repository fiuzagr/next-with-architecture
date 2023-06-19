import { FilterDto } from "@packages/customer-acquisition";
import {
  LeadDataSourcePort,
  LeadDto,
} from "@packages/customer-acquisition/application";

class IndexedDbLeadDataSource implements LeadDataSourcePort {
  constructor(private storage: LocalForage) {}

  async save(lead: LeadDto) {
    await this.storage.setItem(lead.id as string, lead);
  }

  async find(id: string): Promise<LeadDto> {
    return this.storage.getItem(id).then((lead) => (lead as LeadDto) || null);
  }

  async filter(filter: FilterDto): Promise<LeadDto[]> {
    const leads: LeadDto[] = [];

    await this.storage.iterate((lead: LeadDto) => {
      if (
        !filter.query ||
        lead.fullName.toLowerCase().includes(filter.query.toLowerCase())
      ) {
        leads.push(lead);
      }
    });

    return leads;
  }
}

export default IndexedDbLeadDataSource;
