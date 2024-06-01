import axios, { RawAxiosRequestConfig } from "axios";

const DEFAULT_MIN_FILE_SIZE = 1024; // 1KB
const DEFAULT_MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
export const uploadDocumentSecurely = async (
  preSignedUrl: string,
  file: File,
  setProgress?: any
) => {
  const config: RawAxiosRequestConfig = {
    method: "PUT",
    url: preSignedUrl,
    data: file,
    onUploadProgress: (progressEvent) => {
      if (setProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setProgress(progress);
      }
    },
  };

  await axios(config);
};

export const downloadDocumentSecurely = async (preSignedUrl: string) => {
  const config: RawAxiosRequestConfig = {
    method: "GET",
    url: preSignedUrl,
    responseType: "blob",
  };

  const response = await axios(config);
  return response.data;
};

export const isFileSizeValid = (
  file: File,
  minSizeBytes: number = DEFAULT_MIN_FILE_SIZE,
  maxSizeBytes: number = DEFAULT_MAX_FILE_SIZE
): boolean => {
  return file.size >= minSizeBytes && file.size <= maxSizeBytes;
};

export const normalizeFileName = (filename: string): string => {
  const parts = filename
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._]/gi, "")
    .toLowerCase()
    .split(".");
  const extension = parts.pop();

  return parts.join("") + (extension ? "." + extension : "");
};

export const getUserResumeFileKey = (userId: number, fileName: string) => {
  const normalizedFileName = normalizeFileName(fileName);

  return `resumes/${userId}/${new Date().getTime()}-${normalizedFileName}`;
};
