import useSWR from 'swr';
import { useCallback } from 'react';

import { fetcherPost, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOpts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

export function useAddWeightsOne() {
  const URL = endpoints.performanceWeights.addOne;

  const submitFormAddWeight = useCallback((payload) => fetcherPost(URL, payload), [URL]);

  return {
    submitFormAddWeight,
  };
}

export function useGetQuestionWeights() {
  const URL = endpoints.performanceWeights.getAll;
  const username = sessionStorage.getItem('username');
  const key = username ? [URL, username, 'weights'] : null;

  const { data, error, isValidating } = useSWR(
    key,
    () => fetcherPost(URL, username),
    swrOpts
  );

  const GetQuestionWeights = useCallback(async () => {
    if (data) {
      return data;
    }
    return fetcherPost(URL, username);
  }, [URL, username, data]);

  return {
    GetQuestionWeights,
    weights: data,
    isSubmitting: isValidating,
    submitError: error,
    submitData: data,
  };
}

export function useUpdateWeights() {
  const URL = endpoints.performanceWeights.updateOne;

  const updateWeightages = useCallback((payload) => fetcherPost(URL, payload), [URL]);

  return {
    updateWeightages,
  };
}
