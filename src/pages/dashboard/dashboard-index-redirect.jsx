import { Navigate } from 'react-router-dom';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

function getDashboardPathForRole(userType) {
  if (userType === 'co') {
    return paths.dashboard.general.companyDashboard;
  }
  if (userType === 'sa') {
    return paths.dashboard.general.superDashboard;
  }
  if (
    ['Candidate_interview', 'Candidate_Performance', 'Candidate_interview_Performance', 'cj'].includes(
      userType
    )
  ) {
    return paths.dashboard.general.employeeDashboard;
  }
  if (userType === 'rc') {
    return paths.dashboard.setup.CreateCandidate;
  }
  return paths.dashboard.general.companyDashboard;
}

export default function DashboardIndexRedirect() {
  const userType = sessionStorage.getItem('userType') || '';

  return <Navigate to={getDashboardPathForRole(userType)} replace />;
}
