import { GenericError, UnknownError } from "@packages/core";
import { useCallback, useEffect, useRef, useState } from "react";

type QueryHandler<Output> = () => Promise<Output>;

type QuerySettings = {
  lazy?: boolean;
};

export type QueryResult<Output> = [
  {
    error?: string;
    data?: Output;
    loading: boolean;
  },
  () => Promise<Output | undefined>
];

export const useQuery = <Output>(
  handler: QueryHandler<Output>,
  querySettings: QuerySettings = { lazy: false }
): QueryResult<Output> => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<Output>();
  const [loading, setLoading] = useState<boolean>(true);
  const settings = useRef<QuerySettings>(querySettings);
  const called = useRef<boolean>(false);

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
    if (!settings.current.lazy && !called.current) {
      called.current = true;
      query();
    }
  }, [query]);

  return [
    {
      error,
      data,
      loading,
    },
    query,
  ];
};
