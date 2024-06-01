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

  async getAllPosts() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  async getAllPostsByCompany(companyId: number) {
    return this.baseApi.sendRequest("GET", `/company/${companyId}`);
  }

  async getMostRecentCompanyPosts(companyId: number, limit: number) {
    return this.baseApi.sendRequest(
      "GET",
      `/company/most-recent/${companyId}?limit=${limit}`
    );
  }

  async createPost(userId: number, postData: CreatePostDto) {
    return this.baseApi.sendRequest("POST", `/user-post/${userId}`, postData);
  }

  async createPostCompany(companyId: number, postData: CreatePostDto) {
    return this.baseApi.sendRequest(
      "POST",
      `/company-post/${companyId}`,
      postData
    );
  }

  async likePost(postId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/like/${postId}/${userId}`);
  }

  async likePostCompany(postId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/like-company/${postId}/${companyId}`
    );
  }

  async unlikePost(postId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/unlike/${postId}/${userId}`);
  }

  async unlikePostCompany(postId: number, companyId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/unlike-company/${postId}/${companyId}`
    );
  }

  async commentPost(
    postId: number,
    userId: number,
    commentData: CommentPostDto
  ) {
    return this.baseApi.sendRequest(
      "POST",
      `/comment/${postId}/${userId}`,
      commentData
    );
  }

  async commentPostCompany(
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
}

export default PostApi;
