const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(req.query); 
    let prime = req.query.prime;
    let start = req.query.start;
    let end = req.query.end;
    let divisible = false;
    for(let i = start; i <= end;i++){
        if(prime % i === 0){
            divisible = true;
            break;
        }
    }
    let message;
    if(divisible){
        message = `Given number ${prime} is divisible within given range ${start}-${end}`;
    }else{
        message = `Given number ${prime} is not divisible within given range ${start}-${end}`;
    }
    return res.send(message)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))