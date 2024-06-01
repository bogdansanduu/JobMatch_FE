import BaseApi from "./BaseApi";

export interface UploadResumeDto {
  fileName: string;
  fileKey: string;
}

class UserApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("user");
  }

  async getUserById(id: number) {
    return this.baseApi.sendRequest("GET", `/${id}`);
  }

  getAllUsers() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  searchByNameAndEmail(searchTerm: string) {
    return this.baseApi.sendRequest("GET", `/search?searchTerm=${searchTerm}`);
  }

  addContact(userId: number, contactId: number) {
    return this.baseApi.sendRequest("PUT", `/add-contact`, {
      userId,
      contactId,
    });
  }

  removeContact(userId: number, contactId: number) {
    return this.baseApi.sendRequest("PUT", `/remove-contact`, {
      userId,
      contactId,
    });
  }

  uploadUserResume(userId: number, resumeDto: UploadResumeDto) {
    return this.baseApi.sendRequest(
      "POST",
      `/upload-resume/${userId}`,
      resumeDto
    );
  }

  deleteUserResume(userId: number) {
    return this.baseApi.sendRequest("DELETE", `/delete-resume/${userId}`);
  }
}

export default UserApi;
