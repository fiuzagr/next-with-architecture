import { updateLeadUseCase } from "@/modules/customer-acquisition/main";
import { useMutation } from "@/modules/shared";
import { UpdateLeadRequest } from "@packages/customer-acquisition";

export const useUpdateLead = () => {
  return useMutation<UpdateLeadRequest>(
    updateLeadUseCase.execute.bind(updateLeadUseCase)
  );
};
