import { useCallback, useState } from "react";

type MutationHandler<Input, Output> = (input: Input) => Promise<Output>;

type MutationHookResult<Input, Output> = [
  (input: Input) => Promise<Output | void>,
  {
    error?: string;
    loading: boolean;
  }
];

const useMutation = <Input, Output>(
  handler: MutationHandler<Input, Output>
): MutationHookResult<Input, Output> => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = useCallback(
    async (input: Input): Promise<Output | void> => {
      let mutateData: Output | void;

      setLoading(true);

      try {
        mutateData = await handler(input);
        setError(undefined);
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      }

      setLoading(false);

      return mutateData;
    },
    [handler]
  );

  return [
    mutate,
    {
      error,
      loading,
    },
  ];
};

export default useMutation;
