import React from "react";
import styled from "styled-components";

import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";
import { Box, Typography } from "@mui/material";

const CardContainer = styled.div`
  padding: 20px;
  width: 200px;
  background-color: ${White.PureWhite};
  border-radius: 4px;
  border: 1px solid ${GrayColors.Gray2};

  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  background: ${White.OffWhite};
  width: 40px;
  height: 40px;
  color: ${Blue.PrimaryBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;

  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: ${GrayColors.Gray5};
`;

interface CardStatisticsInterface {
  Icon: any;
  name: string;
  totalValue: number;
  activeValue?: number;
  bannedValue?: number;
}

const CardStatistics = ({
  Icon,
  name,
  totalValue,
  activeValue,
  bannedValue,
}: CardStatisticsInterface) => {
  return (
    <CardContainer className={"card-statistics"}>
      <Box>
        <IconContainer>
          <Icon />
        </IconContainer>

        <TextWrapper style={{ marginTop: "10px" }}>
          <Typography variant={"h6"}>{name}</Typography>
          <Typography variant={"h6"}>{totalValue}</Typography>
        </TextWrapper>
      </Box>

      {activeValue !== undefined && bannedValue !== undefined && (
        <>
          <TextWrapper style={{ marginTop: "10px" }}>
            <span>Active</span>
            <span>{activeValue}</span>
          </TextWrapper>

          <TextWrapper style={{ marginTop: "10px" }}>
            <span>Banned</span>
            <span>{bannedValue}</span>
          </TextWrapper>
        </>
      )}
    </CardContainer>
  );
};

export default CardStatistics;
