import {
  CreateLeadRequest,
  LeadDTO,
  UpdateLeadRequest,
} from "@packages/customer-acquisition";
import { MutationResult, useMutation } from "@/modules/shared";
import {
  createLeadUseCase,
  updateLeadUseCase,
} from "@/modules/customer-acquisition/main";

const useUpdateLead = () => {
  return useMutation<UpdateLeadRequest>(
    updateLeadUseCase.execute.bind(updateLeadUseCase)
  );
};

const useCreateLead = () => {
  return useMutation<CreateLeadRequest>(
    createLeadUseCase.execute.bind(createLeadUseCase)
  );
};

export const useSaveLead = (): MutationResult<LeadDTO> => {
  const [
    { error: createLeadError, loading: createLeadLoading },
    handleCreateLead,
  ] = useCreateLead();

  const [
    { error: updateLeadError, loading: updateLeadLoading },
    handleUpdateLead,
  ] = useUpdateLead();

  const handleCreateOrUpdateLead = async (lead: LeadDTO) => {
    if (lead.id) {
      await handleUpdateLead({ data: lead } as UpdateLeadRequest);
    } else {
      await handleCreateLead({ data: lead } as CreateLeadRequest);
    }
  };

  return [
    {
      error: createLeadError ?? updateLeadError,
      loading: createLeadLoading || updateLeadLoading,
    },
    handleCreateOrUpdateLead,
  ];
};
