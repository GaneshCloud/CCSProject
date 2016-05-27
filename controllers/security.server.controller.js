/**
 * Created by CSS on 27-05-2016.
 */
exports.getLoggedInUser = function (req,res) {
    if(req.session && req.session.data){
        res.send(req.session.data);
    }
    return;
}