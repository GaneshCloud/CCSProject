// /**
//  * Created by Administrator on 6/6/2016.
//  */
//
// var expect  = require("chai").expect;
// var sinon   = require("sinon");
// var Document = require("../../../routes/documents.documentList.server.routes");
// var documentListCtrl = require('../../../controllers/documents.documentList.server.controller.js');
// var documentListCtrl={
//     searchDocument:function(){
//         return true
//     },
//     editDocument:function(){
//         return true
//     },
//     deleteDocument:function(){
//
//     }
//
// };
// var supertest = require('supertest');
// var server;
//
// describe("documentList routes",function(){
//     before(function () {
//         server = require('../../../server').server;
//        // this.timeout(40000);
//     });
//
//     this.timeout(40000);
//     it('should call search once', function(done) {
//         var searchDocument = sinon.spy(documentListCtrl, 'searchDocument');
//         supertest(server).get('/api/search');
//             documentListCtrl.searchDocument();
//             sinon.assert.calledOnce(searchDocument);
//             done();
//
//     });
//
//     it('should call edit once', function(done) {
//         var editDocument = sinon.spy(documentListCtrl, 'editDocument');
//         supertest(server).get('/api/docs/edit');
//         documentListCtrl.editDocument();
//         sinon.assert.calledOnce(editDocument);
//         done();
//
//     });
//     it('should call delete once', function(done) {
//         var deleteDocument = sinon.spy(documentListCtrl, 'deleteDocument');
//         supertest(server).post('/api/docs/delete');
//         documentListCtrl.deleteDocument();
//         sinon.assert.calledOnce(deleteDocument);
//         done();
//
//     });
//
// });
//
// after(function () {
//     server.close();
// });
//
