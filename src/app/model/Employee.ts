export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  gender: Gender;
  salary: number;
}

export interface EmployeeResponse {
  employees: Employee[];
}
