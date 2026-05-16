import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

function row(id, extra = {}) {
  return {
    id,
    statusId: 1,
    employeeStatus: 1,
    createdDate: new Date().toISOString(),
    ...extra,
  };
}

function parseRequestUsername(body, fallback = 'company') {
  if (body == null || body === '') return fallback;
  if (typeof body === 'string') return body.trim() || fallback;
  if (typeof body === 'object' && body.username) return String(body.username).trim() || fallback;
  return fallback;
}

/** Company profile for UserProfileView (company user). */
export function buildMockCompanyProfile(username = 'company') {
  return row(1, {
    companyId: 1,
    companyName: 'Demo Technologies Pvt Ltd',
    username,
    email: `${username}@localhost`,
    phoneNumber: '03001234567',
    address: 'Office 12, Clifton, Karachi',
    industry: 'Information Technology',
    employeeCount: 24,
    countryId: 1,
    stateId: 1,
    cityId: 1,
    fullName: 'Demo Technologies Pvt Ltd',
    code: 'DEMO-CO',
    website: 'https://demo.local',
    about: 'Demo company profile for frontend-only mode.',
  });
}

/** Candidate / employee profile for UserProfileView. */
export function buildMockCandidateProfile(username = 'employee') {
  const displayName = _mock.fullName(1);

  return row(1, {
    candidateId: 1,
    username,
    fullname: displayName,
    fullName: displayName,
    firstName: 'Demo',
    lastName: 'User',
    email: `${username}@localhost`,
    phoneNumber: '03009876543',
    professionId: 1,
    designationId: '1',
    educationId: 1,
    countryId: 1,
    stateId: 1,
    cityId: 1,
    companyId: 1,
    educationInstitute: 'Demo University',
    about: 'HRMS demo profile — edit and save work without a backend in frontend-only mode.',
    experience: '3 years',
    skills: '1,2,3',
    linkedInUrl: 'https://linkedin.com/in/demo-user',
    gitHubUrl: 'https://github.com/demo-user',
    cnic: '42101-1234567-1',
    dateOfBirth: '1995-06-15',
    gender: 'Male',
  });
}

export const MOCK_COMPANY_PAYMENT_ACCOUNT = [
  row(1, {
    companyPaymentId: 1,
    companyId: 1,
    bankName: 'Habib Bank Limited',
    bankCountry: 'Pakistan',
    bankAccountNumberString: 'PK00123456789012',
    iBAN: 'PK00HABB0001234567890123',
    bankAccountHolderName: 'Demo Technologies Pvt Ltd',
    routingNumber: '012345',
    statusId: 1,
  }),
];

export { parseRequestUsername };
