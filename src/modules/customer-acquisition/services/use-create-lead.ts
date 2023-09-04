import { createLeadUseCase } from "@/modules/customer-acquisition/main";
import { useMutation } from "@/modules/shared";
import { CreateLeadRequest } from "@packages/customer-acquisition";

export const useCreateLead = () => {
  return useMutation<CreateLeadRequest>(
    createLeadUseCase.execute.bind(createLeadUseCase)
  );
};
