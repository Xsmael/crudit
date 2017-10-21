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
        files.forEach(function(file) {
            var filePath= path.join(dir, file);
            if( fs.lstatSync(filePath).isDirectory() ) {
                log.debug(filePath);
                parseDir(filePath);    
            }
            else {
                var fileInfo= path.parse(filePath);
                log.warning(filePath);
                if(fileInfo.name =='tmpl') {

                    CRUDit.multiplyFile(filePath, models, function (code, model) {
                        var outFilePath= path.join(fileInfo.dir,model.name+fileInfo.ext);
                        fs.writeFile(outFilePath,code,'utf-8')
                    });
                }
                else {
                    CRUDit.parseFile(filePath, models);
                }
            }
        }, this);
    });
}
