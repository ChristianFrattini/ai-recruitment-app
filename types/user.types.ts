export interface UserType {
  id: string;
  title: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  specialization: string;
  isAdmin: boolean;
  organizationId: string | null;
  createdAt: Date;
}
