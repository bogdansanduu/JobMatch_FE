import { Input } from "@mui/material";
import styled from "styled-components";

import { GrayColors } from "../../utils/constants/colorPallete";

export const StyledInputElement = styled(Input)`
  width: 100%;
  border-radius: 30px !important;
  max-height: 100px !important;
  border-color: ${GrayColors.Gray2} !important;

  & .MuiInputBase-input {
    margin: 0 16px;
    max-height: 100px !important;
  }
`;
