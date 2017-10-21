var fs= require("fs");
var log= require("noogger");
var modelFile= "./templ/template.php";
var conrtrollerFile= "";
var viewFile="";

fs.readFile(modelFile, function(err, data){
    if(err)
        log.error(err);
    else
        log.notice("Success");
});


var DB_NAME= "max_cpe";
var mysql      = require('mysql');
var connectionPool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : DB_NAME
});



/*

connectionPool.query('SHOW FULL TABLES', function (error, results, fields) {
  if (error) throw error;
//   log.info(JSON.stringify(results));

  // results.forEach(function(t) {
      // table= t["Tables_in_"+DB_NAME];
      table= results[0]["Tables_in_"+DB_NAME];
      log.info(table);

      connectionPool.query('SHOW COLUMNS FROM '+table,  function(err,res, fields){
          if(err)
            log.error(err);
          else
            log.notice(JSON.stringify(res,null,3));
      });
      
  // }, this);
});
*/

// used to escape strings to use within regexp
var REGEXP_ESCAPE = /([.?*+^$[\]\\(){}|-])/g; 

function Tokenizer() {
    this.input = '';
    this.tokens = {};
    this.tokenExpr = null;
    this.tokenNames = [];
} 

Tokenizer.prototype.addToken = function(name, expression) {
    // check if expression is RegExp literal
    if (expression instanceof RegExp) {
        // turn RegExp to string
        expression = expression.toString();
        // get rid of leading and trailing slashes
        expression = expression.slice(1, -1);
    } else {
        // replace regular expression characters with "\"
        expression = expression.replace(REGEXP_ESCAPE, '\\$1');
    }
    this.tokens[name] = expression;
}; 

Tokenizer.prototype.tokenize = function(input) {
    this.input = input;
    var tokenExpr = [];
    for (var tokenName in this.tokens) {
        this.tokenNames.push(tokenName);
        tokenExpr.push('('+this.tokens[tokenName]+')');
    }
    this.tokenExpr = new RegExp(tokenExpr.join('|'), 'g');
}; 

Tokenizer.prototype.getToken = function() {
    var match = this.tokenExpr.exec(this.input);
    if (!match) return null;
    for (var c = 1; c < match.length; c++) {
        if (!match[c]) continue;
        return {
            name: this.tokenNames[c - 1],
            pos: match.index,
            data: match[c]
        };
    }
};

var tokenizer=  new Tokenizer();


tokenizer.addToken('identifier','[A-Za-z_][A-Za-z0-9_]+');
tokenizer.addToken('token',/\!\-([\S]*)\-\!/);
tokenizer.addToken('prefix',/\S+\-[\w]+/);
tokenizer.addToken('suffix',/[\w]+\-\S+/);


var token= tokenizer.tokenize("!-TABLES-! !-A-TABLES-csdc-! !-TABLES-[][[_)(*45@-! A-TABLES");

while(token= tokenizer.getToken()){


console.log(token);

}





/*

tokenizer.addToken('identifier','[A-Za-z_][A-Za-z0-9_]+');
tokenizer.addToken('suffix',/\!\-[A-Za-z0-9_]+\-[\w\W]*\-\!/);
tokenizer.addToken('prefix',/\!\-[\w\W]*\-[A-Za-z0-9_]+\-\!/);
tokenizer.addToken('table',/\!\-[A-Za-z0-9_]+\-\!/);
*/