import { _mock } from 'src/_mock';

// Shape expected by CompanyPayrollView grid mapping (getCompanyPayrollView).

export const MOCK_COMPANY_PAYROLL_LIST = [1, 2, 3, 4, 5, 6].map((id) => {
  const currentGrossSalary = 80000 + id * 2500;
  const hrmsFee = 5000;
  const attendanceDeduction = id * 1200;
  const paymentStatuses = ['p', 'np', 'od', 'np', 'p', 'np'];

  return {
    employeeId: id,
    fullName: _mock.fullName(id),
    employeeCode: `EMP-${1000 + id}`,
    companyId: '1',
    companyJoinedDate: id === 2 ? '2026-04-15T00:00:00' : '2025-01-10T00:00:00',
    currentGrossSalary,
    hrmsFee,
    totalAbsent: id % 4,
    previousMonthAbsent: id % 3,
    attendanceDeduction,
    payrollId: 1000 + id,
    transactionId: paymentStatuses[id - 1] === 'p' ? `TXN-202605-${id}` : null,
    paymentStatus: paymentStatuses[id - 1],
    bonusAmount: id === 1 ? 5000 : 0,
  };
});

function parseRequestBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

/** Response for POST /api/SalaryDistribute/GetInvoiceDetailsView */
export function buildMockInvoiceDetails(body) {
  const parsed = parseRequestBody(body);
  const employeeIds = Array.isArray(parsed.employees) ? parsed.employees : [];

  const employeeData = employeeIds.map((employeeId) => {
    const emp = MOCK_COMPANY_PAYROLL_LIST.find((row) => row.employeeId === employeeId);

    return {
      employeeId,
      accountTitle: emp?.fullName || `Employee ${employeeId}`,
      bankName: 'Habib Bank Limited',
      bankAccountNumber: `PK00HABB${String(employeeId).padStart(8, '0')}`,
    };
  });

  return {
    companyName: 'Demo Technologies Pvt Ltd',
    companyAddress: 'Karachi, Pakistan',
    companyPhoneNo: '03001234567',
    employeeData,
  };
}
