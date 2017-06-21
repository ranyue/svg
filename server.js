var fs = require('fs'); 
var url = require('url');
var http = require('http'); 
var path = require('path');
var express =require('express')
var app = express()
var server = http.createServer(app)

var io = require('socket.io').listen(server);
var content = [];
var root = __dirname;
app.use(function(req,res,next){
   if(content.indexOf(req.url) == -1  && (req.url === "/" || req.url === "/static/header.css" || req.url === "/static/styles.css" )){
       content.push(req.url);
        var file =url.parse(req.url).pathname;
        var mode = 'stylesheet';
        if(file[file.length-1] == '/'){
            file +='index.html'
            mode = 'reload'
        }
        createWatcher(file,mode)
   }
      next()
})
app.use(express.static(root))


function createWatcher(file,event){
    var absolute = path.join(root,file);
    fs.watchFile(absolute,function(curr,prev){
        if(curr.mtime !== prev.mtime){
            io.sockets.emit(event,file)
        }
    })
}
server.listen(8000,function(){
    console.log('server listen at 8000');
})