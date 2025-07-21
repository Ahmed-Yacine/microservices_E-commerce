export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
