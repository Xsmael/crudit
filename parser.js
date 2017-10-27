var fs= require('fs');
var log= require('noogger');

// var modelRE= /\!([a-zA-Z0-9_ $&+,:;=?@#{}|'<>.^*()%/-]+)?<([a-zA-Z0-9]+)>([a-zA-Z0-9_ $&+,:;=?@#{}|'<>.^*()%/-]+)?\!/g;
var modelRE= /\!(.*)<([a-zA-Z0-9]+)>(.*)\!/g;
var multiplyRE= /\!\!>multiply([^]+?)<\!\!/g;
var GLOBALS= {};
var GET= {
    PREFIX: 1, KEY:2, SUFFIX: 3 
}

function parseFile(file, models, callb) {
    
    fs.readFile(file,'utf8',function (err, str) {
        if(err) {console.log(err); return}

        var outputString = str;
        var token;
        while( token= multiplyRE.exec(str) ) {
            var code= multiplyCode(token, models);
            outputString= outputString.replace(token[0],code);        
        }
        if(typeof callb === 'function')  callb(outputString);
    });    
}

function multiplyFile(file, models, callb) {
    fs.readFile(file,'utf8',function (err, str) {
        if(err) {console.log(err); return}

        var code="";
        models.forEach(function (model) {
            code= applyModel(str, model);
            if(typeof callb === 'function') callb(code, model);
        });
    });
}


function multiplyCode(token, models) {
    var codeParts= token[1];
    // console.log(codeParts);
    var code="";
    models.forEach(function (model) {
        code+= applyModel(codeParts,model);
    });
    // console.log(code);
    return code;
    
}
function applyModel(str, model) {
    var outputString = str;    
    while( token= modelRE.exec(str) ) {
        // console.log(token[1]);
        var code= generateCode(token, model);
        outputString= outputString.replace(token[0],code);        
    }
    return outputString;    
}

function generateCode(token, model) {
    var keyword= token[GET.KEY];
    switch (keyword) {
        case 'model':
            return model.name;
            break;
        case 'models': case 'smodel':
            return model.sname;
            break;
        case 'fieldlist':
            var code="";
            model.fields.forEach(function(field) {
                code+=  (token[GET.PREFIX] || '') + field + ( token[GET.SUFFIX] || '')+'\n';
            }, this);
            return code;
            break;
    
        case 'proplist':
            var code="";
            model.fields.forEach(function(field) {
                code+=  (token[GET.PREFIX] || '') +model.name+'.'+field + ( token[GET.SUFFIX] || '')+'\n';
            }, this);
            return code ;
            break;
            
        default:
            if(GLOBALS[keyword]) {
                log.notice('glabal var: '+ keyword);
                return GLOBALS[keyword];
            }            
            else    log.critical('Unhandled  keyword: '+ keyword);
            break;
    }
}

function setGlobals(globalVar) {
    GLOBALS= globalVar;
}

exports.parseFile=  parseFile;
exports.multiplyFile= multiplyFile;
exports.setGlobals= setGlobals;
 
/**
 Keywords:
 TABLES
 TABLE
 FIELDS
 PRIKEY
 FORKEY
 
 !-$-FIELDS-!   prefix all items with the char '$'
 !-FIELDS-$-!   suffix all items with the char '$'
 !-FIELDS*?-!   places all items with the char '?'
 !$_GET['-FIELDS-']!   wrap all items with the char '$_GET['']'
 !$_GET['-FIELDS-']!   wrap all items with the char '$_GET['']'
 
 ! <th> <<fieldlist>> th>!

*/
