import { ok, okRaw, okList, okNum } from './responses';
import {
  MOCK_ATTENDANCE_CHECK,
  MOCK_ATTENDANCE_EMPLOYEES,
  MOCK_ATTENDANCE_HISTORY,
  MOCK_CANDIDATES,
  MOCK_COMPANY_EMPLOYEES,
  MOCK_COMPANY_PROFILE,
  MOCK_DASHBOARD,
  MOCK_EMPLOYEE_FORM_DATA,
  MOCK_FACIAL_EMPLOYEES,
  MOCK_INTERVIEW_PANEL,
  MOCK_JOB_DESCRIPTIONS,
  MOCK_JOB_FILTER_CANDIDATES,
  MOCK_COUNTRIES,
  MOCK_STATES,
  MOCK_CITIES,
  MOCK_PROFESSIONS,
  MOCK_DESIGNATIONS,
  MOCK_EDUCATIONS,
  MOCK_SKILLS,
  MOCK_LOOKUP,
  MOCK_OUTSOURCE_CANDIDATES,
  MOCK_PAST_EVALUATIONS,
  MOCK_PAYROLL_ROWS,
  MOCK_PERFORMANCE_EVALUATION_ROWS,
  MOCK_PERFORMANCE_QUESTIONS,
  MOCK_PERFORMANCE_REPORT,
  MOCK_PERFORMANCE_TEAMS,
  MOCK_PERFORMANCE_WEIGHTS,
  MOCK_SCHEDULE_INTERVIEWS,
  MOCK_SELF_EVALUATION_FORM,
  MOCK_TEAM_LEAD_CREDENTIAL,
} from './entities';
import { MOCK_COMPANY_PAYROLL_LIST, buildMockInvoiceDetails } from './company-payroll-data';
import {
  buildMockCompanyProfile,
  buildMockCandidateProfile,
  MOCK_COMPANY_PAYMENT_ACCOUNT,
  parseRequestUsername,
} from './profile-data';

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

