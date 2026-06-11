const rooms = require('../models/roomModel')

function getRooms() {
  return rooms
}

function getAvailableRooms() {
  return rooms.filter((room) => room.available)
}

module.exports = {
  getRooms,
  getAvailableRooms,
}
