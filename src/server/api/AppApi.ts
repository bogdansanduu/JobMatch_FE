import BaseApi from "./BaseApi";
import AuthApi from "./AuthApi";
import UserApi from "./UserApi";
import SocketApi from "./SocketApi";
import PostApi from "./PostApi";
import CommentApi from "./CommentApi";
import JobApi from "./JobApi";
import RecommendationApi from "./RecommendationApi";
import CompanyApi from "./CompanyApi";
import JobApplicationApi from "./JobApplicationApi";
import JobSavedApi from "./JobSavedApi";
import S3DocumentApi from "./S3DocumentApi";

class AppApi {
  private static instance: AppApi;

  readonly baseApi: BaseApi;
  readonly authApi: AuthApi;
  readonly userApi: UserApi;
  readonly companyApi: CompanyApi;
  readonly socketApi: SocketApi;
  readonly postApi: PostApi;
  readonly commentApi: CommentApi;
  readonly jobApi: JobApi;
  readonly recommendationApi: RecommendationApi;
  readonly jobApplicationApi: JobApplicationApi;
  readonly jobSavedApi: JobSavedApi;
  readonly s3DocumentApi: S3DocumentApi;

  private constructor() {
    this.baseApi = new BaseApi();
    this.authApi = new AuthApi();
    this.userApi = new UserApi();
    this.companyApi = new CompanyApi();
    this.socketApi = new SocketApi();
    this.postApi = new PostApi();
    this.commentApi = new CommentApi();
    this.jobApi = new JobApi();
    this.recommendationApi = new RecommendationApi();
    this.jobApplicationApi = new JobApplicationApi();
    this.jobSavedApi = new JobSavedApi();
    this.s3DocumentApi = new S3DocumentApi();
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

  static getCompanyApi() {
    return this.getInstance().companyApi;
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

  static getJobApi() {
    return this.getInstance().jobApi;
  }

  static getRecommendationApi() {
    return this.getInstance().recommendationApi;
  }

  static getJobApplicationApi() {
    return this.getInstance().jobApplicationApi;
  }

  static getJobSavedApi() {
    return this.getInstance().jobSavedApi;
  }

  static getS3DocumentApi() {
    return this.getInstance().s3DocumentApi;
  }
}

export default AppApi;
