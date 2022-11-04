import ky from "ky";
import { HttpClient, IApiService, IAuthService } from "./interfaces";

class ApiService implements IApiService {
  private http: HttpClient;

  constructor(private auth: IAuthService) {
    this.http = ky.create({
      prefixUrl: "/api/",
      hooks: {
        beforeRequest: [
          async (request) => {
            await this.auth.updateToken();
            request.headers.set("Authorization", `Bearer ${this.auth.token}`);
          },
        ],
      },
      timeout: false,
    });
  }

  async request(url: string, method: "get" | "post" = "get", options?: any) {
    switch (method) {
      case "get":
        return this.http.get(url).then((res) => res.json());
      case "post":
        return this.http.post(url, options);
    }
  }
}

export default ApiService;
