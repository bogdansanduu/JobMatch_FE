import BaseApi from "./BaseApi";
import AuthApi from "./AuthApi";
import UserApi from "./UserApi";
import SocketApi from "./SocketApi";

class AppApi {
  private static instance: AppApi;

  readonly baseApi: BaseApi;
  readonly authApi: AuthApi;
  readonly userApi: UserApi;
  readonly socketApi: SocketApi;

  private constructor() {
    this.baseApi = new BaseApi();
    this.authApi = new AuthApi();
    this.userApi = new UserApi();
    this.socketApi = new SocketApi();
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
}

export default AppApi;
