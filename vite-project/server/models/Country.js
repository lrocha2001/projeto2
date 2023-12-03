const mongoose = require('mongoose')

const Country = mongoose.model('Country', {
  countryName: String,
  language: String,
  region: String
})

module.exports = Country