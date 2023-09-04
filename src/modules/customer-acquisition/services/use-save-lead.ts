import {
  CreateLeadRequest,
  LeadDTO,
  UpdateLeadRequest,
} from "@packages/customer-acquisition";
import { useCreateLead, useUpdateLead } from "@/modules/customer-acquisition";
import { MutationResult } from "@/modules/shared";

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
