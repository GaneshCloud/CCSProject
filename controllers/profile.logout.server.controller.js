/**
 * Created by CSS on 25-05-2016.
 */


exports.logout = function(req,res) {
  req.session.destroy();
  res.sendfile('./public/app/core/layout.html', { title: 'Logged Out' });
};