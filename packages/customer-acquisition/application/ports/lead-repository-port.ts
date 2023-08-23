import { Lead } from "@packages/customer-acquisition/application/domain";

export interface LeadRepositoryPort {
  save(lead: Lead): Promise<void>;

  find(id: string): Promise<Lead>;
}
