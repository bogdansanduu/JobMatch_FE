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
}

export default RecommendationApi;
