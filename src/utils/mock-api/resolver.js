import { ok, okRaw, okNum } from './responses';
import {
  MOCK_ATTENDANCE_CHECK,
  MOCK_ATTENDANCE_EMPLOYEES,
  MOCK_ATTENDANCE_HISTORY,
  MOCK_CANDIDATES,
  MOCK_COMPANY_EMPLOYEES,
  MOCK_COMPANY_PROFILE,
  MOCK_DASHBOARD,
  MOCK_FACIAL_EMPLOYEES,
  MOCK_INTERVIEW_PANEL,
  MOCK_JOB_DESCRIPTIONS,
  MOCK_LOOKUP,
  MOCK_OUTSOURCE_CANDIDATES,
  MOCK_PAYROLL_ROWS,
  MOCK_PERFORMANCE_QUESTIONS,
  MOCK_PERFORMANCE_TEAMS,
  MOCK_SCHEDULE_INTERVIEWS,
} from './entities';

// ----------------------------------------------------------------------

export function normalizeApiPath(url) {
  const raw = String(url || '');
  try {
    const parsed = new URL(raw, 'http://localhost:5161');
    return parsed.pathname.toLowerCase();
  } catch {
    return raw.split('?')[0].toLowerCase();
  }
}

function isWriteMethod(method = 'GET') {
  const m = String(method).toUpperCase();
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(m);
}

// ----------------------------------------------------------------------

