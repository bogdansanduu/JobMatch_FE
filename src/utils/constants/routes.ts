export enum AppRoutes {
  //---MAIN ROUTES---
  User = "/user",
  Company = "/company",

  //---ROLE-AGNOSTIC---
  Login = "/login",
  LoginCompany = "/login-company",
  Register = "/register",

  //---USER---
  Home = "/user/home",
  Messaging = "/user/messaging",
  AccessDenied = "/user/access-denied",
  MyNetwork = "/user/my-network",
  Jobs = "/user/jobs",
  Notifications = "/user/notifications",
  CreateCompanyAccount = "/user/create-company-account",
  UserProfile = "/user/profile",
  MyProfile = "/user/my-profile",

  //---COMPANY---
  HomeCompany = "/company/home",
  Employees = "/company/employees",
  CompanyProfile = "/company/profile",
  AccessDeniedCompany = "/company/access-denied",
}
