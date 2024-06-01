export const SUPPORTED_EXTENSIONS = ["pdf"];

export const getFileExtensionFromName = (fileName: string): string =>
  (fileName?.split(".").pop() || "").toLowerCase() || "";

export const checkIfFileSupported = (file: File) => {
  const fileExtension = getFileExtensionFromName(file.name);
  return SUPPORTED_EXTENSIONS.includes(fileExtension);
};
