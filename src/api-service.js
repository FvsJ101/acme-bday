class ApiService
{

    constructor(config, axios) {
        this.config = config;
        this.axios = axios;

        this.exclusionList = [];
        this.employeeList = [];

        this.getExclusionEmps();
    }

    async getExclusionEmps() {

        let api = this.config.baseUrl + "/api/BirthdayWishExclusions";

        let result = await this.axios.get(api);

        if (result.status !== "200") {
            throw new Error("Could not retrieve exclusion employees");
        }

        this.exclusionList = result.data;
    }


}

module.exports = ApiService