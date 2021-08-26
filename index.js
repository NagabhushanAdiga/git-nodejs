const http = require('http');

http.createServer((req,res)=>{
    console.log(res)
    res.write("<h1>hey there about feature</h1>");
    res.write("<h1>404-branch</h1>");
    res.end()
})
.listen(8080)
