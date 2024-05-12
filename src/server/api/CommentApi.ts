import BaseApi from "./BaseApi";

class CommentApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("comment");
  }

  async likeComment(commentId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/like/${commentId}/${userId}`);
  }

  async likeCommentCompany(commentId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/like-company/${commentId}/${companyId}`
    );
  }

  async unlikeComment(commentId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/unlike/${commentId}/${userId}`);
  }

  async unlikeCommentCompany(commentId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/unlike-company/${commentId}/${companyId}`
    );
  }
}

export default CommentApi;
