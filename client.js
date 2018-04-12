var express = require("express");
const request = require("request");
var app = express();
const readline = require('readline');
var num;
var func;
var url = "#";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question('enter the number : ', (number) => {
	readline.clearLine()
    rl.question(' Enter the Function : ', (functiom) => {
    	readline.clearLine()
        num = number;
        func = functiom;
        // rl.write("this");
        url = url+"";
        request(url,(err,resp)=>{
		if(err){
			console.log(err);
		}
		console.log(resp);
		});
        rl.close();
    });
});


// console.log("This",num);