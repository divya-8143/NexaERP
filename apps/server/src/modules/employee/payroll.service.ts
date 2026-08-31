import { prisma } from '../../lib/prisma';
import { attendanceService } from './attendance.service';

export class PayrollService {
  async processMonthlyPayroll(data: any) {
    const employees = await prisma.employee.findMany({ where: { status: 'ACTIVE' } });
    const processed = [];

    for (const emp of employees) {
      const summary = await attendanceService.getMonthlySummary(emp.id, data.month, data.year);
      const dailyRate = Number(emp.basicSalary) / 30;
      const hourlyRate = dailyRate / 8;

      const allowances = data.allowances || 0;
      const overtimePay = summary.totalOvertime * hourlyRate * 1.5;
      const bonuses = data.bonuses || 0;
      const grossSalary = Number(emp.basicSalary) + allowances + overtimePay + bonuses;

      const taxDeduction = grossSalary * 0.1;
      const otherDeductions = summary.absent * dailyRate;
      const netSalary = grossSalary - taxDeduction - otherDeductions;

      const payroll = await prisma.payroll.upsert({
        where: { employeeId_month_year: { employeeId: emp.id, month: data.month, year: data.year } },
        create: {
          employeeId: emp.id,
          month: data.month,
          year: data.year,
          basicSalary: emp.basicSalary,
          allowances,
          overtimePay,
          bonuses,
          grossSalary,
          taxDeduction,
          otherDeductions,
          netSalary,
          presentDays: summary.present,
          absentDays: summary.absent,
          leaveDays: summary.leave,
          status: 'PROCESSED',
        },
        update: {
          basicSalary: emp.basicSalary,
          allowances,
          overtimePay,
          bonuses,
          grossSalary,
          taxDeduction,
          otherDeductions,
          netSalary,
          presentDays: summary.present,
          absentDays: summary.absent,
          leaveDays: summary.leave,
        },
      });

      processed.push(payroll);
    }

    return processed;
  }

  async getByEmployee(employeeId: string) {
    return prisma.payroll.findMany({
      where: { employeeId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  async getByPeriod(month: number, year: number) {
    return prisma.payroll.findMany({
      where: { month, year },
      include: { employee: { include: { department: true } } },
    });
  }
}

export const payrollService = new PayrollService();