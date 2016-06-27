/**
 * Created by greg on 2015.10.11..
 */

var q = require('q');

var http = require('https');

var mysql = require('mysql');

var fs  = require('fs');

var fileType = require('file-type');

var db = require('./../db');
var con = mysql.createConnection(db);

function getUserDetails(userType) {
  var deffered = q.defer();

  var qry = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
  qry += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
  qry +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
  qry +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
  qry += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
  qry += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
  qry += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
  qry += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
  qry += " p.google_img as googleImage from personaldata as p where p.userType = '"+userType+"' and p.status = 'active'";

  con.query(qry,function(err, results) {
      if (err) {
        console.error(err);
        return deffered.reject(err);
      }
      deffered.resolve(results);
    });
  return deffered.promise;
}

function getPersonalData(id) {
  var deferred = q.defer();

  var qry = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
  qry += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
  qry +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
  qry +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
  qry += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
  qry += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
  qry += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
  qry += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
  qry += " p.google_img as googleImage from personaldata as p where p.id = "+id+" and p.status = 'active'";

  console.log(qry);

  con.query(qry, function(error, results) {
    if (error) {
      return deferred.reject(error);
    }
    deferred.resolve(results);
  });
  return deferred.promise;
}

function updatePersonalData(userData) {
  var deferred = q.defer();
  deletePersonalData(userData.id).then(function() {
    var dataUpdate = 'Insert into personaldata(facebook_id,facebook_token,google_id,google_token,userid,password,';
    dataUpdate += 'userType,fname,mname,lname,email,fb_fname,fb_mname,fb_lname,fb_email,';
    dataUpdate += 'g_fname,g_mname,g_lname,g_email,contact,address,college,course,branch,year,project_fee,fees_paid,';
    dataUpdate += 'fees_balance,createdDate,status,profile_pic,facebook_img,google_img)';
    dataUpdate += ' values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),?,?,?,?,?)';
    console.log('Query template' + dataUpdate);
   
        var query = mysql.format(dataUpdate, [userData.facebookId,userData.facebookToken,
          userData.googleId, userData.googleToken,userData.userid, userData.password,userData.userType,userData.firstName,userData.middleName,
          userData.lastName,userData.email,userData.fbFirstName,userData.fbMiddleName,userData.fbLastName,userData.fbEmail,
          userData.googleFirstName,userData.googleMiddleName,userData.googleLastName,userData.googleEmail,userData.contact, userData.address, userData.college,userData.course,
          userData.branch, userData.year, userData.projectFees, userData.feesPaid, userData.feesBalance,
          'active', userData.profilePic, userData.facebookImage, userData.googleImage]);
        console.log('Query to execute:' + query);
        con.query(query, function(error, result) {
          if (error) {
            console.error(error);
            return deferred.reject(error);
          }
          getPersonalData(result.insertId).then(function(error,result) {
            if(error){
              return deferred.reject(error);
            }
            deferred.resolve(result);
          });
        });
     
  });
  return deferred.promise;
}

function deletePersonalData(id) {
  var deferred = q.defer();
  var deleteData = 'Update personaldata set status = \'Move to trash\',deletedDate = now() where id = ? and status = ?';
 
      var query = mysql.format(deleteData, [id,'active']);
      console.log('Delete query:' + query);
      con.query(query, function(error, result) {
        if (error) {
          console.error(error);
          return deferred.reject(error);
        }
        deferred.resolve({affectedRows: result.affectedRows});
      });
  return deferred.promise;
}

function updateImage(data) {
  var deffered = q.defer();
  updatePersonalData(data).then(function(error,result) {
    if(error){
      return deffered.reject(error);
    }
    deffered.resolve(result);
  });
  return deffered.promise;
}

