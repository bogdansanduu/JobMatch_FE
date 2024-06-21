export const SUPPORTED_EXTENSIONS = ["pdf"];

export const getFileExtensionFromName = (fileName: string): string =>
  (fileName?.split(".").pop() || "").toLowerCase() || "";

export const checkIfFileSupported = (
  file: File,
  extensions = SUPPORTED_EXTENSIONS
) => {
  const fileExtension = getFileExtensionFromName(file.name);
  return extensions.includes(fileExtension);
};