function mutationOk(message = 'Saved successfully') {
  return ok({}, message);
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
    const username = parseRequestUsername(body, 'company');
    return ok([buildMockCompanyProfile(username)]);
  }
  if (path.includes('/candidate/getcandidatebyusername')) {
    const username = parseRequestUsername(body, 'employee');
    return ok([buildMockCandidateProfile(username)]);
  }
  if (path.includes('/companypaymentinfo/getcompanyaccountbyname')) {
    return ok(MOCK_COMPANY_PAYMENT_ACCOUNT);
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
  if (path.includes('/addattendance/addorupdate') || path.includes('/addattendance/update')) {
    return mutationOk('Attendance saved successfully');
  }
  if (path.includes('/addattendance/delete')) {
    return mutationOk('Attendance deleted');
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

  // Performance — questions & weights
  if (path.includes('/performancefeedbackquestion/getperformancequestionview')) {
    return ok(MOCK_PERFORMANCE_QUESTIONS);
  }
  if (path.includes('/performancequestionweightage/getweightages')) {
    return ok(MOCK_PERFORMANCE_WEIGHTS);
  }
  if (path.includes('/performancefeedbackquestion/')) {
    if (write) return mutationOk('Question saved');
    return ok(MOCK_PERFORMANCE_QUESTIONS);
  }
  if (path.includes('/performancequestionweightage/')) {
    if (write) return mutationOk('Weightages saved');
    return ok(MOCK_PERFORMANCE_WEIGHTS);
  }

  // Performance — evaluation lists (company / team lead)
  if (
    path.includes('/performancefeedback/getteamleadevaluationrecords') ||
    path.includes('/performancefeedback/getallcurrentevaluationrecords') ||
    path.includes('/performancefeedback/getallperformancesubmissions')
  ) {
    return ok(MOCK_PERFORMANCE_EVALUATION_ROWS);
  }
  if (path.includes('/performancefeedback/getemployeeformdata')) {
    return ok([MOCK_EMPLOYEE_FORM_DATA]);
  }
  if (path.includes('/performancefeedback/getselfevaluationrecord')) {
    return ok([MOCK_SELF_EVALUATION_FORM]);
  }
  if (
    path.includes('/performancefeedback/getemployeeevaluationformdata') ||
    path.includes('/performancefeedback/getemployeeperformancereportdata')
  ) {
    return ok([MOCK_PERFORMANCE_REPORT]);
  }
  if (path.includes('/performancefeedback/')) {
    if (write) return mutationOk('Evaluation saved');
    return ok(MOCK_PERFORMANCE_EVALUATION_ROWS);
  }

  // Self evaluation (employee portal)
  if (path.includes('/employeeselfevaluation/getselfevaluationrecord')) {
    return ok([MOCK_SELF_EVALUATION_FORM]);
  }
  if (path.includes('/employeeselfevaluation/getemployeepastevaluationrecords')) {
    return ok(MOCK_PAST_EVALUATIONS);
  }
  if (path.includes('/employeeselfevaluation/')) {
    if (write) return mutationOk('Self evaluation saved');
    return ok([MOCK_SELF_EVALUATION_FORM]);
  }

  // Performance teams
  if (path.includes('/performanceevaluationteam/getallteambyname')) {
    return ok(MOCK_PERFORMANCE_TEAMS);
  }
  if (path.includes('/performanceevaluationteam/getteamleadcredential')) {
    return ok([MOCK_TEAM_LEAD_CREDENTIAL]);
  }
  if (path.includes('/performanceevaluationteam/')) {
    if (write) return mutationOk('Team saved');
    return ok(MOCK_PERFORMANCE_TEAMS);
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
  if (path.includes('/jobdescription/getbyusername') || path.includes('/jobdescription/getall')) {
    return ok(MOCK_JOB_DESCRIPTIONS);
  }
  if (path.includes('/jobdescription/filtercandidates')) {
    return ok(MOCK_JOB_FILTER_CANDIDATES);
  }
  if (path.includes('/jobdescription/')) {
    if (write) return mutationOk('Job description saved');
    return ok(MOCK_JOB_DESCRIPTIONS);
  }

  if (path.includes('/country/')) return write ? mutationOk() : ok(MOCK_COUNTRIES);
  if (path.includes('/state/')) return write ? mutationOk() : ok(MOCK_STATES);
  if (path.includes('/city/')) return write ? mutationOk() : ok(MOCK_CITIES);
  if (path.includes('/profession/')) return write ? mutationOk() : ok(MOCK_PROFESSIONS);
  if (path.includes('/designation/')) return write ? mutationOk() : ok(MOCK_DESIGNATIONS);
  if (path.includes('/education/')) return write ? mutationOk() : ok(MOCK_EDUCATIONS);
  if (path.includes('/skill/')) return write ? mutationOk() : ok(MOCK_SKILLS);
  if (path.includes('/interviewpanel/')) {
    if (write) return mutationOk('Interview panel saved');
    return ok(MOCK_INTERVIEW_PANEL);
  }
  if (path.includes('/interviewquestion/')) {
    return ok(MOCK_PERFORMANCE_QUESTIONS);
  }
  if (path.includes('/interviewfeedback/')) {
    if (write) return mutationOk('Feedback saved');
    return ok(MOCK_SCHEDULE_INTERVIEWS);
  }

  // Company payroll (grid + invoice dialogs)
  if (path.includes('/salarydistribute/getcompanypayrollview')) {
    return ok(MOCK_COMPANY_PAYROLL_LIST);
  }
  if (path.includes('/salarydistribute/getinvoicedetailsview')) {
    return ok([buildMockInvoiceDetails(body)]);
  }
  if (path.includes('/salarydistribute/addlist')) {
    return mutationOk('Payroll processed successfully');
  }

  // Payroll / payments (other screens)
  if (
    path.includes('/salarydistribute/') ||
    path.includes('/companypaymentinfo/') ||
    path.includes('/employeepaymentinfo/') ||
    path.includes('/hrmspaymentinfo/') ||
    path.includes('/hrmstoemployeepayment/') ||
    path.includes('/employeesalaryinfo/')
  ) {
    if (write) return mutationOk('Payment saved');
    return ok(MOCK_PAYROLL_ROWS);
  }
  if (path.includes('/candidateofferedjob/')) {
    if (write) return mutationOk('Offer updated');
    return ok(MOCK_JOB_DESCRIPTIONS);
  }

  // Lookups (bank and generic)
  if (path.includes('/bank/')) return write ? mutationOk() : ok(MOCK_LOOKUP('Bank'));
  if (path.includes('/companytype/')) return write ? mutationOk() : ok(MOCK_LOOKUP('Company Type'));
  if (path.includes('/employee/getall')) return ok(MOCK_COMPANY_EMPLOYEES);

  // Auth / user profile
  if (path.includes('/login')) {
    return okNum({ username: 'company', userType: 'co', token: 'mock' });
  }
  if (path.includes('/userprofile/getallexistingusername')) {
    return okList(['company', 'employee', 'superadmin', 'teamlead1']);
  }
  if (path.includes('/userprofile/')) {
    if (write) return mutationOk('Profile saved');
    return okList(['company', 'employee']);
  }

  // Resume / mindee / offer letter
  if (path.includes('/mindee/') || path.includes('/offerletter')) {
    return mutationOk('Processed successfully');
  }

  // Email
  if (path.includes('/email/')) {
    return mutationOk('Email sent');
  }

  // Template / excel
  if (path.includes('/filetemplates/') || path.includes('/uploadexcelfile')) {
    return mutationOk('File processed');
  }

  // Outsourced employee view
  if (path.includes('/companyoutsourcedemployee/')) {
    if (write) return mutationOk('Updated');
    return ok(MOCK_OUTSOURCE_CANDIDATES);
  }

  // Template demo APIs
  if (path.includes('/api/chat')) return ok([]);
  if (path.includes('/api/mail')) return ok([]);
  if (path.includes('/api/kanban')) return okRaw({});
  if (path.includes('/api/calendar')) return ok([]);
  if (path.includes('/api/product')) return ok(MOCK_LOOKUP('Product', 6));
  if (path.includes('/api/post')) return ok(MOCK_LOOKUP('Post', 5));

  // Default mutation
  if (write && path.includes('/api/')) {
    return mutationOk();
  }

  if (!write && path.includes('/getall')) {
    return ok(MOCK_LOOKUP('Record', 6));
  }

  if (!write && path.includes('/api/')) {
    return ok(MOCK_LOOKUP('Item', 6));
  }

  return null;
}
