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

  getUserById(id: number) {
    return this.baseApi.sendRequest("GET", `/${id}`);
  }

  getAllUsers(banned = false) {
    let endpoint = "/all";

    if (banned) {
      endpoint += "?banned=true";
    }

    return this.baseApi.sendRequest("GET", endpoint);
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

  banUser(userId: number, banned: boolean) {
    return this.baseApi.sendRequest("PUT", `/ban/${userId}`, {
      banned,
    });
  }
}

export default UserApi;
