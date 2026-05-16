import useSWR, { mutate } from 'swr';
import { useMemo, useCallback } from 'react';

import { fetcher, fetcherPost, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetSuperDashboard() {
  const URL = endpoints.dashboard.superDashboard;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const refetchData = useCallback(async () => {
    await mutate(URL);
  }, [URL]);

  const memoizedValue = useMemo(
    () => ({
      dashboardData: data?.data?.[0] || {},
      countryLoading: isLoading,
      errors: error,
      validation: isValidating,
      refetchData,
    }),
    [data?.data, error, isLoading, isValidating, refetchData]
  );

  return memoizedValue;
}

export function useGetCompanyDashboard() {
  const URL = endpoints.dashboard.companyDashboard;

  const username = sessionStorage.getItem('username');

  const { data, isLoading, error, isValidating } = useSWR(
    username ? [URL, username] : null,
    () => fetcherPost(URL, username),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const refetchData = useCallback(async () => {
    await mutate([URL, username]);
  }, [URL, username]);

  const memoizedValue = useMemo(
    () => ({
      companyDashboardData: data?.data?.[0] || {},
      countryLoading: isLoading,
      errors: error,
      validation: isValidating,
      refetchData,
    }),
    [data?.data, error, isLoading, isValidating, refetchData]
  );

  return memoizedValue;
}

export function useGetEmployeeDashboard() {
  const URL = endpoints.dashboard.EmployeeDashboard;

  const username = sessionStorage.getItem('username');

  const { data, isLoading, error, isValidating } = useSWR(
    username ? [URL, username] : null,
    () => fetcherPost(URL, username),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const refetchData = useCallback(async () => {
    await mutate([URL, username]);
  }, [URL, username]);

  const memoizedValue = useMemo(
    () => ({
      EmployeeDashboardData: data?.data?.[0] || {},
      countryLoading: isLoading,
      errors: error,
      validation: isValidating,
      refetchData,
    }),
    [data?.data, error, isLoading, isValidating, refetchData]
  );

  return memoizedValue;
}
