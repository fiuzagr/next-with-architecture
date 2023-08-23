import { FilterDto } from "@packages/customer-acquisition";

export interface DataSourcePort<Dto> {
  save(data: Dto): Promise<void>;

  find(id: string): Promise<Dto>;

  filter(filter: FilterDto): Promise<Dto[]>;
}
