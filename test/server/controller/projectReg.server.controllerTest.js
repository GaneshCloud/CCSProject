var chai=require('chai');

var mysql=require('mysql');

var controlDocuments=require('../../../controllers/project.projectReg.server.controller.js');

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

describe('bring the data from the database',function(){

    it('getdata',function(done){
        var req={
            body:{data:'5'}

        }

        var res={
            send:function(data){
                expect(data).not.to.be.error;
                done();
            }
        };

        controlDocuments.getData(req,res);


    });

});

it('getdata',function(done){
    var req={};

    var res={
        send:function(data){
            expect(data).not.to.be.error;
            done();
        }
    };

    controlDocuments.getData(req,res);


});



describe('post the data',function(){

    it('postdata',function(done){
        var req={};

        var res={
            send:function(data){
                expect(data).to.be.error;
                done();
            }
        };
        controlDocuments.postData(req,res);
    });

});

describe('post the data',function(){

    it('post datas',function(done){
        var req={
            body:{projectCode:'dfgdf',Title:'Mechanical Projects',Department:'mechatronics',subHeads:'CEA-ATMEL',Software:2000,Hardware:2000,catlogCode:'CDB BIO MEDICAL PROJECTS',Domain:'ROBOTICS'}
        };

        var res={
            send:function(data){
                expect(data).not.to.be.error;
                done();
            }
        };
        controlDocuments.postData(req,res);
    });

});


describe('edit the data1',function(){

    it('editdata',function(done){


        var req={
            body:{},
            params:{id:'hai'}
        };
        var res={
            send:function(data){
                expect(data).to.be.error;
                done();
            }
        };

        controlDocuments.EditData(req,res);

    });
});




describe('edit the data2',function(){

    it('editdata',function(done){


        var req={
            body:{id:28,projectCode:'32125',Title:'Aeronatical Projects',Department:'mechatronics',subHeads:'CEA-OTHERS',Software:1800,Hardware:1500,catlogCode:'CIS-C# NET PROJECTS',Domain:'BIOMEDICAL PROJECTS'},
            //params:{id:28}
        };
        var res={
            send:function(data){
                expect(data).not.to.be.error;
                done();
            }
        };


        controlDocuments.EditData(req,res);

    });
});

describe('delete the data1',function(){

    it('deletedata',function(done){


        var req={
            body:{},
            params:{id:'hai'}
        };
        var res={
            send:function(data){
                expect(data).to.be.error;
                done();
            }
        };

        controlDocuments.DeleteData(req,res);

    });
});




describe('delete the data2',function(){

    it('deletedata',function(done){


        var req={
            body:{id:28,projectCode:'32125',Title:'Aeronatical Projects',Department:'mechatronics',subHeads:'CEA-OTHERS',Software:1800,Hardware:1500,catlogCode:'CIS-C# NET PROJECTS',Domain:'BIOMEDICAL PROJECTS'},
            //params:{}
        };
        var res={
            send:function(data){
                expect(data).not.to.be.error;
                done();
            }
        };


        controlDocuments.DeleteData(req,res);

    });
});



