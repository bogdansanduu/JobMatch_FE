import BaseApi from "./BaseApi";

export interface GetRecommendationsDto {
  description: string;
  latitude: number;
  longitude: number;
}

class RecommendationApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("recommendation");
  }

  async getRecommendations(data: GetRecommendationsDto) {
    return this.baseApi.sendRequest("POST", "/get-recommendations", data);
  }

  async populateRecommendations() {
    return this.baseApi.sendRequest("POST", "/populate");
  }
}

export default RecommendationApi;
