module.exports = {

isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
},

isNotLoggedin (req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/profile');
}

};