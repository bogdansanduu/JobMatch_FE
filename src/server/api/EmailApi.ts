import BaseApi from "./BaseApi";

class EmailApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("ses");
  }

  async sendApplicationEvaluatedEmail(jobApplicationId: number) {
    return this.baseApi.sendRequest(
      "POST",
      `/send-application-evaluated-email/${jobApplicationId}`
    );
  }
}

export default EmailApi;
