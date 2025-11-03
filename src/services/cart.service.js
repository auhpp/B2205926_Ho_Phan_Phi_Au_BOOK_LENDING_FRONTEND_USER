import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit }) {
        return (await this.api.get("/", { params: { page, limit } })).data;
    }

    async create({ quantity, bookId }) {
        return (await this.api.post("/", { quantity, bookId })).data;
    }

    async deleteById(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new CartService();