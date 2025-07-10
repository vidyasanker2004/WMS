export interface Company {
  id: string;
  companyName: string;
  companyCode: string;
  thirdPartyLogistics?: boolean;  
  address1?: string;
  address?: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  phone: string;
  phonePrefix?: string;
  email: string;
  website?: string;
  eccNo?: string; 
  tinDate?: string;
  cstDate?: string; 
  contactEmail: string;
  contactPartner: string;
  mobileNo: string;
  mobilePrefix?: string;
  baseCurrency?: string;  
  vatTinNo?: string; 
  cstNo?: string;
  companyLogo?: File | string;
}