function updateFacebookPersonalData(req,profile,accessToken) {
  var deferred = q.defer();
  var data = [];
  if (req && req.session && req.session.data) {
    data = req.session.data;
    data.facebookId = profile.id;
    data.facebookToken = accessToken;
    if (profile.name.givenName) {
      data.fbFirstName = profile.name.givenName;
    }else if (profile.displayName) {
      data.fbFirstName = profile.displayName;
    }
    if (profile.name.familyName) {
      data.fbLastName = profile.name.familyName;
    }
    if (profile.emails && profile.emails[0]) {
      data.fbEmail = profile.emails[0].value;
    }
    updatePersonalData(data).then(function(error,result) {
      if(error){
        return deferred.reject(error);
      }
      if(result) {
        updateFacebookProfilePicture(profile).then(function (error, result) {
          if (error) {
            return deferred.reject(error);
          }
          deferred.resolve(result);
        });
      }
    });
  }else {

    var fbDataUpdate = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
    fbDataUpdate += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
    fbDataUpdate +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
    fbDataUpdate +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
    fbDataUpdate += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
    fbDataUpdate += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
    fbDataUpdate += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
    fbDataUpdate += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
    fbDataUpdate += " p.google_img as googleImage from personaldata as p where p.facebook_id = ? and p.status = ?";

        var query = mysql.format(fbDataUpdate, [profile.id,'active']);
        console.log('Select query:' + query);
        con.query(query, function(error, result) {
            if (error) {
              console.error(error);
              return deferred.reject(error);
            }
            if (result && result.length > 0) {
              data = result[0];
              data.facebookId = profile.id;
              data.facebookToken = accessToken;
              if (profile.name.givenName) {
                data.fbFirstName = profile.name.givenName;
              }else if (profile.displayName) {
                data.fbFirstName = profile.displayName;
              }
              if (profile.name.familyName) {
                data.fbLastName = profile.name.familyName;
              }
              if (profile.emails && profile.emails[0]) {
                data.fbEmail = profile.emails[0].value;
              }
              updatePersonalData(data).then(function(error,result) {
                if(error){
                  return deferred.reject(error);
                }
                if(result) {
                  updateFacebookProfilePicture(profile).then(function (error, result) {
                    if (error) {
                      return deferred.reject(error);
                    }
                    deferred.resolve(result);
                  });
                }
              });
            }else {
              insertFacebookProfileData(profile,accessToken).then(function(error,result) {
                if(error){
                  return deferred.reject(error);
                }
                if(result) {
                  updateFacebookProfilePicture(profile).then(function (error,result) {
                    if(error){
                      return deferred.reject(error);
                    }
                    deferred.resolve(result);
                  });
                }
              });
            }
          });
  }
  return deferred.promise;
}

function updateFacebookProfilePicture(profile) {
  var deferred = q.defer();

  var fbDataUpdate = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
  fbDataUpdate += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
  fbDataUpdate +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
  fbDataUpdate +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
  fbDataUpdate += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
  fbDataUpdate += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
  fbDataUpdate += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
  fbDataUpdate += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
  fbDataUpdate += " p.google_img as googleImage from personaldata as p where p.facebook_id = '"+profile.id+"' and p.status = 'active'";

      con.query(fbDataUpdate, function(error, results) {
        if (error) {
          console.error(error);
          deferred.reject(error);
        }
        http.get(profile.photos[0].value, function(res) {
          var buffers = [];
          var length = 0;
          res.on('data', function(chunk) {
            // Store each block of data
            length += chunk.length;
            buffers.push(chunk);
          });
          res.on('end', function() {
            // Combine the binary data into single buffer
            var image = Buffer.concat(buffers);
            var filePath = 'public/uploads/profile/file-' + profile.id + '.' + fileType(image).ext;
            fs.writeFile(filePath, image, function(err) {
              if (err) {
                console.log('Error---->' + err);
              }else {
                var data = results[0];
                data.facebookImage = 'file-' + profile.id + '.' + fileType(image).ext;
                updateImage(data).then(function(error,result) {
                  if(error){
                    return deferred.reject(error);
                  }
                  deferred.resolve(result);
                });
              }
            });
          });
        });
      });
  return deferred.promise;
}

function deleteFacebookProfileData(profile) {
  var deferred = q.defer();
  var qry = 'Update personaldata set status = \'Move to trash\',deletedDate = now() where facebook_id = ? and status = ?';

      var query = mysql.format(qry, [profile.id,'active']);
      console.log('Delete query:' + query);
      con.query(query, function(error, result) {
        if (error) {
          console.error(error);
          return deferred.reject(error);
        }
        deferred.resolve({affectedRows: result.affectedRows});
      });
  return deferred.promise;
}

