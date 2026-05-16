import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

const now = () => new Date().toISOString().split('T')[0];

export const MOCK_PERFORMANCE_QUESTIONS = [
  {
    performanceFeedbackQuestionId: 1,
    categoryName: 'Technical Skills',
    questionText: 'How effectively does the employee apply technical knowledge?',
    weightage: 25,
    statusId: 1,
  },
  {
    performanceFeedbackQuestionId: 2,
    categoryName: 'Technical Skills',
    questionText: 'How well does the employee solve complex problems?',
    weightage: 25,
    statusId: 1,
  },
  {
    performanceFeedbackQuestionId: 3,
    categoryName: 'Communication',
    questionText: 'How clearly does the employee communicate with the team?',
    weightage: 25,
    statusId: 1,
  },
  {
    performanceFeedbackQuestionId: 4,
    categoryName: 'Communication',
    questionText: 'How well does the employee collaborate across teams?',
    weightage: 25,
    statusId: 1,
  },
];

export const MOCK_PERFORMANCE_WEIGHTS = MOCK_PERFORMANCE_QUESTIONS.map((q) => ({
  performanceFeedbackQuestionId: q.performanceFeedbackQuestionId,
  categoryName: q.categoryName,
  weightage: q.weightage,
  companyUsername: 'company',
}));

export const MOCK_PERFORMANCE_EVALUATION_ROWS = [1, 2, 3, 4, 5].map((id) => ({
  employeeId: id,
  companyId: 1,
  performanceFeedbackId: 100 + id,
  fullName: _mock.fullName(id),
  employeeCode: `EMP-${1000 + id}`,
  email: _mock.email(id),
  phoneNumber: _mock.phoneNumber(id),
  desginationName: _mock.jobTitle(id),
  evaluationStatus: id % 2 === 0 ? 'Submitted' : 'Not Submitted',
  evaluationDate: now(),
}));

export const MOCK_EMPLOYEE_FORM_DATA = {
  employeeId: 1,
  finalComment: 'Strong performer with consistent delivery.',
  questionRatings: MOCK_PERFORMANCE_QUESTIONS.map((q, i) => ({
    performanceFeedbackQuestionId: q.performanceFeedbackQuestionId,
    rating: 3 + (i % 2),
  })),
};

export const MOCK_SELF_EVALUATION_FORM = {
  assignments: 'Delivered sprint goals on time.',
  learningDone: 'Completed React advanced training.',
  futureLearning: 'Leadership and system design.',
  questionRatings: MOCK_PERFORMANCE_QUESTIONS.map((q, i) => ({
    performanceFeedbackQuestionId: q.performanceFeedbackQuestionId,
    rating: 4 - (i % 2),
  })),
};

export const MOCK_PAST_EVALUATIONS = [1, 2].map((id) => ({
  performanceFeedbackId: 200 + id,
  reviewerName: _mock.fullName(id + 1),
  companyName: 'Demo Technologies Pvt Ltd',
  finalScore: 75 + id * 5,
  evaluationDate: now(),
}));

export const MOCK_PERFORMANCE_REPORT = {
  employeeName: _mock.fullName(1),
  employeeCode: 'EMP-1001',
  companyName: 'Demo Technologies Pvt Ltd',
  reviewerName: _mock.fullName(2),
  finalScore: 82,
  evaluationDate: now(),
  finalComment: 'Exceeded expectations in Q2.',
  categoryScores: [
    { categoryName: 'Technical Skills', score: 85 },
    { categoryName: 'Communication', score: 78 },
  ],
};

export const MOCK_PERFORMANCE_TEAMS = [1, 2].map((id) => ({
  id,
  evaluationTeamId: id,
  companyId: 1,
  teamName: `Performance Team ${id}`,
  teamCode: `PT-${id}0`,
  teamLeadId: id,
  teamLeadName: _mock.fullName(id),
  statusId: 1,
  employeeStatus: 1,
  members: [1, 2, 3],
}));

export const MOCK_TEAM_LEAD_CREDENTIAL = {
  teamLeadId: 1,
  username: 'teamlead1',
  password: 'demo123',
};
