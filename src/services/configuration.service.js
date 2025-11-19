import createApiClient from "./api.service";

class ConfigurationService {
    constructor(baseUrl = "/api/configuration") {
        this.api = createApiClient(baseUrl);
    }

    async findByName(name) {
        return (await this.api.get(`/name/${name}`)).data;
    }

}

export default new ConfigurationService();