import type { NextApiRequest, NextApiResponse } from "next";
import { filterLeadsUseCase } from "@/modules/customer-acquisition/main";
import { LeadDTO } from "@packages/customer-acquisition";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<LeadDTO[]>
) {
  const response = await filterLeadsUseCase.execute({
    data: {
      query: "",
      offset: 0,
      limit: 10,
    },
  });

  const HTTP_OK = 200;
  res.status(HTTP_OK).json(response.data.leads);
}
