import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

function row(id, extra = {}) {
  return {
    id,
    statusId: 1,
    employeeStatus: 1,
    ...extra,
  };
}

const prevMonth = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  d.setDate(15);
  return d.toISOString();
};

/** Super admin — company list grid */
export const MOCK_COMPANIES_VIEW = [1, 2, 3, 4].map((id) =>
  row(id, {
    companyId: id,
    fullName: id === 1 ? 'Demo Technologies Pvt Ltd' : `Demo Company ${id}`,
    code: `CO-${100 + id}`,
    registrationId: `REG-${2000 + id}`,
    countryId: 1,
    stateId: 1,
    cityId: 1,
    countryName: 'Pakistan',
    stateName: 'Sindh',
    cityName: 'Karachi',
    officeNo: `021-${3000000 + id}`,
    officeEmail: `office${id}@demo.local`,
    username: id === 1 ? 'company' : `company${id}`,
  })
);

/** HRMS payment view (super admin) */
export const MOCK_HRMS_PAYMENT_ROWS = [1, 2, 3, 4, 5].map((id) =>
  row(id, {
    companyName: 'Demo Technologies Pvt Ltd',
    employeeName: _mock.fullName(id),
    employeeCode: `EMP-${1000 + id}`,
    hrmsFee: 5000,
    employeeNetSalary: 72000 + id * 1500,
    totalSalary: 77000 + id * 1500,
    attendanceDeduction: id * 1000,
    previousMonthAbsent: id % 3,
    bonusAmount: id === 1 ? 3000 : 0,
    paymentStatus: id % 3 === 0 ? 'p' : id % 3 === 1 ? 'np' : 'od',
    paymentDate: id % 2 === 0 ? prevMonth() : null,
  })
);

/** Employee salary info */
export const MOCK_EMPLOYEE_SALARY_ROWS = [1, 2, 3].map((id) =>
  row(id, {
    candidateId: id,
    companyName: 'Demo Technologies Pvt Ltd',
    employeeNetSalary: 75000 + id * 2000,
    attendanceDeduction: id * 800,
    previousMonthAbsent: id % 2,
    bonusAmount: 2000,
    paymentStatus: id === 1 ? 'p' : 'np',
    paymentDate: new Date().toISOString(),
  })
);

export const MOCK_EMPLOYEE_SALARY_SLIP = {
  companyName: 'Demo Technologies Pvt Ltd',
  employeeName: _mock.fullName(1),
  employeeCode: 'EMP-1001',
  payPeriod: 'May 2026',
  grossSalary: 85000,
  deductions: 5000,
  netSalary: 80000,
  paymentDate: new Date().toISOString(),
  bankName: 'Habib Bank Limited',
  bankAccountNumber: 'PK00123456789012',
};

/** HRMS payment info (bank setup for super admin Bank page) */
export const MOCK_HRMS_ACCOUNT_LIST = [
  row(1, {
    hrmsPaymentId: 1,
    bankName: 'Habib Bank Limited',
    bankCountry: 'Pakistan',
    bankAccountNumberString: 'PK00987654321000',
    iBAN: 'PK00HABB00987654321000',
    bankAccountHolderName: 'Employee Ease HRMS',
    routingNumber: '012345',
    statusId: 1,
  }),
];

/** Richer schedule interviews */
export const MOCK_SCHEDULE_INTERVIEWS_FULL = [1, 2, 3, 4].map((id) =>
  row(id, {
    scheduleInterviewId: id,
    candidateName: _mock.fullName(id),
    candidateId: id,
    interviewerName: _mock.fullName(id + 2),
    interviewDate: new Date().toISOString(),
    interviewTime: '10:30 AM',
    scheduleTime: `2026-05-${10 + id} 10:30 AM`,
    jobTitle: _mock.jobTitle(id),
    maxSalary: 90000 + id * 5000,
    minSalary: 60000 + id * 3000,
    phoneNumber: _mock.phoneNumber(id),
    approvalStatus: id % 2 === 0 ? 'Approved' : 'Pending',
    status: id === 1 ? 'Scheduled' : 'Completed',
    meetingLink: 'https://meet.example.com/demo',
  })
);

/** Outsource candidates */
export const MOCK_OUTSOURCE_CANDIDATES_FULL = [1, 2, 3, 4, 5].map((id) =>
  row(id, {
    candidateId: id,
    fullName: _mock.fullName(id),
    email: _mock.email(id),
    phoneNumber: _mock.phoneNumber(id),
    status: 'Active',
    averagePerformanceScore: 70 + id * 4,
    companyName: 'Demo Technologies Pvt Ltd',
    username: `outsource_${id}`,
  })
);

/** Interview panel with panel fields */
export const MOCK_INTERVIEW_PANEL_FULL = [1, 2, 3].map((id) =>
  row(id, {
    interviewPanelId: id,
    panelName: `Panel ${id}`,
    interviewerName: _mock.fullName(id),
    fullName: _mock.fullName(id),
    email: _mock.email(id),
    code: `PNL-${id}`,
    statusId: 1,
  })
);

/** Generic setup row (country, state, city, bank, skill, etc.) */
export function mockSetupRows(prefix, count = 6, idKey = 'id') {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const label = `${prefix} ${id}`;
    return row(id, {
      [idKey]: id,
      countryId: id <= 2 ? 1 : 1,
      stateId: id <= 3 ? 1 : 2,
      cityId: id,
      fullName: label,
      name: label,
      code: `${String(prefix).slice(0, 3).toUpperCase()}-${id}`,
      countryName: 'Pakistan',
      stateName: 'Sindh',
      cityName: 'Karachi',
      bankName: label,
      skillName: label,
      professionName: label,
      designationName: label,
      educationName: label,
      companyTypeName: label,
    });
  });
}
