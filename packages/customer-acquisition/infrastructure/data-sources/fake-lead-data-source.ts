import { FilterDto, LeadDTO } from "@packages/customer-acquisition";
import { DataSourcePort } from "@packages/customer-acquisition/application";

const timeoutDelay = 1000;

export class FakeLeadDataSource implements DataSourcePort<LeadDTO> {
  async save(lead: LeadDTO) {
    console.debug("Saved lead", lead);
  }

  async find(id: string): Promise<LeadDTO> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: id,
          fullName: "Full Name",
          cpf: "01234567800",
          email: "email@test.com",
        });
      }, timeoutDelay);
    });
  }

  async filter(_filter: FilterDto): Promise<LeadDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            fullName: "Full Name",
            cpf: "01234567800",
            email: "email@test.com",
          },
          {
            id: "2",
            fullName: "Another Full Name",
            cpf: "00123456789",
            email: "email@another.test.com",
          },
        ]);
      }, timeoutDelay);
    });
  }
}

export default FakeLeadDataSource;
