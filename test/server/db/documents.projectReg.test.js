var chai=require('chai');
var mysql=require('mysql');
var db=require('../../../config/db.js');
var connection=mysql.createConnection(db);
var documents=require('../../../config/db/projectRegManager.js');
var objDocument=new documents(connection);
var expect=chai.expect;

describe('bring the project from the DB',function(){
    it('get project',function(done){
        objDocument.getProjects(function(err,result){
            expect(result).to.be.error;
        });
        done();
    });
});

describe('post the project',function(){
    it('post project',function(done){
        objDocument.postProjects({},function(err,result){
            expect(result).to.be.error;
        });
        done();
    });
});



describe('post the project',function(){
    it('post project',function(done){
        objDocument.postProjects({projectCode:'dfgdf',Title:'Mechanical Projects',Department:'mechatronics',subHeads:'CEA-ATMEL',Software:2000,Hardware:2000,catlogCode:'CDB BIO MEDICAL PROJECTS',Domain:'ROBOTICS'},function(err,result){
            expect(result).to.be.error;
        });
        done();
    });
});

describe('edit the project', function(){
    it('edit the project',function(done){
        objDocument.editProjects('jhiuhj',{},function(err,result){
            expect(result).to.be.error;
        });
        done();
    });
});

describe('edit the project', function(){
    it('edit the project',function(done){
        objDocument.editProjects(28,{projectCode:'32125',Title:'Aeronatical Projects',Department:'mechatronics',subHeads:'CEA-OTHERS',Software:1800,Hardware:1500,catlogCode:'CIS-C# NET PROJECTS',Domain:'BIOMEDICAL PROJECTS'},function(err,result){
            expect(result).not.to.be.error;
        });
        done();
    });
});

describe('delete the project', function(){
    it('delete the project',function(done){
        objDocument.deleteProjects('null',function(err,result){
            expect(err).to.be.equal('error');
        });
        done();
    });
});

describe('delete the project', function(){
    it('delete the project',function(done){

        objDocument.deleteProjects({id:'abcd'},function(err,result){

            expect(result).to.be.error;
        });
        done();
    });
});
describe('delete the data', function(){
    it('delete the data',function(done){
        objDocument.deleteProjects(28,function(err,result){
            expect(result).not.to.be.error;
            done();
        });

    });
});






