import { GenericError, UnknownError } from "@packages/shared";
import { useCallback, useEffect, useState } from "react";

type QueryHandler<Output> = () => Promise<Output>;

type QueryHookResult<Output> = [
  () => Promise<Output | undefined>,
  {
    error?: string;
    data?: Output;
    loading: boolean;
  }
];

const useQuery = <Input, Output>(
  handler: QueryHandler<Output>,
  { lazy }: { lazy?: boolean } = { lazy: false }
): QueryHookResult<Output> => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<Output>();
  const [loading, setLoading] = useState<boolean>(true);

  const query = useCallback(async (): Promise<Output | undefined> => {
    let data = undefined;

    try {
      data = await handler();
      setData(data);
      setError(undefined);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error instanceof GenericError
          ? error.toString()
          : new UnknownError().toString();

      setError(errorMessage);
    }

    setLoading(false);

    return data;
  }, [handler]);

  useEffect(() => {
    if (!lazy) query();
  }, [lazy, query]);

  return [
    query,
    {
      error,
      data,
      loading,
    },
  ];
};

export default useQuery;
