import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserType } from "./UserSlice";
import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";

export interface CompanyState {
  currentCompany?: CompanyType;
  companies: CompanyType[];
}

export type CompanyType = {
  id: number;
  isBanned: boolean;
  email: string;
  name: string;
  description: string;
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

const initialState: CompanyState = {
  currentCompany: undefined,
  companies: [],
};

export const getAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async ({ banned = false }: { banned: boolean }) => {
    const companyApi = AppApi.getCompanyApi();

    return await companyApi.getAllCompanies(banned);
  }
);

export const getCompanyById = createAsyncThunk(
  "company/getCompanyById",
  async (id: number) => {
    const companyApi = AppApi.getCompanyApi();

    return await companyApi.getCompanyById(id);
  }
);

export const banCompany = createAsyncThunk(
  "company/banCompany",
  async ({ companyId, banned }: { companyId: number; banned: boolean }) => {
    const companyApi = AppApi.getCompanyApi();

    return await companyApi.banCompany(companyId, banned);
  }
);

export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<CompanyType[]>) => {
      state.companies = action.payload;
    },
    setCurrentCompany: (state, action: PayloadAction<CompanyType>) => {
      state.currentCompany = action.payload;
    },
    clearCurrentCompany: (state) => {
      state.currentCompany = undefined;
    },
  },
  extraReducers: (builder) => {
    //GET ALL COMPANIES
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
    builder.addCase(getAllCompanies.rejected, (state) => {
      state.companies = [];
    });
    //GET COMPANY BY ID
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.currentCompany = action.payload;
    });
    builder.addCase(getCompanyById.rejected, (state) => {
      state.currentCompany = undefined;
    });
    //BAN COMPANY
    builder.addCase(banCompany.fulfilled, (state, action) => {
      state.currentCompany = action.payload;
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload.id
      );
    });
    builder.addCase(banCompany.rejected, (state) => {
      console.log("Error banning company");
    });
  },
});

export const { setCurrentCompany, clearCurrentCompany, setCompanies } =
  CompanySlice.actions;
export const getCompanies = (state: RootState) => state.company.companies;
export const getCurrentCompany = (state: RootState) =>
  state.company.currentCompany;
export default CompanySlice.reducer;
