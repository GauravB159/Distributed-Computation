const request = require("request");
var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var morgan=require("morgan");
var bodyParser = require('body-parser')

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var num;
var func;
var urls = [];


app.get('/',function(req,res){
	num = req.query.num;
	func = req.query.func;
	let range = Math.ceil(Math.sqrt(num) / urls.length);	
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
			if(responses === urls.length){				
				res.send(prime)
			}
		});
	});


});
app.post('/register',function(req,res){
	urls.push(req.body.addurl);
	console.log("A workstation has been added to the cluster")

});
app.post('/remove',function(req,res){
	let index = urls.indexOf(req.body.removeurl);
	if (index > -1) {
		urls.splice(index, 1);
		console.log("A workstation has been removed from the cluster")
	}
	res.send("OK")
});

app.listen(port,function(){
	console.log("Listening on Port",port);
});