
class FileServices
{

    constructor() {
        this.fs =  require("fs");

    }

     fileExist(file) {

         return this.fs.existsSync(file);
     }

     createFile(file, data){
         this.fs.writeFile(file, data, 'utf8', function (err) {
             if (err) throw new Error(err.message);
         });
     }

     readFile(file) {
         return this.fs.readFileSync(file, 'utf8');
     }

     writeToFile(file, data) {
         this.fs.writeFile(file, data, (err) => {
             if (err) throw err;
         });
     }

}

module.exports = FileServices;
