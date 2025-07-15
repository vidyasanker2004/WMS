export interface User {
  id: number;
  userID: string;
  password?: string;  // Marked as optional since frontend might not always need it
  userCode: string;
  username: string;
  role: string;
  salutation: string;
  shortName: string;
  customerId: number;
  warehouseId: number;
  companyId: number;
  isActive: boolean;
}