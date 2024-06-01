import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Box, Button, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { Bounce, toast } from "react-toastify";

import AppApi from "../../server/api/AppApi";

import { getFileTypeFromFileExtensionName, previewFile } from "./utils";
import {
  ContentContainer,
  PreviewContainer,
  TopContainer,
} from "./styledComponent";
import { ResumeFile } from "../../store/slices/UserSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PreviewFileModalProps {
  closePreview: () => void;
  file: ResumeFile;
}

const PreviewFileContent = ({ file, closePreview }: PreviewFileModalProps) => {
  const { fileName, id, fileKey } = file;
  const s3DocumentApi = AppApi.getS3DocumentApi();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filePresignedUrl, setFilePresignedUrl] = useState("");
  const [pdfPreview, setPdfPreview] = useState("");

  const { isPDF } = getFileTypeFromFileExtensionName(fileName);

  useEffect(() => {
    (async () => {
      await onPreviewFile();
    })();
  }, [fileName]);

  const onPreviewFile = async () => {
    try {
      const preSignedUrl = await s3DocumentApi.generatePreSignedGetUrl(fileKey);
      await previewFile({ fileName, setPdfPreview, preSignedUrl });

      setFilePresignedUrl(preSignedUrl);
    } catch (e) {
      toast.error("Failed to preview file", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handlePageChange = async (value: number) => {
    setPageNumber(value);
  };

  return (
    <ContentContainer className={"preview-file-container"}>
      <TopContainer>
        <Typography variant={"subtitle2"}>{fileName}</Typography>
        {isPDF && (
          <Pagination
            count={numPages || 1}
            page={pageNumber}
            onChange={(event: React.ChangeEvent<unknown>, value: number) =>
              handlePageChange(value)
            }
            size="small"
          />
        )}
      </TopContainer>
      <Stack sx={{ gap: "16px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            minHeight: "50vh",
            maxHeight: "70vh",
            justifyContent: "center",
          }}
        >
          <PreviewContainer>
            {!filePresignedUrl && !pdfPreview && <div>Loading ...</div>}
            {isPDF && pdfPreview && (
              <Document
                file={pdfPreview}
                onLoadSuccess={(obj: any) => {
                  setNumPages(obj?._pdfInfo?.numPages || 1);
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            )}
          </PreviewContainer>
        </Box>
      </Stack>
      <Button variant={"contained"} onClick={closePreview} color={"error"}>
        Close
      </Button>
    </ContentContainer>
  );
};

export default PreviewFileContent;
