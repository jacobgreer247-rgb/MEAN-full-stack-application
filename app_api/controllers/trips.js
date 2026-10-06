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
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};