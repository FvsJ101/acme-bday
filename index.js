

const config = require("./config/config.json")
const FileServices = require("./src/file-service");
const BirthdayService = require("./src/birthday-service");
const ApiService = require("./src/api-service.js");
const axios = require('axios').default;


new ApiService(config, axios);

//new BirthdayService(config, axios, new FileServices())
