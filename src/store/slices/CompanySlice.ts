import { UserType } from "./UserSlice";

export type CompanyType = {
  id: number;
  email: string;
  name: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  owner: UserType;
};
