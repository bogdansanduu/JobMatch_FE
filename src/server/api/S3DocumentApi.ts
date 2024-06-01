import BaseApi from "./BaseApi";

class S3DocumentApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("s3-document");
  }

  generatePreSignedPutUrl(fileKey: string, fileType: string) {
    return this.baseApi.sendRequest("POST", `/presigned-put-url`, {
      fileKey,
      fileType,
    });
  }

  generatePreSignedGetUrl(fileKey: string) {
    return this.baseApi.sendRequest("POST", `/presigned-get-url`, {
      fileKey,
    });
  }

  generateShortPreSignedGetUrl(fileKey: string) {
    return this.baseApi.sendRequest("POST", `/short-presigned-get-url`, {
      fileKey,
    });
  }

  deleteDocument(fileKey: string) {
    return this.baseApi.sendRequest("DELETE", "/", {
      fileKey,
    });
  }
}

export default S3DocumentApi;
