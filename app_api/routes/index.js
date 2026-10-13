const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// Get all trips or add a new trip
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(ctrlTrips.tripsAddTrip);

// Get or update a specific trip
router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(ctrlTrips.tripsUpdateTrip);

module.exports = router;