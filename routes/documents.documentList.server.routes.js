module.exports=function(app){
	
	var documentListCtrl=require("../controllers/documents.documentList.server.controller.js");	
	
	app.get("/api/search",documentListCtrl.searchDocument);
	app.get("/api/docs/edit",documentListCtrl.editDocument);
	app.post("/api/docs/delete",documentListCtrl.deleteDocument);
};
