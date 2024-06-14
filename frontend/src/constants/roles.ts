export const ROLES = {
  EMPLOYEE: "Employee",
  MANAGER: "Manager",
  ADMIN: "Admin",
} as const;
export type Role = (typeof ROLES)[keyof typeof ROLES];

export enum RoleEnum {
  Employee = "Employee",
  Manager = "Manager",
  Admin = "Admin",
}
