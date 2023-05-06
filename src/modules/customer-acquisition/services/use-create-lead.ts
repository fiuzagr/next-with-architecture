import { createLeadUseCase } from "@/modules/customer-acquisition/main";
import { useMutation } from "@/modules/shared";
import { CreateLeadDto } from "@packages/customer-acquisition";

const useCreateLead = () => {
  return useMutation<CreateLeadDto, void>(
    createLeadUseCase.execute.bind(createLeadUseCase)
  );
};

export default useCreateLead;
