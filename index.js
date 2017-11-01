var fs= require('fs');
var log= require('noogger');
var path= require('path');
var CRUDit= require('./parser.js');
var projectTemplatePath= './test'
var outputDir='./result';


var globals= {
    "appname": "BussYWellY",
    "FAYE_PORT": "8888"
};
CRUDit.setGlobals(globals);
var models= [
    { 
        name:'Ticket',
        sname:'Tickets',
        fields: ['name','age', 'phone', 'email','address']
    },
    { 
        name:'Parcel',
        sname:'Parcels',
        fields: ['name','age', 'phone', 'email','address']
    },
    {
        name:'Trip',
        sname:'Trips',
        fields: ['name','age', 'phone', 'email','address']
    }
]



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
                var fileName= path.parse(fileInfo.name).name // extracting the real name of the file, without the trailing extension.
                var fileExt= path.parse(fileInfo.name).ext   // extracting the real extension of the file, omitting the .cru extension.
                if( fileName.indexOf('model') !=-1 ) {
                    CRUDit.multiplyFile(filePath, models, function (code, model) {
                        var newFile=  fileName.replace('model',model.name) +fileExt;
                        var outFilePath= path.join(fileInfo.dir,newFile);
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
