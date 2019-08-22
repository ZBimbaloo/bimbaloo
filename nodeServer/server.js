//引入http模块
var http = require('http');
//引入url模块
var url = require('url');
//引入fs模块
var fs = require('fs');
//引入path模块
var path = require('path');

//创建服务器
http.createServer(function(req, res) {

	var pathName =url.parse(req.url).pathname ; //获取浏览器输入并过滤参数	
	
	if(pathName == "/") { //配置默认路径
		pathName = "index.html";
	}
	
	var extName=path.extname(pathName);//获取浏览器输入地址后缀名
	//var mimeModel=require('./model/getmime.js');//获取后缀扩展名方法
    var mimeModel=require('./model/getmimefromfile.js');//获取后缀扩展名方法
	if(pathName != "/favicon.ico") {
		fs.readFile("static/" + pathName, function(err, data) {
			if(err) {
				fs.readFile("static/404.html", function(error,data404){
					res.writeHead(200, {
					"Content-Type": "text/html;charset=UTF-8"
				    });
				    res.write(data404);
				    res.end();
				})
			} else {
				var mime=mimeModel.getmime(fs,extName);//获取后缀扩展名
				res.writeHead(200, {
					"Content-Type":""+mime+";charset=UTF-8"
				});
				res.write(data);
				res.end();
			}
		})

	}

}).listen(8002);