const request = require("request");
var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var morgan=require("morgan");
app.use(morgan("dev"));
var num;
var func;
var url = "http://dc56938f.ngrok.io/?prime=";


app.get('/',function(req,res){
	num = req.query.num;
	func = req.query.func;
	console.log(num);
	console.log(func);
	url = url+num+"&start=1&end=50";
	request(url,(err,resp)=>{
		if(err){
			console.log(err);
		}
		res.send(resp)

	});


});



app.listen(port,function(){
	console.log("Listening on Port",port);
});