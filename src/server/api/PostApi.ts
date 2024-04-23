import BaseApi from "./BaseApi";

export interface CreatePostDto {
  title: string;
  content: string;
  picture?: string;
}

class PostApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("post");
  }

  async getAllPosts() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  async createPost(userId: number, postData: CreatePostDto) {
    return this.baseApi.sendRequest("POST", `/${userId}`, postData);
  }

  async likePost(postId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/like/${postId}/${userId}`);
  }

  async unlikePost(postId: number, userId: number) {
    return this.baseApi.sendRequest("POST", `/unlike/${postId}/${userId}`);
  }
}

export default PostApi;
