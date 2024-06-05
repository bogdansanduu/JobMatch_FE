import React from "react";

import { APPLICATION_STATUS } from "../../store/slices/JobApplicationSlice";
import styled from "styled-components";

const statusColors = {
  [APPLICATION_STATUS.PENDING]: "#FFA500", // Orange
  [APPLICATION_STATUS.APPROVED]: "#4CAF50", // Green
  [APPLICATION_STATUS.REJECTED]: "#F44336", // Red
};

const StyledLabel = styled.div<{ status: APPLICATION_STATUS }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 16px;
  background-color: ${({ status }) => statusColors[status]};
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

interface JobApplicationStatusLabelProps {
  status: APPLICATION_STATUS;
}

const JobApplicationStatusLabel = ({
  status,
}: JobApplicationStatusLabelProps) => {
  return <StyledLabel status={status}>{status}</StyledLabel>;
};

export default JobApplicationStatusLabel;
