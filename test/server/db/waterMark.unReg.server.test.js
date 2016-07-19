var chai=require('chai');
var mysql=require('mysql');
var db=require('../../../config/db.js');
var connection=mysql.createConnection(db);
var documents=require('../../../config/db/documents/waterMarkUnRegister.js');
var objDocument=new documents(connection);
var expect=chai.expect;

describe('bring the project from the DB',function(){
    it('get pdf files',function(done){
        objDocument.getPdfFiles(function(err,result){
            expect(result).to.be.error;
            done();
        });

    });

});