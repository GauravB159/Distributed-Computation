const request = require("request");
var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var morgan=require("morgan");
app.use(morgan("dev"));
var num;
var func;


app.get('/',function(req,res){
	var urls = ["http://ff6afa28.ngrok.io"];
	num = req.query.num;
	func = req.query.func;
	let range = num / urls.length;
	urls.forEach((url,i)=>{
		let start, end;
		if(i === 0){
			start = 2;
		}else{
			start = i*range + 1
		}
		end = (i+1)*range - 1;
		url = url+`/?prime=${num}&start=${start}&end=${end}`;
		request(url,(err,resp)=>{
			if(err){
				console.log(err);
			}
			console.log(resp.body,i,start,end);
			res.send(resp.body)

		});
	});


});



app.listen(port,function(){
	console.log("Listening on Port",port);
});