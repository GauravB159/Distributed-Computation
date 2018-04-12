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
    console.log(`This workstation is working on the number ${prime} and checking the range ${start}-${end}`);
    for(let i = start; i <= end;i++){     
           
        if(prime % i === 0){
            divisible = true;
            break;
        }
    }    
    if(divisible){
        console.log(`The number ${prime} is divisible in the range ${start}-${end}`);
    }else{
        console.log(`The number ${prime} is not divisible in the range ${start}-${end}`);
    }
    return res.send(divisible)
})
app.listen(3000, () => console.log('Workstation ready to work!'))

let ngrokurl;
(async ()=>{
    try{
        ngrokurl = await ngrok.connect(3000);
        request.post({url:`${serverURL}register`, form: {addurl:ngrokurl}},(err,resp)=>{
            if(err){
                console.log(err);
            }
        });
        console.log("Workstation running on : "+ ngrokurl);
    }catch(e){
      console.log(e)
    }
})();

process.stdin.resume();

function exitHandler(options, err) {
    request.post({url:`${serverURL}remove`, form: {removeurl:ngrokurl}},(err,resp)=>{
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