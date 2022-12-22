import { Employee } from './employee';

export interface Salary {
  id: number;
  amount: number;
  startDate: string;
  endDate: string;
  employee: Employee;
}
