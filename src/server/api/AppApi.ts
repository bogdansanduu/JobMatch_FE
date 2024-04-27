import BaseApi from "./BaseApi";
import AuthApi from "./AuthApi";
import UserApi from "./UserApi";
import SocketApi from "./SocketApi";
import PostApi from "./PostApi";
import CommentApi from "./CommentApi";

class AppApi {
  private static instance: AppApi;

  readonly baseApi: BaseApi;
  readonly authApi: AuthApi;
  readonly userApi: UserApi;
  readonly socketApi: SocketApi;
  readonly postApi: PostApi;
  readonly commentApi: CommentApi;

  private constructor() {
    this.baseApi = new BaseApi();
    this.authApi = new AuthApi();
    this.userApi = new UserApi();
    this.socketApi = new SocketApi();
    this.postApi = new PostApi();
    this.commentApi = new CommentApi();
  }

  public static getInstance() {
    if (!this.instance) this.instance = new AppApi();

    return this.instance;
  }

  static getBaseApi() {
    return this.getInstance().baseApi;
  }

  static getAuthApi() {
    return this.getInstance().authApi;
  }

  static getUserApi() {
    return this.getInstance().userApi;
  }

  static getSocketApi() {
    return this.getInstance().socketApi;
  }

  static getPostApi() {
    return this.getInstance().postApi;
  }

  static getCommentApi() {
    return this.getInstance().commentApi;
  }
}

export default AppApi;
