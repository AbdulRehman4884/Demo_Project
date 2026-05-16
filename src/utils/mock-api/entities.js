import { _mock } from 'src/_mock';

import {
  MOCK_COMPANY_DASHBOARD,
  MOCK_EMPLOYEE_DASHBOARD,
  MOCK_SUPER_DASHBOARD,
} from 'src/utils/mock-portal-credentials';

// ----------------------------------------------------------------------

const now = () => new Date().toISOString();

function row(id, extra = {}) {
  return {
    id,
    statusId: 1,
    employeeStatus: 1,
    createdDate: now(),
    ...extra,
  };
}

export const MOCK_COMPANY_PROFILE = [
  row(1, {
    companyName: 'Demo Technologies Pvt Ltd',
    username: 'company',
    email: 'company.demo@localhost',
    phoneNumber: '03001234567',
    address: 'Karachi, Pakistan',
    industry: 'Information Technology',
    employeeCount: 24,
  }),
];

export const MOCK_COMPANY_EMPLOYEES = [1, 2, 3, 4, 5].map((id) =>
  row(id, {
    fullName: _mock.fullName(id),
    employeeCode: `EMP-${1000 + id}`,
    email: _mock.email(id),
    phoneNumber: _mock.phoneNumber(id),
    cnic: `42101-${1000000 + id}-1`,
    employeeType: id % 2 === 0 ? 'Outsourced' : 'Internal',
    jobTitle: _mock.jobTitle(id),
    designationName: _mock.jobTitle(id),
    approvalStatus: id % 3 === 0 ? 'Pending' : 'Approved',
    averagePerformanceScore: 70 + id * 3,
    baseSalary: 50000 + id * 5000,
    clockInTime: '09:00 AM',
    clockOutTime: '06:00 PM',
    contract: 'Active',
    contractDuration: '12 Months',
    candidateId: id,
    name: _mock.fullName(id),
  })
);

export const MOCK_CANDIDATES = [1, 2, 3, 4, 5, 6].map((id) =>
  row(id, {
    candidateId: id,
    username: `candidate_${id}`,
    firstName: _mock.firstName(id),
    lastName: _mock.lastName(id),
    fullName: _mock.fullName(id),
    email: _mock.email(id),
    phoneNumber: _mock.phoneNumber(id),
    professionName: 'Software Engineer',
    designationName: 'Developer',
    status: 'Active',
    interviewStatus: id % 2 === 0 ? 'Scheduled' : 'Completed',
  })
);

export const MOCK_OUTSOURCE_CANDIDATES = MOCK_CANDIDATES.map((c) => ({
  ...c,
  companyName: 'Demo Technologies Pvt Ltd',
  outsourced: true,
}));

export const MOCK_ATTENDANCE_EMPLOYEES = MOCK_COMPANY_EMPLOYEES.map((e) => ({
  candidateId: e.candidateId,
  name: e.fullName,
  role: e.jobTitle,
  ids: e.id,
}));

export const MOCK_ATTENDANCE_CHECK = {
  1: { attendanceId: 101, status: 'P', attendanceDate: now() },
  2: { attendanceId: 102, status: 'P', attendanceDate: now() },
  3: { attendanceId: 103, status: 'A', attendanceDate: now() },
};

export const MOCK_ATTENDANCE_HISTORY = [1, 2, 3].map((id) => ({
  id,
  candidateId: id,
  attendanceDate: now(),
  day: 'Monday',
  status: id === 3 ? 'Absent' : 'Present',
}));

export const MOCK_LOOKUP = (prefix, count = 8) =>
  Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    return row(id, {
      name: `${prefix} ${id}`,
      title: `${prefix} ${id}`,
      description: _mock.description(id),
      countryName: 'Pakistan',
      stateName: 'Sindh',
      cityName: 'Karachi',
      skillName: `Skill ${id}`,
      professionName: `Profession ${id}`,
      designationName: `Designation ${id}`,
      educationName: `Degree ${id}`,
      bankName: `Bank ${id}`,
      companyTypeName: `Type ${id}`,
    });
  });

export const MOCK_SCHEDULE_INTERVIEWS = [1, 2, 3].map((id) =>
  row(id, {
    candidateName: _mock.fullName(id),
    interviewerName: _mock.fullName(id + 2),
    interviewDate: now(),
    interviewTime: '10:30 AM',
    jobTitle: _mock.jobTitle(id),
    status: id === 1 ? 'Scheduled' : 'Completed',
    meetingLink: 'https://meet.example.com/demo',
  })
);

export const MOCK_INTERVIEW_PANEL = [1, 2, 3].map((id) =>
  row(id, {
    panelName: `Panel ${id}`,
    interviewerName: _mock.fullName(id),
    email: _mock.email(id),
  })
);

export const MOCK_JOB_DESCRIPTIONS = [1, 2].map((id) =>
  row(id, {
    jobTitle: _mock.jobTitle(id),
    department: 'Engineering',
    experience: `${id + 1} years`,
    description: _mock.description(id),
  })
);

export {
  MOCK_PERFORMANCE_QUESTIONS,
  MOCK_PERFORMANCE_WEIGHTS,
  MOCK_PERFORMANCE_EVALUATION_ROWS,
  MOCK_PERFORMANCE_TEAMS,
  MOCK_EMPLOYEE_FORM_DATA,
  MOCK_SELF_EVALUATION_FORM,
  MOCK_PAST_EVALUATIONS,
  MOCK_PERFORMANCE_REPORT,
  MOCK_TEAM_LEAD_CREDENTIAL,
} from './performance-data';

export const MOCK_PAYROLL_ROWS = [1, 2, 3, 4].map((id) =>
  row(id, {
    employeeName: _mock.fullName(id),
    month: 'May',
    year: 2026,
    grossSalary: 80000 + id * 2000,
    netSalary: 72000 + id * 1800,
    paymentStatus: id % 2 === 0 ? 'Paid' : 'Pending',
  })
);

export const MOCK_FACIAL_EMPLOYEES = MOCK_COMPANY_EMPLOYEES.map((e) => ({
  ...e,
  employeeId: e.id,
  registered: e.id % 2 === 0,
  isFaceRegistered: e.id % 2 === 0,
  employeeName: e.fullName,
}));

export const MOCK_DASHBOARD = {
  super: MOCK_SUPER_DASHBOARD,
  company: MOCK_COMPANY_DASHBOARD,
  employee: MOCK_EMPLOYEE_DASHBOARD,
};

export { MOCK_COMPANY_DASHBOARD, MOCK_EMPLOYEE_DASHBOARD, MOCK_SUPER_DASHBOARD };
