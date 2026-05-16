import useSWR from 'swr';
import { useCallback } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetAllPerformanceQuestions() {
  const URL = endpoints.performanceQuestion.getPerformanceQuestionView;

  const { data, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const PerformanceQuestions = useCallback(async () => {
    if (data) {
      return data;
    }
    return fetcher(URL);
  }, [URL, data]);

  return {
    PerformanceQuestions,
    questions: data,
    isSubmitting: isValidating,
    submitError: error,
    submitData: data,
  };
}
