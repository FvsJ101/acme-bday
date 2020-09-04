const axios = require('axios').default;
const config = require("../config/config.json")
const Employee = require("./entities/Employee.js");
const moment = require("moment");

class ApiService {

    constructor() {
        this.config = config;
        this.axios = axios;

        this.exclusionList = [];
        this.employeeList = [];

        this.getEmployeesList()
    }

    getFormattedEmployees()
    {
        return this.employeeList;
    }

    async getExclusionEmps() {

        let api = this.config.baseUrl + "/api/BirthdayWishExclusions";

        let result = await this.axios.get(api);

        if (result.status !== 200) {
            throw new Error("Could not retrieve exclusion employees list");
        }
    }

    async getEmployeesList() {

        let api = this.config.baseUrl + "/api/Employees";

        let result = await this.axios.get(api);

        if (result.status !== 200) {
            throw new Error("Could not retrieve employees list");
        }

        result.data.forEach((empDetails, index) => {

            let futureTest = this.checkStartDateFuture(moment(empDetails.employmentStartDate));
            let notWorking = this.terminated(empDetails.employmentEndDate); //moment("2016-10-01T00:00:00")

            if (!futureTest && !notWorking && !this.exclusionList.includes(empDetails.id)) {

                this.employeeList.push(
                    this.formatEmployee(empDetails)
                );
            }
        });
    }

    checkStartDateFuture(testDate) {
        let now = moment();

        return now < testDate // false meaning

    }

    formatEmployee(empDetails) {

        let date = new Date();
        let empDetail = new Date(empDetails.dateOfBirth);

        let empDay = empDetail.getDate();
        let empMonth = empDetail.getMonth() + 1;

        let currDay = date.getDate();
        let currMonth = date.getMonth() + 1;

        return Employee(
            empDetails.id,
            empDetails.name,
            empDetails.lastname,
            empDetails.dateOfBirth,
            (empDetails.hasOwnProperty("email"))? empDetails.email : "",
            empDetails.employmentStartDate,
            empDetails.employmentEndDate,
            (empDay === currDay && empMonth === currMonth)
        );
    }

    terminated(testDate) {

        if (testDate == null) {
            return false
        }

        let now = moment()

        return now > moment(testDate);

    }


}

module.exports = ApiService