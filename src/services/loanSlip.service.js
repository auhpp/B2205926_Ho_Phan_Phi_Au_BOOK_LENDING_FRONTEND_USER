import createApiClient from "./api.service";

class LoanSlipService {
    constructor(baseUrl = "/api/loanSlip") {
        this.api = createApiClient(baseUrl);
    }

    async create({ books, borrowedDate, returnDate, status, readerId, staffId, _id }) {
        return (await this.api.post("/", { books, borrowedDate, returnDate, status, readerId, staffId, _id })).data;
    }

    async findAll({ page, limit, status }) {
        return (await this.api.get("/", { params: { page, limit, status } })).data;
    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

}
export default new LoanSlipService();