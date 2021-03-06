var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');


http.createServer(function (req, response) {
    /*
    response.writeHead(200, { 'Content-type': 'text/html' });

    var data = fs.readFileSync('./dice.php.html', 'utf8');

    response.end(data);
    */

    console.log("access");

    //var hostname = req.headers.host;
    //获取pathname
    var pathname = url.parse(req.url).pathname;
    //判断是否为域名地址（简单路由）
    if(pathname == '/'){
        readFileAndResponse('/dice.php.html',response);
    }else{
        readFileAndResponse(pathname,response);
    }

}).listen(8988);

//读取文件并返回response
function readFileAndResponse(pathname,response){
    //判断文件是否存在
    fs.readFile(path.join(__dirname,pathname),'utf8',function(err,data){
        //文件不存在或读取错误返回404，并打印page not found
        if(err){
            response.writeHead(404);
            response.end('page not found');
        }
        else{
        //读取成功返回相应页面信息
            response.end(data);
        }
    });
}