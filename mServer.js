const request = require("request");
var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var morgan=require("morgan");
app.use(morgan("dev"));
var num;
var func;


app.get('/',function(req,res){
	var urls = ["http://ff6afa28.ngrok.io","http://6d83603a.ngrok.io"];
	num = req.query.num;
	func = req.query.func;
	let range = Math.ceil(Math.sqrt(num) / urls.length);
	console.log(range);
	
	let prime = true;
	let responses = 0;
	urls.forEach((url,i)=>{
		let start, end;
		if(i === 0){
			start = 2;
		}else{
			start = i*range;
		}
		end = (i+1)*range - 1;
		url = url+`/?prime=${num}&start=${start}&end=${end}`;
		request(url,(err,resp)=>{
			if(err){
				console.log(err);
			}
			responses++;
			if(resp.body === "true"){
				prime = false;
			}
			console.log(resp.body, prime);

			if(responses === urls.length){
				console.log(responses,urls.length,prime);
				
				res.send(prime)
			}
		});
	});


});



app.listen(port,function(){
	console.log("Listening on Port",port);
});