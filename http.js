const http=require ('http');

const sv = http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write('<h1>Titulo h1</h1>');
        res.write('<h2> Titulo h2</h2>');
        res.end();
});
sv.listen(2020);
/*sv.on('connection',(socket)=>{
    console.log('nueva conexion');

})
sv.listen(2012);
console.log('puerto 2012');*/
