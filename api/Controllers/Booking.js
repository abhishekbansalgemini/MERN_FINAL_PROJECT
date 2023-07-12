const jwt = require("jsonwebtoken");
const BookingModel = require("../models/Booking");
const PlaceModel = require("../models/Place");
require("dotenv").config();

const jwtSecret = process.env.jwtSecret;

function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, user) => {
      if (err) {
        throw err;
      }
      resolve(user);
    });
  });
}

const booking = async (req, res) => {
  const user = await getUserDataFromRequest(req);
  const { place, checkIn, checkOut, guests, name, phone, price, email } =
    req.body;
  BookingModel.create({
    place,
    checkIn,
    checkOut,
    guests,
    name,
    phone,
    price,
    user: user.id,
    email,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

const getBookings = async (req, res) => {
  const user = await getUserDataFromRequest(req);
  res.json(await BookingModel.find({ user: user.id }).populate("place"));
};


const updateBooking = async (req, res) => {
  const {
    editBookingId,
    editCheckIn,
    editCheckOut,
    editGuests,
    editName,
    editEmail,
    editPhone,
    numberOfNights
  } = req.body;

  const booking = await BookingModel.findById(editBookingId);
  const place = await PlaceModel.findById(booking.place);
  booking.set({
    place: booking.place,
    user: booking.user,
    checkIn: editCheckIn,
    checkOut: editCheckOut,
    guests: editGuests,
    name: editName,
    phone: editPhone,
    email: editEmail,
    price: numberOfNights*place.price,
  });
  await booking.save();
  res.json("BOOKING UPDATED");
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  res.json(await BookingModel.findByIdAndDelete(id));
};

module.exports = { booking, getBookings, deleteBooking, updateBooking };
