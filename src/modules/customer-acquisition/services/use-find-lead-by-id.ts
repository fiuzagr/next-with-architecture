import { findLeadByIdUseCase } from "@/modules/customer-acquisition/main";
import { useQuery } from "@/modules/shared";
import {
  FindLeadByIdRequest,
  FindLeadByIdResponse,
} from "@packages/customer-acquisition";

export const useFindLeadById = (id: string) => {
  return useQuery<FindLeadByIdRequest, FindLeadByIdResponse>(() =>
    findLeadByIdUseCase.execute({ data: { id } })
  );
};
