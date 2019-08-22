//获取后缀名方法
exports.getmime=function(extName){
	switch(extName){
		case '.html':
		    return 'text/html';
		
		case '.css':
		    return 'text/css';
		
		case '.js':
		     return 'text/javascript';
		
		default:
		   return 'text/html';
		
	}
}
