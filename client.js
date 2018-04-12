var express = require("express");
const request = require("request");
var app = express();
const readline = require('readline');
var num;
var func;
var url = "http://localhost:8000/";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question('Enter the number : ', (number) => {
	readline.clearLine()
    rl.question(' Enter the Function : ', (functiom) => {
    	readline.clearLine()
        num = number;
        func = functiom;
        // rl.write("this");
        url = url+"?num="+number;
        request(url,(err,resp)=>{
            if(err){
                console.log(err);
            }
            console.log(resp.body);
		});
        rl.close();
    });
});


// console.log("This",num);