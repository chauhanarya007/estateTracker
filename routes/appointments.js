const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointment')
const Property = require('../models/property')
const passport = require('passport')
//const globals = require('./globalFunctions')


function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
      return next()
    }
    res.redirect('/auth/login')
  }
// GET: /Appointments => show all appointments
router.get('/', isAuthenticated, (req, res) => {
    Appointment.find((err, appointments) => {
        if (err) {
            console.log(err);
        } 
        else {
            res.render('appointments/index', {
                title: 'Appointments', 
                appointments: appointments,
                user: req.user
            })
        }
    })
})

// GET: /appointments/create => display blank form
router.get('/create', isAuthenticated, (req, res) => {
    Property.find((err, properties) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('appointments/create', { 
                title: 'Add Appointment',
                properties: properties,
                user: req.user
            })
        }
    }).sort('name')   
})

// POST: /Appointments/create => save new Appointment doc from form body
router.post('/create', isAuthenticated, (req, res) => {
    Appointment.create(req.body, (err, newAppointment) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/appointments')
        }
    })
})

// GET: /appointments/delete/abc123 => remove selected appointment document
router.get('/delete/:_id', isAuthenticated, (req, res) => {
    Appointment.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/appointments')
        }
    })
})

// GET: /appointments/edit/abc123 => display populated form for editing
router.get('/edit/:_id', isAuthenticated, (req, res) => {
    // get properties for Form dropdown
    Property.find((err, properties) => {
        if (err) {
            console.log(err)
        }
        else {
            // fetch selected appointment for display
            Appointment.findById(req.params._id, (err, appointment) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('appointments/edit', { 
                        title: 'Appointment Details',
                        properties: properties,
                        appointment: appointment,
                        user: req.user
                    })
                }
            })           
        }
    }).sort('name')   
})

// POST: /appointments/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id', isAuthenticated, (req, res) => {
    Appointment.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, appointment) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/appointments')
        }
    })
})

module.exports = router