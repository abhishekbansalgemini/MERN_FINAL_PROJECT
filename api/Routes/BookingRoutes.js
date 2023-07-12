const express = require("express");
const router = express.Router();
const {booking, getBookings, deleteBooking, updateBooking} = require('../Controllers/Booking');


router.post("/bookings", booking);
router.get("/bookings", getBookings);   
router.delete("/bookings/:id", deleteBooking);
router.put("/bookings/:id", updateBooking)

module.exports = router;
