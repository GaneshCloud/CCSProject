/**
 * Created by greg on 2015.10.11..
 */
var mysql = require('mysql');
var q = require('q');
var db = require('./../db');
var con = mysql.createConnection(db);

function getUserValidity(userid, password) {
  var deferred = q.defer();

    var qry = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
    qry += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
    qry +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
    qry +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
    qry += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
    qry += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
    qry += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
    qry += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
    qry += " p.google_img as googleImage from personaldata as p where p.userid = '"+userid+"' and p.password = '"+password+"'";
    qry += " and status = 'active'";

console.log(qry);
   con.query(qry, function(error, results) {
    if (error) {
      console.error(error);
      return deferred.reject(error);
    }
    deferred.resolve(results);
  });
  return deferred.promise;
}

module.exports = {
  getUserValidity: getUserValidity
};
