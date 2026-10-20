const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

// Require a valid login token
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

// Registration and login
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// View or add trips
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(auth, ctrlTrips.tripsAddTrip);

// View, update, or delete a specific trip
router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(auth, ctrlTrips.tripsUpdateTrip)
  .delete(auth, ctrlTrips.tripsDeleteTrip);

module.exports = router;