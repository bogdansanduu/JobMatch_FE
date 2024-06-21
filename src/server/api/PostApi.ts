import BaseApi from "./BaseApi";

export interface CreatePostDto {
  title: string;
  content: string;
  picture?: string;
}

export interface CommentPostDto {
  content: string;
}

class PostApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("post");
  }

  getAllPosts() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  getAllPostsByCompany(companyId: number) {
    return this.baseApi.sendRequest("GET", `/company/${companyId}`);
  }

  getAllPostsByUser(userId: number) {
    return this.baseApi.sendRequest("GET", `/user/${userId}`);
  }

  getMostRecentCompanyPosts(companyId: number, limit: number) {
    return this.baseApi.sendRequest(
      "GET",
      `/company/most-recent/${companyId}?limit=${limit}`
    );
  }

  getMostRecentUserPosts(userId: number, limit: number) {
    return this.baseApi.sendRequest(
      "GET",
      `/user/most-recent/${userId}?limit=${limit}`
    );
  }

  createPost(userId: number, postData: CreatePostDto) {
    return this.baseApi.sendRequest("POST", `/user-post/${userId}`, postData);
  }

  createPostCompany(companyId: number, postData: CreatePostDto) {
    return this.baseApi.sendRequest(
      "POST",
      `/company-post/${companyId}`,
      postData
    );
  }

  likePost(postId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/like/${postId}/${userId}`);
  }

  likePostCompany(postId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/like-company/${postId}/${companyId}`
    );
  }

  unlikePost(postId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/unlike/${postId}/${userId}`);
  }

  unlikePostCompany(postId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/unlike-company/${postId}/${companyId}`
    );
  }

  commentPost(postId: number, userId: number, commentData: CommentPostDto) {
    return this.baseApi.sendRequest(
      "POST",
      `/comment/${postId}/${userId}`,
      commentData
    );
  }

  commentPostCompany(
    postId: number,
    companyId: number,
    commentData: CommentPostDto
  ) {
    return this.baseApi.sendRequest(
      "POST",
      `/comment-company/${postId}/${companyId}`,
      commentData
    );
  }

  removePost(postId: number) {
    return this.baseApi.sendRequest("DELETE", `/${postId}`);
  }
}

export default PostApi;
