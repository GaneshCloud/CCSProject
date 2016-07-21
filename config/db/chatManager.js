
var mysql = require('mysql');
var q=require('q');
var data = '';
var db = require('./../chatdb');
var con = mysql.createConnection(db);

console.log(con);

function send_msg(data_server) {
    var deferred = q.defer();
    con.query("INSERT INTO tb_sendmsg(my_userid,select_userid,msg,Dates,image,file) values('"+data_server.my_userid+"','"+data_server.selectUserid+"','"+data_server.msg+"',now(),'"+data_server.image+"','"+data_server.file+"')", function(err, result) {
        console.log("INSERT INTO tb_sendmsg(my_userid,select_userid,msg,Dates,image,file) values('"+data_server.my_userid+"','"+data_server.selectUserid+"','"+data_server.msg+"',now(),'"+data_server.image+"','"+data_server.file+"'");
        if (err) {
            deferred.reject(err);
        } else {
            var data="select * from tb_sendmsg where id="+result.insertId;
            console.log("select * from tb_sendmsg where id="+result.insertId);
            con.query(data, function(err,result) {

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
            });
       }
    });

    return deferred.promise;
}


function getChatinfo() {
    console.log("haaaa");
    var deferred = q.defer();
    var getChatinfo = "select q.*,personaldata.fname as name,personaldata.mname,personaldata.lname from tb_sendmsg as q INNER JOIN personaldata ON personaldata.userid=q.my_userid where personaldata.status='active'";
    console.log("select * from tb_sendmsg");
    con.query(getChatinfo, function (err, results) {
        if (err) {
            deferred.reject(err);

        } else {

            deferred.resolve(results);
        }
    });
        return deferred.promise;
}
module.exports = {
    send_msg: send_msg,
    getChatinfo: getChatinfo
};