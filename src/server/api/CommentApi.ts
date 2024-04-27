import BaseApi from "./BaseApi";

class CommentApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("comment");
  }

  async likeComment(commentId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/like/${commentId}/${userId}`);
  }

  async unlikeComment(commentId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/unlike/${commentId}/${userId}`);
  }
}

export default CommentApi;
