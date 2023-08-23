import { FilterDto, LeadDTO } from "@packages/customer-acquisition";
import { DataSourcePort } from "@packages/customer-acquisition/application";

export class BrowserStorageLeadDataSource implements DataSourcePort<LeadDTO> {
  static key = "Lead:";

  constructor(private readonly storage: Storage) {}

  async save(lead: LeadDTO) {
    this.storage.setItem(
      `${BrowserStorageLeadDataSource.key}${lead.id}`,
      JSON.stringify(lead)
    );
  }

  async find(id: string): Promise<LeadDTO> {
    const lead = this.storage.getItem(
      `${BrowserStorageLeadDataSource.key}${id}`
    );
    return lead ? JSON.parse(lead) : null;
  }

  async filter(filter: FilterDto): Promise<LeadDTO[]> {
    return Object.keys(this.storage)
      .filter((key) => key.startsWith(BrowserStorageLeadDataSource.key))
      .slice(filter.offset, filter.offset + filter.limit)
      .map((key) => {
        const lead = this.storage.getItem(key);
        return lead ? JSON.parse(lead) : null;
      })
      .filter(
        (lead) =>
          lead &&
          (!filter.query ||
            lead.fullName.toLowerCase().includes(filter.query.toLowerCase()))
      );
  }
}

export default BrowserStorageLeadDataSource;
