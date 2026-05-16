import useSWR, { mutate } from 'swr';
import { useMemo, useCallback } from 'react';

import { fetcherPost, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOpts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

export function useGetAllJobDescriptions() {
  const URL = endpoints.jobDescripton.getByUsername;
  const username = sessionStorage.getItem('username');
  const key = username ? [URL, username, 'job-descriptions'] : null;

  const { data, isLoading, error, isValidating } = useSWR(
    key,
    () => fetcherPost(URL, username),
    swrOpts
  );

  const refetchData = useCallback(async () => {
    await mutate(key);
  }, [key]);

  const memoizedValue = useMemo(
    () => ({
      jobDescriptonList: data?.data?.filter((item) => item.statusId !== 2) || [],
      jobDescriptonLoading: isLoading,
      errors: error,
      validation: isValidating,
      refetchData,
    }),
    [data?.data, error, isLoading, isValidating, refetchData]
  );

  return memoizedValue;
}

export function useAddOne() {
  const URL = endpoints.jobDescripton.addOne;

  const submitFormAdd = async (payload) => fetcherPost(URL, payload);

  return {
    submitFormAdd,
  };
}

export function useFilterCandidates() {
  const URL = endpoints.jobDescripton.filterCandidate;

  const FilterCandidate = async (payload) => fetcherPost(URL, payload);

  return {
    FilterCandidate,
  };
}

export function useUpdateOne() {
  const URL = endpoints.jobDescripton.updateOne;

  const submitFormUpdate = async (payload) => fetcherPost(URL, payload);

  return {
    submitFormUpdate,
  };
}
