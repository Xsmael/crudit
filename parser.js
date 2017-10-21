var fs= require('fs');
// var log= require('nogger');

inFile='test.html';
outFile= 'out.html';
fs.readFile(inFile,'utf8',function (err, data) {
    if(err) {console.log(err); return}
    outputString= parse(data);
    fs.writeFile(outFile,outputString, function (err) {
        if(err) console.log("error: "+err);
    })
})

// var modelRE= /\!([a-zA-Z0-9_ $&+,:;=?@#{}|'<>.^*()%/-]+)?<([a-zA-Z0-9]+)>([a-zA-Z0-9_ $&+,:;=?@#{}|'<>.^*()%/-]+)?\!/g;
var modelRE= /\!(.*?)<([a-zA-Z0-9]+)>(.*?)\!/g;
var multiplyRE= /\!\!>multiply([^]+?)<\!\!/g;


var GET= {
    PREFIX: 1, KEY:2, SUFFIX: 3 
}

var models= [
    { 
        name:'user',
        sname:'users',
        fields: ['name','age', 'phone', 'email','address']
    },
    { 
        name:'account',
        sname:'account',
        fields: ['date_openning','capacity', 'branch', 'owner','last_connected']
    },
    { 
        name:'Vehicle',
        sname:'Vehicle',
        fields: ['brand','model', 'type', 'seats','number_plate']
    }
];

function parse(str) {
    var outputString = str;
    var token;

    //Phase 1: Multiply
    while( token= multiplyRE.exec(str) ) {
        var code= multiplyCode(token, models);
        outputString= outputString.replace(token[0],code);        
    }
    //Phase 2: Models

    console.log('finish');
    console.log(token);
    return outputString;
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

function multiplyCode(token, models) {
    var codeParts= token[1];
    console.log(codeParts);
    var code="";
    models.forEach(function (model) {
        code+= applyModel(codeParts,model);
    });
    console.log(code);
    return code;
    
}
function multiplyFile(token, models) {
    var codeParts= token[1];
    console.log(codeParts);
    var code="";
    models.forEach(function (model) {
        code+= applyModel(codeParts,model);
    });
    console.log(code);
    return code;
    
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
            console.log('Unhandled  keyword: '+ keyword);
            console.log(token);
            break;
    }
}
 
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
