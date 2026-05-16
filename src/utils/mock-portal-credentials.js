// Frontend-only demo users (no API). Passwords are local placeholders only.
// `userType` matches backend routing in jwt-login-view (co, sa, rc, cj, etc.).

export const USE_FRONTEND_ONLY_AUTH = true;

function base64UrlEncodeJson(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/** Unsigned-style JWT shape; client only checks payload.exp and fields used in auth-provider. */
export function createUnsignedMockJwt({ username, role }) {
  const header = base64UrlEncodeJson({ alg: 'none', typ: 'JWT' });
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
  const payload = base64UrlEncodeJson({ username, role, exp });
  return `${header}.${payload}.frontend-mock`;
}

export const MOCK_PORTAL_USERS = [
  {
    username: 'company',
    password: 'company123',
    userType: 'co',
    email: 'company.demo@localhost',
  },
  {
    username: 'superadmin',
    password: 'super123',
    userType: 'sa',
    email: 'super.demo@localhost',
  },
  {
    username: 'employee',
    password: 'employee123',
    userType: 'cj',
    email: 'employee.demo@localhost',
  },
  {
    username: 'teamlead',
    password: 'teamlead123',
    userType: 'pe',
    email: 'teamlead.demo@localhost',
  },
  {
    username: 'newcandidate',
    password: 'candidate123',
    userType: 'rc',
    email: 'newuser.demo@localhost',
  },
];

export function findMockPortalUser(username, password) {
  const u = String(username || '').trim();
  const p = String(password || '');
  return MOCK_PORTAL_USERS.find((row) => row.username === u && row.password === p) || null;
}

// Shown on dashboards when backend is off (frontend-only demo).
export const MOCK_COMPANY_DASHBOARD = {
  totalEmployee: 24,
  totalActiveJob: 8,
  totalPerformanceLeads: 3,
  totalInterviewPanel: 5,
  dailyAttendance: [
    { label: 'Present', value: 18 },
    { label: 'Absent', value: 6 },
  ],
  paymentStatus: [
    { status: 'Pending', quantity: 4, value: 40 },
    { status: 'Paid', quantity: 16, value: 60 },
    { status: 'Due', quantity: 2, value: 10 },
  ],
  scheduledData: [
    { label: 'Scheduled', value: 12 },
    { label: 'Completed', value: 8 },
    { label: 'Cancelled', value: 2 },
  ],
  lineGraphData: [
    {
      year: new Date().getFullYear(),
      data: [
        {
          name: 'Employee',
          data: [2, 4, 3, 5, 6, 4, 7, 8, 6, 5, 4, 3],
        },
      ],
    },
  ],
};

export const MOCK_SUPER_DASHBOARD = {
  totalEmployee: 340,
  totalNotHired: 45,
  totalHired: 295,
};

export const MOCK_EMPLOYEE_DASHBOARD = {
  companyname: 'Demo Company',
  currentSalary: 85000,
  performanceAverageScore: 78,
  ScheduleInfo: [
    { label: 'Completed', value: 3 },
    { label: 'Upcoming', value: 2 },
  ],
  scheduleInfo: [
    { label: 'Completed', value: 3 },
    { label: 'Upcoming', value: 2 },
  ],
  barGraphData: [
    { name: 'Present', data: [18, 20, 19, 21, 20, 22, 21, 19, 20, 18, 19, 20] },
    { name: 'Absent', data: [2, 1, 2, 1, 2, 0, 1, 2, 1, 2, 1, 1] },
  ],
};
