var chai=require('chai');

var mysql=require('mysql');
var db=require('../../../config/db.js');
var connection=mysql.createConnection(db);
var documents=require('../../../config/db/projectRegManager.js');
var objDocument=new documents(connection);

var expect=chai.expect;





// describe('mysql connection',function(){

// it('should connect with database',function(done){

// var connection=mysql.createConnection({

// host : 'localhost',

// user : 'root',

// password : '',

// database : 'erp_data'

// });
// connection.connect(done);
// });
// });


describe('bring the data from the DB',function(){

    it('grid datas',function(done){

        objDocument.GET_DATA(function(err,result){



            expect(result).to.be.error;


        });
        done();
    });

});

describe('post the data',function(){

    it('post datas',function(done){

        objDocument.POST_DATA({},function(err,result){



            expect(result).to.be.error;

        });
        done();
    });

});



describe('post the data',function(){

    it('post datas',function(done){

        objDocument.POST_DATA({projectCode:'dfgdf',Title:'Mechanical Projects',Department:'mechatronics',subHeads:'CEA-ATMEL',Software:2000,Hardware:2000,catlogCode:'CDB BIO MEDICAL PROJECTS',Domain:'ROBOTICS'},function(err,result){



            expect(result).to.be.error;

        });
        done();
    });

});





describe('edit the data', function(){

    it('edit the data',function(done){

        objDocument.EDIT_DATA('jhiuhj',{},function(err,result){

            expect(result).to.be.error;

        });
        done();
    });
});

describe('edit the data', function(){

    it('edit the data',function(done){

        objDocument.EDIT_DATA(28,{projectCode:'32125',Title:'Aeronatical Projects',Department:'mechatronics',subHeads:'CEA-OTHERS',Software:1800,Hardware:1500,catlogCode:'CIS-C# NET PROJECTS',Domain:'BIOMEDICAL PROJECTS'},function(err,result){

            expect(result).not.to.be.error;

        });
        done();
    });
});


describe('delete the data', function(){
    it('delete the data',function(done){

        objDocument.DELETE_DATA('null',function(err,result){


            expect(err).to.be.equal('error');
        });
        done();
    });
});

describe('delete the data', function(){
    it('delete the data',function(done){

        objDocument.DELETE_DATA({id:'abcd'},function(err,result){

            expect(result).to.be.error;
        });
        done();
    });
});
describe('delete the data', function(){
    it('delete the data',function(done){

        objDocument.DELETE_DATA(28,{projectCode:'32125',Title:'Aeronatical Projects',Department:'mechatronics',subHeads:'CEA-OTHERS',Software:1800,Hardware:1500,catlogCode:'CIS-C# NET PROJECTS',Domain:'BIOMEDICAL PROJECTS'},function(err,result){

            expect(result).not.to.be.error;
        });
        done();
    });
});






