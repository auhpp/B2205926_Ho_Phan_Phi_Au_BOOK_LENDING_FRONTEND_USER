import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit }) {
        return (await this.api.get("/")).data;
    }


    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}

export default new BookService();