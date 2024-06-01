import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const ContentContainer = styled(FormContainer)`
  width: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 6px;
  overflow: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    width: 85% !important;
    height: 100% !important;
  }

  .react-pdf__Document {
    height: 100%;
  }

  .react-pdf__Page {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
