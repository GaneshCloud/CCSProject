module.exports=function(app){

	var multiuploadCtrl=require("../controllers/documents.multipleFileUpload.server.controller");
	app.post("/uploadMulti",multiuploadCtrl.uploadMultiple);
	
};
