module.exports=function(app){

	
	var singluploadCtrl=require("../controllers/documents.singleFileUpload.server.controller");
	
	app.post("/documents/upload",singluploadCtrl.upload);
	app.get("/api/dep",singluploadCtrl.getDepartment);



};
