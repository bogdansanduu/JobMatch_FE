import { downloadDocumentSecurely } from "../../utils/s3/s3Utils";

export const getFileExtensionFromName = (fileName: string) =>
  (fileName?.split(".").pop() || "").toLowerCase() || "";

export const getFileTypeFromFileExtensionName = (fileName?: string) => {
  const fileExtension = getFileExtensionFromName(fileName || "");
  const isImage = ["jpg", "jpeg", "png", "gif"].indexOf(fileExtension) >= 0;
  const isPDF = fileExtension === "pdf";
  const isCsv = fileExtension === "csv";
  const isSVG = fileExtension === "svg";
  const isAudio = fileExtension === "wav" || fileExtension === "webm";
  const isPreviewableUsingUri =
    ["doc", "ppt", "docx", "pptx", "txt", "xlx", "xls", "xlsx"].indexOf(
      fileExtension
    ) >= 0;
  const isPreviewable =
    isImage || isPDF || isCsv || isSVG || isAudio || isPreviewableUsingUri;

  return {
    isCsv,
    isPDF,
    isSVG,
    isImage,
    isAudio,
    isPreviewable,
  };
};

export const previewFile = async ({
  fileName,
  setPdfPreview,
  preSignedUrl,
}: {
  fileName: string;
  setPdfPreview: (a: string) => void;
  preSignedUrl: string;
}) => {
  const { isPDF } = getFileTypeFromFileExtensionName(fileName);

  if (isPDF) {
    const blob = await downloadDocumentSecurely(preSignedUrl);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const pdfBase64 = `data:application/pdf;base64,${base64String.slice(
        base64String.indexOf(",") + 1
      )}`;
      setPdfPreview(pdfBase64);
    };
  }
};
