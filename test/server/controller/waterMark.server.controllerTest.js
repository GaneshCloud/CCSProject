var chai=require('chai');
var mysql=require('mysql');
var controlDocuments=require('../../../controllers/waterMark.unRegister.server.controller.js');
var expect=chai.expect;
describe('design path',function(){
    it('path',function(done){
        var req={
        }
        var res={
            sendfile:function(data){
                expect(data).not.to.be.equal('public/app/core/layout.html');
                done();
            }
        };
        controlDocuments.home(req,res);
    });
});

describe('bring the project from the database',function(){
    it('getAllPdfFiles',function(done){
        var req={
            body:{data:'8'}
        }
        var res={
            send:function(data){
                expect(data).not.to.be.error;
                done();
            }
        };
        controlDocuments.getAllDoc(req,res);
    });
});

it('getAllProject',function(done){
    var req={};
    var res={
        send:function(data){
            expect(data).not.to.be.error;
            done();
        }
    };
    controlDocuments.getAllDoc(req,res);
});