export function resolveMockApiResponse(url, method = 'GET', body) {
  const path = normalizeApiPath(url);
  const write = isWriteMethod(method);

  // Dashboards
  if (path.includes('/hrmsdashboard/gethrmsdashboarddata')) {
    return ok([MOCK_DASHBOARD.super]);
  }
  if (path.includes('/hrmsdashboard/getcompanydashboarddata')) {
    return ok([MOCK_DASHBOARD.company]);
  }
  if (path.includes('/hrmsdashboard/getemployeedashboarddata')) {
    return ok([MOCK_DASHBOARD.employee]);
  }

  // Company / candidate profiles
  if (path.includes('/company/getcompanybyusername') || path.includes('/company/getcompanyview')) {
    return ok(MOCK_COMPANY_PROFILE);
  }
  if (path.includes('/candidate/getcandidatebyusername')) {
    return ok([MOCK_CANDIDATES[0]]);
  }
  if (path.includes('/candidate/getcandidatebyid')) {
    return ok([MOCK_CANDIDATES[0]]);
  }
  if (path.includes('/candidate/getoutsourcedemployeedetail')) {
    return ok(MOCK_OUTSOURCE_CANDIDATES);
  }
  if (path.includes('/candidate/getall')) {
    return ok(MOCK_CANDIDATES);
  }

  // Company employees
  if (
    path.includes('/companyemployee/getcompanyemployeesview') ||
    path.includes('/companyemployee/getcompanyinternalemployeesview') ||
    path.includes('/companyemployee/getcompanyonboardingemployee') ||
    path.includes('/performanceevaluationteam/getcompanyemployeesview')
  ) {
    return ok(MOCK_COMPANY_EMPLOYEES);
  }
  if (path.includes('/companyemployee/getall')) {
    return ok(MOCK_COMPANY_EMPLOYEES);
  }

  // Attendance
  if (path.includes('/addattendance/getbyusername')) {
    return ok(MOCK_ATTENDANCE_EMPLOYEES);
  }
  if (path.includes('/addattendance/getallbycompanyusername')) {
    return ok(MOCK_ATTENDANCE_HISTORY);
  }
  if (path.includes('/addattendance/checkattendance/check')) {
    return okRaw(MOCK_ATTENDANCE_CHECK);
  }
  if (path.includes('/addattendance/getallcandidateattendancerecord')) {
    return ok(MOCK_ATTENDANCE_HISTORY);
  }

  // Facial recognition
  if (path.includes('/attendancefacialrecognition/getoutsourcedcompanyemployee')) {
    return ok(MOCK_FACIAL_EMPLOYEES);
  }
  if (path.includes('/facialrecognition/takeattendance')) {
    return okNum({
      employeeName: MOCK_COMPANY_EMPLOYEES[0].fullName,
      clockInTime: new Date().toISOString(),
    });
  }
  if (path.includes('/facialrecognition/registeremployee')) {
    return okNum({}, 'Face registered successfully');
  }

  // Interviews & jobs
  if (path.includes('/scheduleinterview/getcompanyscheduleinterviewview')) {
    return ok(MOCK_SCHEDULE_INTERVIEWS);
  }
  if (path.includes('/scheduleinterview/getcandidatescheduleinterviewview')) {
    return ok(MOCK_SCHEDULE_INTERVIEWS);
  }
  if (path.includes('/scheduleinterview/getavailableinterviewers')) {
    return ok(MOCK_INTERVIEW_PANEL);
  }
  if (path.includes('/jobdescription/')) {
    if (write) return okNum({}, 'Job description saved');
    return ok(MOCK_JOB_DESCRIPTIONS);
  }
  if (path.includes('/interviewpanel/')) {
    if (write) return okNum({}, 'Interview panel saved');
    return ok(MOCK_INTERVIEW_PANEL);
  }
  if (path.includes('/interviewquestion/')) {
    return ok(MOCK_PERFORMANCE_QUESTIONS);
  }
  if (path.includes('/interviewfeedback/')) {
    if (write) return okNum({}, 'Feedback saved');
    return ok(MOCK_SCHEDULE_INTERVIEWS);
  }

  // Performance
  if (path.includes('/performancefeedbackquestion/') || path.includes('/performancequestionweightage/')) {
    if (write) return okNum({}, 'Saved successfully');
    return ok(MOCK_PERFORMANCE_QUESTIONS);
  }
  if (path.includes('/performancefeedback/') || path.includes('/employeeselfevaluation/')) {
    if (write) return okNum({}, 'Evaluation saved');
    return ok(MOCK_PERFORMANCE_QUESTIONS);
  }
  if (path.includes('/performanceevaluationteam/')) {
    if (write) return okNum({}, 'Team saved');
    return ok(MOCK_PERFORMANCE_TEAMS);
  }

  // Payroll / payments
  if (
    path.includes('/salarydistribute/') ||
    path.includes('/companypaymentinfo/') ||
    path.includes('/employeepaymentinfo/') ||
    path.includes('/hrmspaymentinfo/') ||
    path.includes('/hrmstoemployeepayment/') ||
    path.includes('/employeesalaryinfo/')
  ) {
    if (write) return okNum({}, 'Payment saved');
    return ok(MOCK_PAYROLL_ROWS);
  }
  if (path.includes('/candidateofferedjob/')) {
    if (write) return okNum({}, 'Offer updated');
    return ok(MOCK_JOB_DESCRIPTIONS);
  }

  // Lookups (country, state, city, bank, etc.)
  if (path.includes('/country/')) return ok(MOCK_LOOKUP('Country'));
  if (path.includes('/state/')) return ok(MOCK_LOOKUP('State'));
  if (path.includes('/city/')) return ok(MOCK_LOOKUP('City'));
  if (path.includes('/bank/')) return ok(MOCK_LOOKUP('Bank'));
  if (path.includes('/skill/')) return ok(MOCK_LOOKUP('Skill'));
  if (path.includes('/profession/')) return ok(MOCK_LOOKUP('Profession'));
  if (path.includes('/designation/')) return ok(MOCK_LOOKUP('Designation'));
  if (path.includes('/education/')) return ok(MOCK_LOOKUP('Education'));
  if (path.includes('/companytype/')) return ok(MOCK_LOOKUP('Company Type'));
  if (path.includes('/employee/getall')) return ok(MOCK_COMPANY_EMPLOYEES);

  // Auth / user profile (forms)
  if (path.includes('/login')) {
    return okNum({ username: 'company', userType: 'co', token: 'mock' });
  }
  if (path.includes('/userprofile/')) {
    if (write) return okNum({}, 'Saved successfully');
    return ok(['demo_user_1', 'demo_user_2']);
  }

  // Resume / mindee / offer letter
  if (path.includes('/mindee/') || path.includes('/offerletter')) {
    return okNum({ jobId: 'mock-job-1', status: 'completed' });
  }

  // Email
  if (path.includes('/email/')) {
    return okNum({}, 'Email sent');
  }

  // Template / excel
  if (path.includes('/filetemplates/') || path.includes('/uploadexcelfile')) {
    return okNum({}, 'File processed');
  }

  // Outsourced employee view
  if (path.includes('/companyoutsourcedemployee/')) {
    if (write) return okNum({}, 'Updated');
    return ok(MOCK_OUTSOURCE_CANDIDATES);
  }

  // Demo template pages (chat, mail, kanban, calendar, product)
  if (path.includes('/api/chat')) return ok([]);
  if (path.includes('/api/mail')) return ok([]);
  if (path.includes('/api/kanban')) return ok({});
  if (path.includes('/api/calendar')) return ok([]);
  if (path.includes('/api/product')) return ok(MOCK_LOOKUP('Product', 6));
  if (path.includes('/api/post')) return ok(MOCK_LOOKUP('Post', 5));

  // Mutations: pretend success
  if (write && path.includes('/api/')) {
    return okNum({}, 'Saved successfully');
  }

  // Generic GET lists
  if (!write && path.includes('/getall')) {
    return ok(MOCK_LOOKUP('Record'));
  }

  if (!write && path.includes('/api/')) {
    return ok(MOCK_LOOKUP('Item', 5));
  }

  return null;
}
