const roomService = require('../services/roomService')
const { sendSuccess } = require('../utils/response')

function listRooms(req, res) {
  sendSuccess(res, roomService.getRooms(), 'Rooms retrieved successfully')
}

function listAvailableRooms(req, res) {
  sendSuccess(res, roomService.getAvailableRooms(), 'Available rooms retrieved successfully')
}

module.exports = {
  listRooms,
  listAvailableRooms,
}
