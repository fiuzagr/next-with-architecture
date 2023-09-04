import { useCallback, useState } from "react";

type MutationHandler<Input, Output> = (input: Input) => Promise<Output>;

export type MutationResult<Input, Output = void> = [
  {
    error?: string;
    loading: boolean;
  },
  (input: Input) => Promise<Output | void>
];

export const useMutation = <Input, Output = void>(
  handler: MutationHandler<Input, Output>
): MutationResult<Input, Output> => {
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
