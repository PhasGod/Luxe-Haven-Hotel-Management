const bookingService = require('../services/bookingService')
const { sendSuccess } = require('../utils/response')

function listBookings(req, res) {
  sendSuccess(res, bookingService.getBookings(), 'Bookings retrieved successfully')
}

module.exports = {
  listBookings,
}
