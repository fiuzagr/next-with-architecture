import { GenericError, UnknownError } from "@packages/shared";
import { useCallback, useEffect, useState } from "react";

type QueryHandler<Output> = () => Promise<Output>;

type QueryHookResult<Output> = [
  {
    error?: string;
    data?: Output;
    loading: boolean;
  },
  () => Promise<Output | undefined>
];

export const useQuery = <Input, Output>(
  handler: QueryHandler<Output>,
  { lazy }: { lazy?: boolean } = { lazy: false }
): QueryHookResult<Output> => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<Output>();
  const [loading, setLoading] = useState<boolean>(true);

  const query = useCallback(async (): Promise<Output | undefined> => {
    let queryData = undefined;

    try {
      queryData = await handler();
      setData(queryData);
      setError(undefined);
    } catch (queryError) {
      console.error(queryError);

      const errorMessage =
        queryError instanceof GenericError
          ? queryError.toString()
          : new UnknownError().toString();

      setError(errorMessage);
    }

    setLoading(false);

    return queryData;
  }, [handler]);

  useEffect(() => {
    if (!lazy) {
      query();
    }
  }, [lazy, query]);

  return [
    {
      error,
      data,
      loading,
    },
    query,
  ];
};
