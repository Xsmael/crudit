var fs= require('fs');
var log= require('noogger');
var path= require('path');
var CRUDit= require('./parser.js');
var projectTemplatePath= './test'
var outputDir='./result';

var models= [
    { 
        name:'User',
        sname:'Users',
        fields: ['name','age', 'phone', 'email','address']
    },
    { 
        name:'Account',
        sname:'Account',
        fields: ['date_openning','capacity', 'branch', 'owner','last_connected']
    },
    { 
        name:'Vehicle',
        sname:'Vehicle',
        fields: ['brand','model', 'type', 'seats','number_plate']
    }
];



parseDir('./test');


function parseDir(dir) {
    fs.readdir(dir, function (err,files) {  
        if(files.indexOf('!ignore') != -1) {
            log.info("ignoring "+dir);
            return;
        }
        files.forEach(function(file) {
            var filePath= path.join(dir, file);
            if( fs.lstatSync(filePath).isDirectory() ) {
                log.debug(filePath);
                parseDir(filePath);    

                
            }
            else {
                var fileInfo= path.parse(filePath);
                log.warning(filePath);
                var fileName= path.parse(fileInfo.name).name // extracting the real name of the file, without  .cru extension.
                var fileExt= path.parse(fileInfo.name).ext   // extracting the real extension of the file, without the .cru extension.
                if( fileName=='model') {

                    CRUDit.multiplyFile(filePath, models, function (code, model) {
                        var outFilePath= path.join(fileInfo.dir,model.name+fileExt);
                        fs.writeFile(outFilePath,code,'utf-8');
                    });
                }
                else if(fileInfo.ext=='.cru') {
                    CRUDit.parseFile(filePath, models, function (code) {
                        var outFilePath= path.join(fileInfo.dir,fileName+fileExt);
                        fs.writeFile(outFilePath,code,'utf-8');
                    });
                }
            }
        }, this);
    });
}
