var express = require("express");
const request = require("request");
var app = express();
const readline = require('readline');
var num;
var func;
var url = "http://83db25f2.ngrok.io"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question('Enter the number to check if it is prime: ', (number) => {
	readline.clearLine()
    num = number;
    func = functiom;
    // rl.write("this");
    url = url+"?num="+number;
    request(url,(err,resp)=>{
        if(err){
            console.log(err);
        }
        if(resp.body === "false"){
            console.log("The entered number is not prime.")
        }else{
            console.log("The entered number is prime.")
        }
    });
    rl.close();
});


// console.log("This",num);