class BirthdayService
{
    constructor(config, fileService, repoService) {
        this.fileService = fileService;
        this.config = config;
        this.repoService = repoService;

        this.checkYearCachFileExists()

    }

    checkYearCachFileExists() {

        let date = new Date();

        let file =  this.config.cachPath + "/" + date.getFullYear() + ".json"

        let json = JSON.stringify({})

        if (!this.fileService.fileExist(file)) {
            this.fileService.createFile(file, json)
        }

    }
}






module.exports = BirthdayService