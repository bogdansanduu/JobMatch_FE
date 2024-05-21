import { UserType } from "./UserSlice";

export type CompanyType = {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  owner: UserType;
};

export type CompanySimpleType = {
  id: number;
  email: string;
  name: string;
};
