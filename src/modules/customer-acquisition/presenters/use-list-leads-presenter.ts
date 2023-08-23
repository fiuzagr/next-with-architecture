import { LeadDTO } from "@packages/customer-acquisition";
import { cpfFormatter } from "@/modules/shared";

export const useListLeadsPresenter = (leads: LeadDTO[] | undefined) => {
  return leads
    ? leads.map((lead) => ({
        id: lead.id as string,
        fullName: lead.fullName.toUpperCase(),
        cpf: cpfFormatter(lead.cpf),
        email: lead.email.toLowerCase(),
        hasSomething: !!Math.round(Math.random()),
      }))
    : [];
};
