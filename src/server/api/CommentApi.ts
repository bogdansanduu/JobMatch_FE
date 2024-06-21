import BaseApi from "./BaseApi";

class CommentApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("comment");
  }

  getAllComments() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  likeComment(commentId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/like/${commentId}/${userId}`);
  }

  likeCommentCompany(commentId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/like-company/${commentId}/${companyId}`
    );
  }

  unlikeComment(commentId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/unlike/${commentId}/${userId}`);
  }

  unlikeCommentCompany(commentId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/unlike-company/${commentId}/${companyId}`
    );
  }
}

export default CommentApi;
