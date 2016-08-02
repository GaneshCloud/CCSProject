
var mysql = require('mysql');
var q=require('q');
var data = '';
var db = require('./../chatdb');
var con = mysql.createConnection(db);

console.log(con);

function send_msg(data_server) {
    var deferred = q.defer();

    var sendData ='INSERT INTO tb_sendmsg(my_userid,select_userid,msg,Dates,image,file,profile_pic,meg_read)';
        sendData +='values(?,?,?,now(),?,?,?,?)';
    var query = mysql.format(sendData,[data_server.my_userid,data_server.selectUserid,data_server.msg,data_server.image,data_server.file,data_server.profile_pic,data_server.msg_read]);
    con.query(query,function(err, result) {
        console.log(query);
        if (err) {
            deferred.reject(err);
        } else {
                getChatinfo().then(function(result)
            {
                deferred.resolve(result);

            });// "select q.id,q.select_userid,q.select_userid as select_userid2,q.msg,q.Dates as date,q.image as image,q.profile_pic as profilePic,q.file,q.my_userid,q.my_userid as my_userid2,personaldata.fname as name,personaldata.mname,personaldata.profile_pic as profilePic,personaldata.lname from tb_sendmsg as q INNER JOIN personaldata ON personaldata.userid=q.my_userid where personaldata.status='active' order by q.Dates DESC";
            // var data="select * from tb_sendmsg where id="+result.insertId;
            // console.log("select * from tb_sendmsg where id="+result.insertId);
                }
            });

    return deferred.promise;
}


function getChatinfo() {
    console.log("haaaa");
    var deferred = q.defer();
    var getChatinfo = "select q.id,q.select_userid,q.select_userid as select_userid2,q.msg,q.Dates as date,q.image as image,q.profile_pic as profilePic,q.file,q.my_userid,q.my_userid as my_userid2,personaldata.fname as name,personaldata.mname,personaldata.profile_pic as profilePic,personaldata.lname from tb_sendmsg as q INNER JOIN personaldata ON personaldata.userid=q.my_userid where personaldata.status='active' order by q.Dates DESC";
    console.log("select * from tb_sendmsg");
    con.query(getChatinfo, function (err,result) {
        if (err) {
            deferred.reject(err);
        } else {
            console.log(result);
            deferred.resolve(result);
        }
    });
        return deferred.promise;
}

function getReadinfo(id) {
    console.log("haaaa");
    var deferred = q.defer();
    var getReadinfo = "select q.id,q.my_userid,q.select_userid,count(q.meg_read) as readCount from tb_sendmsg q where meg_read = 0 and Q.select_userid='"+id+"' group by q.my_userid" ;
    console.log("select * from tb_sendmsg");
    con.query(getReadinfo, function (err,result) {
        if (err) {
            deferred.reject(err);
        } else {
            console.log(result);
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}


function msgreadInfo(data) {
    console.log("haaaa");
    var deferred = q.defer();
    var msgReadInfo = "UPDATE tb_sendmsg SET meg_read=1 WHERE select_userid='"+data.my_userid+"' and my_userid='"+data.selectUserid+"'";
    console.log("select * from tb_sendmsg");
    con.query(msgReadInfo, function (err,results) {
        if (err) {
            deferred.reject(err);
        } else {
            console.log(results);
            deferred.resolve(results);
        }
    });
    return deferred.promise;
}
module.exports = {
    send_msg: send_msg,
    getChatinfo: getChatinfo,
    getReadinfo:getReadinfo,
    msgreadInfo:msgreadInfo
};