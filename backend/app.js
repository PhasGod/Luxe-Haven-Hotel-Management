const express = require('express')
const cors = require('cors')
const env = require('./config/env')
const bookingRoutes = require('./routes/bookingRoutes')
const roomRoutes = require('./routes/roomRoutes')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: env.clientUrl }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Hotel Booking API is running',
  })
})

app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