function insertFacebookProfileData(profile, accessToken) {
  var deferred = q.defer();
  var qry = 'Insert into personaldata(facebook_id,facebook_token';
  if (profile.name.givenName) {
    qry += ',fb_fname';
  }else if (profile.displayName) {
    qry += ',fb_fname';
  }
  if (profile.name.familyName) {
    qry += ',fb_lname';
  }
  if (profile.emails && profile.emails[0]) {
    qry += ',fb_email';
  }
  qry += ',createdDate,status,userType) values (' + profile.id + ',\'' + accessToken + '\'';

  if (profile.name.givenName) {
    qry += ',\'' + profile.name.givenName + '\'';
  }else if (profile.displayName) {
    qry += ',\'' + profile.displayName + '\'';
  }

  if (profile.name.familyName) {
    qry += ',\'' + profile.name.familyName + '\'';
  }

  if (profile.emails && profile.emails[0]) {
    qry += ',\'' + profile.emails[0].value + '\'';
  }

  qry += ',now(),\'active\',\'user\')';


  console.log('Insert query:' + qry);
  con.query(qry, function(error, result) {
    if (error) {
      console.error(error);
      return deferred.reject(error);
    }
    deferred.resolve({affectedRows: result.affectedRows});
  });

  return deferred.promise;
}


function updateGooglePersonalData(req,profile,accessToken) {


  var deferred = q.defer();

  var data = [];

  if (req && req.session && req.session.data) {

    data = req.session.data;

    data.googleId = profile.id;
    data.googleToken = accessToken;
    if (profile.name.givenName) {
      data.goofleFirstname = profile.name.givenName;
    }else if (profile.displayName) {
      data.googleFirstName = profile.displayName;
    }

    if (profile.name.familyName) {
      data.googleLastName = profile.name.familyName;
    }

    if (profile.email) {

      data.googleEmail = profile.email;
    }

    updatePersonalData(data).then(function(error,result) {
      if(error){
        return deferred.reject(error);
      }
      console.log('Result' + result);
      if(result) {
        updateGoogleProfilePicture(profile).then(function (error,result) {
          if(error){
            return deferred.reject(error);
          }
          deferred.resolve(result);
        });
      }
    });

  }else {

    var fbDataUpdate = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
    fbDataUpdate += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
    fbDataUpdate +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
    fbDataUpdate +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
    fbDataUpdate += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
    fbDataUpdate += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
    fbDataUpdate += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
    fbDataUpdate += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
    fbDataUpdate += " p.google_img as googleImage from personaldata as p where p.google_id = ? and p.status = ?";

    var query = mysql.format(fbDataUpdate, [profile.id,'active']);
    console.log('Select query:' + query);
    con.query(query, function(error, result) {
      if (error) {
        console.error(error);
        return deferred.reject(error);
      }
      if (result && (result.length > 0)) {

        data = result[0];

        data.googleId = profile.id;
        data.googleToken = accessToken;
        if (profile.name.givenName) {
          data.googleFirstName = profile.name.givenName;
        }else if (profile.displayName) {
          data.googleFirstName = profile.displayName;
        }

        if (profile.name.familyName) {
          data.googleLastName = profile.name.familyName;
        }

        if (profile.email) {

          data.googleEmail = profile.email;
        }

        updatePersonalData(data).then(function(error, result) {
          if(error){
            return deferred.reject(error);
          }
          console.log('Result' + result);
          if(result) {
            updateGoogleProfilePicture(profile).then(function (error,result) {
              if(error){
                return deferred.reject(error);
              }
              deferred.resolve(result);
            });
          }
        });

      }else {

        insertGoogleProfileData(profile,accessToken).then(function(error,result) {
          if(error){
            return deferred.reject(error);
          }
          if(result) {
            updateGoogleProfilePicture(profile).then(function (error,results) {
              if(error){
                return deferred.reject(error);
              }
              deferred.resolve(results);
            });
          }
        });

      }

    });
  }
  return deferred.promise;
}

