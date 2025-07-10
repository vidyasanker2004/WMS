export interface ApiResponse<T> {
  message: string;
  isSuccess: boolean;
  pageResult: any;
  result: T[];
  errors: any;
}

export interface Country {
  result: [];
  id: number;
  countryName: string;
  countryCode: string;
  role?: string;
  isDeleted?: boolean;
  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number;
  modifiedDate?: string;
}
export interface Countrymock{
  id: number;
  countryName: string;
  countryCode: string;
}