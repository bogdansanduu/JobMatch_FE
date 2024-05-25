import React from "react";
import { useAppSelector } from "../store/hooks";
import { getCurrentJob } from "../store/slices/JobSlice";

const CompanyJobDetailsPage = () => {
  const currentJob = useAppSelector(getCurrentJob);

  console.log(currentJob);

  return <div>Not implemented yet</div>;
};

export default CompanyJobDetailsPage;
