import createApiClient from "./api.service";

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.api = createApiClient(baseUrl);
    }

    async create({ userName, password }) {
        return (await this.api.post("/", { userName, password })).data;
    }


}

export default new ReaderService();