import { FilterDto } from "@packages/customer-acquisition";
import { DataSourcePort } from "@packages/customer-acquisition/application";

interface DbData {
  id?: string;
  fullName: string;
}

class IndexedDbDataSource<T extends DbData> implements DataSourcePort<T> {
  constructor(private storage: LocalForage) {}

  async save(data: T) {
    if (!data.id) {
      throw new Error("Id is required");
    }

    await this.storage.setItem(data.id as string, data);
  }

  async find(id: string): Promise<T> {
    return this.storage.getItem(id).then((lead) => (lead as T) || null);
  }

  async filter(filter: FilterDto): Promise<T[]> {
    const data: T[] = [];

    await this.storage.iterate((lead: T) => {
      if (
        !filter.query ||
        lead.fullName.toLowerCase().includes(filter.query.toLowerCase())
      ) {
        data.push(lead);
      }
    });

    return data;
  }
}

export default IndexedDbDataSource;
