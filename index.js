const express = require('express')
const app = express()
const ngrok = require('ngrok');
const request = require("request");
const serverURL = "http://localhost:8000/"
app.get('/', (req, res) => {
    let prime = parseInt(req.query.prime);
    let start = parseInt(req.query.start);
    let end = parseInt(req.query.end);
    let divisible = false;
    
    for(let i = start; i <= end;i++){     
           
        if(prime % i === 0){
            divisible = true;
            break;
        }
    }    
    return res.send(divisible)
})
app.listen(3000, () => console.log('Workstation ready to work!'))

let ngrokurl;
(async ()=>{
    try{
        ngrokurl = await ngrok.connect(3000);
        request.post({url:"http://localhost:8000/register", form: {addurl:ngrokurl}},(err,resp)=>{
            if(err){
                console.log(err);
            }
        });
        console.log("Workstation running on : "+ ngrokurl);
    }catch(e){
      console.log(e)
    }
})();

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    request.post({url:"http://localhost:8000/remove", form: {removeurl:ngrokurl}},(err,resp)=>{
        if(err){
            console.log(err);
        }
        process.exit();
    });
}

process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null));
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));
process.on('uncaughtException', exitHandler.bind(null));