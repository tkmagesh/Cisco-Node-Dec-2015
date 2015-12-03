/**
 * http://usejsdoc.org/
 */
var path = require('path');
var url = require('url');
var qs = require('querystring');
function createDaoFromReqObj(req)
{
	var pathObj = url.parse(req.url,true),
	    fileName = pathObj.pathname,
		fileExtension = path.extname(fileName),
		filePhysicalPath = path.join(__dirname,fileName),
		query = pathObj.query,
		getQueryFromQS = function(str)
		{
			var reqData = qs.parse(str);
			return reqData;
		},
		obj = {
			'fileName' : fileName,
			'fileExtension' : fileExtension,
			'filePhysicalPath':filePhysicalPath,
			'query':query,
			'getQueryFromQS':getQueryFromQS
	};
		console.log("OBJ vij",obj);
	return obj;
}
module.exports = createDaoFromReqObj;
