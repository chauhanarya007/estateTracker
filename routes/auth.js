const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

// GET: /auth/register => show register form
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'User Registration'
    })
})

// POST: /auth/register => create new user and redirect to /appointments
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            req.login(user, (err) => {
                res.redirect('/appointments')
            })
        }
    })})

// GET: /auth/login => show register form
router.get('/login', (req, res) => {
    // if there are any session messages, store them in a local var
    let messages = req.session.messages || []

    // clear the session error messages
    req.session.messages = []

    res.render('auth/login', { 
        title: 'Login',
        messages: messages
    })
})

// POST: /auth/login => use passport to do auth check
router.post('/login', passport.authenticate('local', {
    successRedirect: '/appointments',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}))

// GET: /auth/logout => well this is obvious isn't it?
router.get('/logout', (req, res, next) => {
    req.session.messages = []
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/login')
    })
})

// GET: /auth/google => invoke Google sign in attempt
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}), (req, res) => {}
)

// GET: /auth/google/callback => handle return of user from google
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/appointments')
})

module.exports = router