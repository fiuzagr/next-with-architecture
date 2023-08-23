import { useCallback, useState } from "react";

type MutationHandler<Input, Output> = (input: Input) => Promise<Output>;

type MutationHookResult<Input, Output> = [
  {
    error?: string;
    loading: boolean;
  },
  (input: Input) => Promise<Output | void>
];

export const useMutation = <Input, Output>(
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
      } catch (mutationError) {
        console.error(mutationError);
        setError((mutationError as Error).message);
      }

      setLoading(false);

      return mutateData;
    },
    [handler]
  );

  return [
    {
      error,
      loading,
    },
    mutate,
  ];
};
