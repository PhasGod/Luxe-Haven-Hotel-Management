const bookings = require('../models/bookingModel')

function getBookings() {
  return bookings
}

module.exports = {
  getBookings,
}
