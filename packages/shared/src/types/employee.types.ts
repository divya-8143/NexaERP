export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED';
export type LeaveType = 'ANNUAL' | 'SICK' | 'MATERNITY' | 'PATERNITY' | 'UNPAID' | 'CASUAL';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'ON_LEAVE' | 'HOLIDAY';

export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  departmentId: string;
  department?: Department;
  designation: string;
  employmentType: EmploymentType;
  joinDate: Date;
  terminationDate?: Date;
  basicSalary: number;
  status: EmployeeStatus;
  userId?: string;
  bankAccountNumber?: string;
  bankName?: string;
  taxId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employee?: Employee;
  date: Date;
  clockIn?: Date;
  clockOut?: Date;
  status: AttendanceStatus;
  hoursWorked?: number;
  overtimeHours?: number;
  notes?: string;
  createdAt: Date;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee?: Employee;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  approvedById?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employee?: Employee;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  overtimePay: number;
  bonuses: number;
  grossSalary: number;
  taxDeduction: number;
  otherDeductions: number;
  netSalary: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  status: 'DRAFT' | 'PROCESSED' | 'PAID';
  paidDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}