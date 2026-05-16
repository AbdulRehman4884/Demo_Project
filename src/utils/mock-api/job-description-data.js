import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

function row(id, extra = {}) {
  return {
    id,
    statusId: 1,
    ...extra,
  };
}

export const MOCK_COUNTRIES = [1].map((id) =>
  row(id, {
    countryId: id,
    fullName: 'Pakistan',
  })
);

export const MOCK_STATES = [1, 2].map((id) =>
  row(id, {
    stateId: id,
    countryId: 1,
    fullName: id === 1 ? 'Sindh' : 'Punjab',
  })
);

export const MOCK_CITIES = [1, 2, 3].map((id) =>
  row(id, {
    cityId: id,
    stateId: id <= 2 ? 1 : 2,
    fullName: id === 1 ? 'Karachi' : id === 2 ? 'Hyderabad' : 'Lahore',
  })
);

export const MOCK_PROFESSIONS = [1, 2].map((id) =>
  row(id, {
    professionId: id,
    fullName: id === 1 ? 'Software Engineering' : 'Human Resources',
    designationIds: '1,2,3',
    educationIds: '1,2,3',
  })
);

export const MOCK_DESIGNATIONS = [1, 2, 3].map((id) =>
  row(id, {
    designationId: String(id),
    fullName: _mock.jobTitle(id),
  })
);

export const MOCK_EDUCATIONS = [1, 2, 3].map((id) =>
  row(id, {
    educationId: id,
    fullName: id === 1 ? 'Bachelors' : id === 2 ? 'Masters' : 'PhD',
  })
);

export const MOCK_SKILLS = [1, 2, 3, 4, 5].map((id) =>
  row(id, {
    skillId: id,
    fullName: ['React', 'Node.js', 'SQL', 'Communication', 'Leadership'][id - 1],
  })
);

export const MOCK_JOB_DESCRIPTIONS = [1, 2, 3, 4].map((id) =>
  row(id, {
    jobDescriptionId: id,
    jobTitle: _mock.jobTitle(id),
    jobDescription: `We are hiring a ${ _mock.jobTitle(id) } to build and maintain enterprise HRMS features. Responsibilities include coding, code review, and cross-team collaboration.`,
    code: `JD-${100 + id}`,
    minSalary: 60000 + id * 5000,
    maxSalary: 90000 + id * 5000,
    experience: String(id % 3),
    countryId: 1,
    stateId: 1,
    cityId: 1,
    professionId: 1,
    designationId: String(id),
    educationId: 1,
    skills: '1,2,3',
    companyUsername: 'company',
  })
);

export const MOCK_JOB_FILTER_CANDIDATES = [1, 2, 3, 4].map((id) => ({
  candidateId: id,
  fullname: _mock.fullName(id),
  phoneNumber: _mock.phoneNumber(id),
  email: _mock.email(id),
  cnic: `42101-${1000000 + id}-1`,
  experience: id === 1 ? 'freshGraduate' : String(id),
  performanceScore: 70 + id * 5,
}));
