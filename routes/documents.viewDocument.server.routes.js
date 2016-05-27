module.exports=function(app){
	
	var viewDocumentCtrl=require("../controllers/documents.viewDocument.server.controller");
	

	app.get("/readZip",viewDocumentCtrl.readZip);
	app.get("/api/download",viewDocumentCtrl.downloadDocument);
	app.get("/viewDocument",viewDocumentCtrl.viewDocument);
	app.get("/nextDoc",viewDocumentCtrl.nextDocument);
	app.get("/prevDoc",viewDocumentCtrl.prevDocument);
	app.get('/mode',viewDocumentCtrl.userMode);
	
};
