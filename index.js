


const BirthdayService = require("./src/birthday-service");



try {
    let birthdayService = new BirthdayService();

    birthdayService.sendGreeting();


} catch (err) {
    console.log(err.message)
}

//new BirthdayService(config, axios, new FileServices())
