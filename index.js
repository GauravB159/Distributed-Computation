const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(req.query); 
    let prime = req.query.prime;
    let start = req.query.start;
    let end = req.query.end;
    let divisible = false;
    for(let i = start; i*i <= end;){
        if(prime % i === 0){
            divisible = true;
            break;
        }
        if(i === 2){
            i++;
        }else{
            i+=2;
        }
    }
    return res.send(divisible)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))