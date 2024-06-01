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
  MyApplications = "/user/my-applications",
  CreateCompanyAccount = "/user/create-company-account",
  UserProfile = "/user/profile",
  UserCompanyProfile = "/user/company-profile",
  MyProfile = "/user/my-profile",
  UserJobDetails = "/user/job-details",
  UserApplicationReview = "/user/application-review",

  //---COMPANY---
  HomeCompany = "/company/home",
  JobPostings = "/company/job-postings",
  Employees = "/company/employees",
  CompanyProfile = "/company/profile",
  AccessDeniedCompany = "/company/access-denied",
  CompanyJobDetails = "/company/job-details",
}
