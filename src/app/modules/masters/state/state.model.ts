export interface mockStates {
stateName: any;
  id: number;
  name: string;
  code: string;
  // Add other properties as needed
}

// state.interface.ts
export interface State {
  id: number;
  name: string;
  code: string;
  isDelete?: boolean;
  createdBy?: number | null;
  createdDate?: string;
  modifiedBy?: number | null;
  modifiedDate?: string;
}

// api-response.interface.ts
export interface ApiResponse<T> {
  message: string;
  isSuccess: boolean;
  pagesresult?: any;
  result: T;
}
