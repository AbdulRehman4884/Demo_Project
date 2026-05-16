import useSWR, { mutate } from 'swr';
import { useMemo, useCallback } from 'react';

import { fetcherPost, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOpts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

export function useGetTeamLeadEvaluationRecords() {
  const URL = endpoints.PerformanceEvaluation.getTeamLeadEvaluationRecords;
  const username = sessionStorage.getItem('username');
  const key = username ? [URL, username, 'team-lead-eval'] : null;

  const { data, error, isValidating } = useSWR(key, () => fetcherPost(URL, username, {}), swrOpts);

  const TeamLeadEvaluationRecords = useCallback(
    () => fetcherPost(URL, username, {}),
    [URL, username]
  );

  return {
    TeamLeadEvaluationRecords,
    records: data,
    isSubmitting: isValidating,
    submitError: error,
    submitData: data,
  };
}

export function useGetAllCurrentEvaluationRecords() {
  const URL = endpoints.PerformanceEvaluation.getAllCurrentEvaluationRecords;
  const username = sessionStorage.getItem('username');
  const key = username ? [URL, username, 'current-eval'] : null;

  const { data, error, isValidating } = useSWR(key, () => fetcherPost(URL, username, {}), swrOpts);

  const AllCurrentEvaluationRecords = useCallback(
    () => fetcherPost(URL, username, {}),
    [URL, username]
  );

  return {
    AllCurrentEvaluationRecords,
    records: data,
    isSubmitting: isValidating,
    submitError: error,
    submitData: data,
  };
}

export function useGetAllEvaluationRecords() {
  const URL = endpoints.PerformanceEvaluation.getAllPerformanceSubmissions;
  const username = sessionStorage.getItem('username');
  const key = username ? [URL, username, 'all-eval'] : null;

  const { data, error, isValidating } = useSWR(key, () => fetcherPost(URL, username), swrOpts);

  const AllEvaluationRecords = useCallback(() => fetcherPost(URL, username), [URL, username]);

  return {
    AllEvaluationRecords,
    records: data,
    isSubmitting: isValidating,
    submitError: error,
    submitData: data,
  };
}

export function useGetSelfEvaluationRecordPost() {
  const URL = endpoints.PerformanceEvaluation.getSelfEvaluationRecord;

  const GetSelfEvaluationRecordPost = useCallback((employeeId) => fetcherPost(URL, employeeId, {}), [URL]);

  return {
    GetSelfEvaluationRecordPost,
  };
}

export function useAddPerformanceEvaluation() {
  const URL = endpoints.PerformanceEvaluation.addOne;

  const submitFormAddEvaluation = useCallback((payload) => fetcherPost(URL, payload), [URL]);

  return {
    submitFormAddEvaluation,
  };
}

export function useGetEmployeeFormData() {
  const URL = endpoints.PerformanceEvaluation.getEmployeeFormData;

  const GetEmployeeFormData = useCallback(async (formPayload) => {
    const date =
      formPayload.date == null ? new Date().toISOString().split('T')[0] : formPayload.date;

    return fetcherPost(URL, { employeeId: formPayload.employeeId, date });
  }, [URL]);

  return {
    GetEmployeeFormData,
  };
}

export function usegetEmployeePerformanceReportData() {
  const URL = endpoints.PerformanceEvaluation.getEmployeePerformanceReportData;

  const EmployeePerformanceReportData = useCallback(
    (reportPayload) => fetcherPost(URL, reportPayload),
    [URL]
  );

  return {
    EmployeePerformanceReportData,
  };
}

export function useUpdateEmployeeFormData() {
  const URL = endpoints.PerformanceEvaluation.updateOne;

  const UpdateEmployeeFormData = useCallback((payload) => fetcherPost(URL, payload), [URL]);

  return {
    UpdateEmployeeFormData,
  };
}
