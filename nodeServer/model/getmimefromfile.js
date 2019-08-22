
//通过json文件获取后缀名方法
exports.getmime = function(fs, extName) {
	//异步
//	fs.readFile("mime.json", function(err, data) {
//		if(err){
//			return false;
//		}
//		var Mimes=json.parse(data.toString());
//		return Mimes[extName]||'text/html';
//	})

    //同步
    var data=fs.readFileSync('./mime.json');
    var Mimes=JSON.parse(data.toString());
	return Mimes[extName]||'text/html';
    
}