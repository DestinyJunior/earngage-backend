import { AdminRole } from 'src/app/admin/schemas/admin-role.enum';

interface IAdmin {
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
  password: string;
}

export const admins: IAdmin[] = [
  {
    firstName: 'Earngage',
    lastName: 'Admin',
    email: 'superadmin@getearngage.com',
    role: AdminRole.SUPER_ADMIN,
    password: 'admin@123',
  },
];
