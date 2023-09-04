import { findLeadByIdUseCase } from "@/modules/customer-acquisition/main";
import { useQuery } from "@/modules/shared";
import { FindLeadByIdResponse } from "@packages/customer-acquisition";

export const useFindLeadById = (id: string) => {
  return useQuery<FindLeadByIdResponse>(() =>
    findLeadByIdUseCase.execute({ data: { id } })
  );
};
