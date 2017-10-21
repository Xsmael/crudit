var fs= require('fs');
var log= require('noogger');
var path= require('path');
var projectTemplatePath= './test'

// fs.readdir(projectTemplatePath, function (err,files) {
//     console.log(files);

//     files.forEach(function(file) {
//         var filePath= path.join(projectTemplatePath, file);
//         if( fs.lstatSync(filePath).isDirectory() ) {
//             log.debug(file);

//         }
//         else {
//             // parse();
//             log.warning(file);
//         }
//     }, this);
// });


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
                //parse();
                log.warning(filePath);
            }
        }, this);
    });
}
