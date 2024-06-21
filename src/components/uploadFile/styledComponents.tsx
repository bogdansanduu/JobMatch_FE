import styled from "styled-components";

import { BodyText2 } from "../typography/BodyTexts";
import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";

export const DragAndDropContainer = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
`;

export const Label = styled.label<{ dragActive: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: ${(props) =>
    props.dragActive
      ? `2px dashed ${Blue.PrimaryBlue}`
      : `2px dashed ${GrayColors.Gray3}`};
  background-color: ${(props) =>
    props.dragActive ? "rgba(210, 226, 253, 0.40)" : White.PureWhite};

  padding: 20px;
  cursor: pointer;
`;

export const UploadButton = styled(BodyText2)`
  cursor: pointer;
  color: ${Blue.PrimaryBlue};
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const DragFileElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const DragAndDropIconContainer = styled.img`
  width: 40px;
  height: 40px;
`;

export const MyInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
