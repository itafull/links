const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedin } = require('../lib/auth');

router.get('/signup', isNotLoggedin,  (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedin, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failuerFlash: true
}))

router.get('/signin', isNotLoggedin, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedin, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

// router.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect('/signin');
// });

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect("/signin");  
    });
});

module.exports = router;