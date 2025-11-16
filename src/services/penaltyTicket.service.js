import createApiClient from "./api.service";

class PenaltyTicketService {
    constructor(baseUrl = "/api/penaltyTicket") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit, paymentStatus }) {
        return (await this.api.get("/", { params: { page, limit, paymentStatus } })).data;
    }
}

export default new PenaltyTicketService();