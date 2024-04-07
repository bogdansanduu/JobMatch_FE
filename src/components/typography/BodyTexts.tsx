import styled from "styled-components";
import {
  GrayColors,
  TypographyColors,
} from "../../utils/constants/colorPallete";

interface BodyProps {
  fontWeight?: string;
  color?: string;
  letterSpacing?: string;
  textTransform?: string;
  fontFamily?: string;
  lineHeight?: string;
  fontStyle?: string;
}

const BaseBodyText = styled.div`
  font-style: normal;
  font-weight: normal;
  color: ${TypographyColors.DarkTextPrimary};
`;

const BodyText1 = styled(BaseBodyText)<BodyProps>`
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.18px;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText2 = styled(BaseBodyText)<BodyProps>`
  font-size: 24px;
  line-height: 28px;
  letter-spacing: ${(props) => props.letterSpacing || "-0.18px"};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText3 = styled(BaseBodyText)<BodyProps>`
  font-size: 14px;
  line-height: ${(props) => props.lineHeight || "20px"};
  letter-spacing: ${(props) => props.letterSpacing || "-0.18px"};
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || GrayColors.Gray5};
  text-transform: ${(props) => props.textTransform};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText4 = styled(BaseBodyText)<BodyProps>`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: ${(props) => props.letterSpacing || "0.06px"};
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || GrayColors.Gray5};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText5 = styled(BaseBodyText)<BodyProps>`
  font-size: 12px;
  line-height: 16px;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || GrayColors.Gray5};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText6 = styled(BaseBodyText)<BodyProps>`
  font-size: 12px;
  line-height: 20px;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || GrayColors.Gray5};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText7 = styled(BaseBodyText)<BodyProps>`
  font-size: 14px;
  line-height: 24px;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || GrayColors.Gray6};
  font-style: ${(props) => props.fontStyle};
`;

const BodyText8 = styled(BaseBodyText)<BodyProps>`
  font-size: 10px;
  line-height: ${(props) => props.lineHeight || "14px"};
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || GrayColors.Gray6};
  font-style: ${(props) => props.fontStyle};
`;

export {
  BodyText1,
  BodyText2,
  BodyText3,
  BodyText4,
  BodyText5,
  BodyText6,
  BodyText7,
  BodyText8,
};
