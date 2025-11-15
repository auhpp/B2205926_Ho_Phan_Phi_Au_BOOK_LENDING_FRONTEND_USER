import createApiClient from "./api.service";

class LoanSlipService {
    constructor(baseUrl = "/api/loanSlip") {
        this.api = createApiClient(baseUrl);
    }

    async create({ books, borrowedDate, returnDate, status, readerId, staffId }) {
        return (await this.api.post("/", { books, borrowedDate, returnDate, status, readerId, staffId })).data;
    }

}
export default new LoanSlipService();