function updateGoogleProfilePicture(profile) {

  var deferred = q.defer();

  var fbDataUpdate = "Select p.id as id, p.facebook_id as facebookId, p.facebook_token as facebookToken,";
  fbDataUpdate += "p.google_id as googleId, p.google_token as googleToken, p.userid as userid, p.password as password,";
  fbDataUpdate +=" p.userType as userType, p.fname as firstName,p.mname as middleName, p.lname as lastName, p.email as email,";
  fbDataUpdate +=" p.fb_fname as fbFirstName, p.fb_mname as fbMiddleName, p.fb_lname as fbLastName, p.fb_email as fbEmail,";
  fbDataUpdate += " p.g_fname as googleFirstName, p.g_mname as googleMiddleName, p.g_lname as googleLastName,";
  fbDataUpdate += " p.g_email as googleEmail, p.contact as contact, p.address as address, p.college as college, p.course as course,";
  fbDataUpdate += " p.branch as branch, p.year as year, p.project_fee as projectFees, p.fees_paid as feesPaid, ";
  fbDataUpdate += " p.fees_balance as feesBalance, p.profile_pic as profilePic, p.facebook_img as facebookImage,";
  fbDataUpdate += " p.google_img as googleImage from personaldata as p where p.google_id = '"+profile.id+"' and p.status = 'active'";

  con.query(fbDataUpdate, function(error, results) {
    if (error) {
      console.error(error);
      return deferred.reject(error);
    }

    http.get(profile.photos[0].value,function(res) {

      var buffers = [];

      var length = 0;

      res.on('data', function(chunk) {

        // Store each block of data
        length += chunk.length;

        buffers.push(chunk);

      });

      res.on('end', function() {

        // Combine the binary data into single buffer
        var image = Buffer.concat(buffers);

        var filePath = 'public/uploads/profile/file-' + profile.id + '.' + fileType(image).ext;

        fs.writeFile(filePath,image,function(err) {

          if (err) {
            console.log('Error---->' + err);
          }else {

            var data = results[0];

            data.googleImage = 'file-' + profile.id + '.' + fileType(image).ext;

            updateImage(data).then(function(error,result) {
              if(error){
                return deferred.reject(error);
              }
              deferred.resolve(result);
            });


          }

        });

      });

    });
  });

  return deferred.promise;

}

function deleteGoogleProfileData(profile) {

  var deferred = q.defer();

  var qry = 'Update personaldata set status = \'Move to trash\',deletedDate = now() where google_id = ? and status = ?';

  var query = mysql.format(qry, [profile.id,'active']);
  console.log('Delete query:' + query);
  con.query(query, function(error, result) {
    if (error) {
      console.error(error);
      return deferred.reject(error);
    }
    deferred.resolve({affectedRows: result.affectedRows});
  });

  return deferred.promise;

}

function insertGoogleProfileData(profile,accessToken) {

  var deferred = q.defer();

  var qry = 'Insert into personaldata(google_id,google_token';

  if (profile.name.givenName) {
    qry += ',g_fname';
  }else if (profile.displayName) {
    qry += ',g_fname';
  }

  if (profile.name.familyName) {
    qry += ',g_lname';
  }

  if (profile.email) {

    qry += ',g_email';
  }

  qry += ',createdDate,status,userType) values (\'' + profile.id + '\',\'' + accessToken + '\'';

  if (profile.name.givenName) {
    qry += ',\'' + profile.name.givenName + '\'';
  }else if (profile.displayName) {
    qry += ',\'' + profile.displayName + '\'';
  }

  if (profile.name.familyName) {
    qry += ',\'' + profile.name.familyName + '\'';
  }

  if (profile.email) {
    qry += ',\'' + profile.email + '\'';
  }

  qry += ',now(),\'active\',\'user\')';

  console.log('Insert query:' + qry);
  con.query(qry, function(error, result) {
    if (error) {
      console.error(error);
      return deferred.reject(error);
    }
    deferred.resolve({affectedRows: result.affectedRows});
  });

  return deferred.promise;
}


module.exports = {
  getPersonalData: getPersonalData,
  updatePersonalData: updatePersonalData,
  deletePersonalData: deletePersonalData,
  updateFacebookPersonalData: updateFacebookPersonalData,
  deleteFacebookProfileData: deleteFacebookProfileData,
  insertFacebookProfileData: insertFacebookProfileData,
  updateImage: updateImage,
  updateFacebookProfilePicture: updateFacebookProfilePicture,
  updateGooglePersonalData: updateGooglePersonalData,
  deleteGoogleProfileData: deleteGoogleProfileData,
  insertGoogleProfileData: insertGoogleProfileData,
  updateGoogleProfilePicture: updateGoogleProfilePicture,
  getUserDetails: getUserDetails
};