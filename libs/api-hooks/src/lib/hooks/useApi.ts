import { useState } from "react";
import { useApiStatus } from "./useApiStatus";
import { ERROR, PENDING, SUCCESS } from '../apiStatus';

type ApiFunction<Args extends unknown[], Data> = (...args: Args) => Promise<Data>;

type UseApiReturnType<Args extends unknown[], Data> = {
  data: Data | null;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
  apiStatus: string;
  setApiStatus: React.Dispatch<React.SetStateAction<string>>;
  error: Error | null;
  exec: (...args: Args) => Promise<{ data: Data | null; error: Error | null }>;
  normalisedStatuses: ReturnType<typeof useApiStatus>;
};

type UseApiConfig<Data> = {
  initialData?: Data;
};

export function useApi<Args extends unknown[], Data = unknown>(
  fn: ApiFunction<Args, Data>,
  config: UseApiConfig<Data> = {}
): UseApiReturnType<Args, Data> { // Here pass Args
  const { initialData } = config;
  const [data, setData] = useState<Data | null>(initialData || null);
  const [error, setError] = useState<Error | null>(null);
  const { apiStatus, setApiStatus, ...normalisedStatuses } = useApiStatus();

  const exec = async (...args: Args): Promise<{ data: Data | null; error: Error | null }> => {
    try {
      setError(null);
      setApiStatus(PENDING);
      const response = await fn(...args);
      setData(response);
      setApiStatus(SUCCESS);
      return {
        data: response,
        error: null,
      };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObj);
      setApiStatus(ERROR);
      return {
        error: errorObj,
        data: null,
      };
    }
  };

  return {
    data,
    setData,
    apiStatus,
    setApiStatus,
    error,
    exec,
    normalisedStatuses,
  };
}
