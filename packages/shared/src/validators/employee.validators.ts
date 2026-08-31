import { z } from 'zod';

export const CreateDepartmentSchema = z.object({
  name: z.string().min(1, 'Department name is required').max(100),
  description: z.string().optional(),
  managerId: z.string().uuid().optional(),
});

export const CreateEmployeeSchema = z.object({
  employeeCode: z.string().min(1, 'Employee code is required').max(20),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  address: z.string().optional(),
  departmentId: z.string().uuid('Invalid department ID'),
  designation: z.string().min(1, 'Designation is required').max(100),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  joinDate: z.string().datetime(),
  basicSalary: z.number().min(0, 'Salary must be non-negative'),
  bankAccountNumber: z.string().optional(),
  bankName: z.string().optional(),
  taxId: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

export const CreateLeaveRequestSchema = z.object({
  leaveType: z.enum(['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID', 'CASUAL']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reason: z.string().min(1, 'Reason is required'),
});

export const ClockInSchema = z.object({
  employeeId: z.string().uuid(),
  notes: z.string().optional(),
});

export type CreateDepartmentInput = z.infer<typeof CreateDepartmentSchema>;
export type CreateEmployeeInput = z.infer<typeof CreateEmployeeSchema>;
export type CreateLeaveRequestInput = z.infer<typeof CreateLeaveRequestSchema>;