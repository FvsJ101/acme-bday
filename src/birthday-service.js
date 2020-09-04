const FileServices = require("./file-service");
const config = require("../config/config.json")
const ApiService = require("./api-service.js");
const Email = require("./entities/Email.js");


class BirthdayService
{
    constructor() {
        this.fileService = new FileServices();
        this.config = config;
        this.repoService = new ApiService();
        this.year = new Date().getFullYear();

        this.addToCachFile = [];

        this.year = new Date().getFullYear();

        this.checkYearCachFileExists();
    }

    checkYearCachFileExists() {

        let file =  this.config.cachPath + "/" + this.year + ".json"

        let json = JSON.stringify({})

        if (!this.fileService.fileExist(file)) {
            this.fileService.createFile(file, json)
        }

    }

    async sendGreeting() {

        await this.repoService.getExclusionEmps();
        await this.repoService.getEmployeesList();

        let cachedList =  this.fileService.readFile(
            this.config.cachPath + "/" + this.year + ".json"
        );

        let counter = 0;

        this.repoService.employeeList.forEach((employee, index) => {

            if (!cachedList.includes(employee.id) && employee.bdayToday === true) {

                counter++;

                let id = employee.id.toString();

                let newData = {id : id};

                this.addToCachFile.push(newData);

                console.log( new Email('Happy B-day', "happy b-day " + employee.name + " " + employee.lastname, employee.email));
            }
        });

        if (!counter) {
            console.log("Sorry no b-days employees today");
        }

        let mergedData = Object.assign({}, this.addToCachFile, JSON.parse(cachedList));

        this.fileService.writeToFile(
            this.config.cachPath + "/" + this.year + ".json",
            JSON.stringify(mergedData)
        );

    }

}

module.exports = BirthdayService