import createApiClient from "./api.service";

class LoanSlipService {
    constructor(baseUrl = "/api/loanSlip") {
        this.api = createApiClient(baseUrl);
    }

    async create({ books, status, readerId, staffId, _id }) {
        if (_id) {
            return (await this.api.put("/" + _id, { status, readerId, staffId })).data;
        }
        return (await this.api.post("/", { books, status, readerId, staffId, _id })).data;
    }

    async findAll({ page, limit, status }) {
        return (await this.api.get("/", { params: { page, limit, status } })).data;
    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

}
export default new LoanSlipService();