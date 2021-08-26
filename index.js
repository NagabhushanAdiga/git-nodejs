const http = require('http');

http.createServer((req,res)=>{
    console.log(res)
    res.write("<h1>hey there</h1>");
    res.end()
})
.listen(8080)
