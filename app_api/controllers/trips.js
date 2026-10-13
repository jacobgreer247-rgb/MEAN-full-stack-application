const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /trips
// Returns all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips) {
      return res.status(404).json({ message: 'Trips not found' });
    }

    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET: /trips/:tripCode
// Returns one trip by its trip code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST: /trips
// Creates a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({
      message: 'Error creating trip',
      error: err.message
    });
  }
};

// PUT: /trips/:tripCode
// Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        $set: {
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        }
      },
      {
        new: true,
        runValidators: true
      }
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating trip',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};