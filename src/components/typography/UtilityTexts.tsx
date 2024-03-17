import styled from "styled-components";
import {
  GrayColors,
  TypographyColors,
} from "../../utils/constants/colorPallete";

const BaseSubtitle = styled.div`
  font-family: "Roboto", serif;
  font-style: normal;
  font-weight: normal;
  color: ${TypographyColors.DarkTextPrimary};
`;

const Subtitle1 = styled(BaseSubtitle)`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

const Subtitle2 = styled(BaseSubtitle)`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
`;

const Subtitle3 = styled(BaseSubtitle)`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
`;

const Subtitle4 = styled(BaseSubtitle)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.15px;
  color: ${TypographyColors.SubtitleLight};
`;

const Subtitle5 = styled(Subtitle4)`
  color: ${TypographyColors.SubtitleDark};
`;

const Subtitle6 = styled(BaseSubtitle)`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: ${TypographyColors.SubtitleLight};
`;

const Caption = styled(BaseSubtitle)`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.4px;
  color: ${GrayColors.Gray4};
`;

const Overline = styled(BaseSubtitle)`
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

export {
  Subtitle1,
  Subtitle2,
  Subtitle3,
  Subtitle4,
  Subtitle5,
  Subtitle6,
  Caption,
  Overline,
};
