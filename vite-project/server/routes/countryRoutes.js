require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Country = require('../models/Country');

//Private Route

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token){
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid authorization token"});
  }
}

//Add Country

router.post('/', checkToken, async (req, res) => {
  const { countryName, language, region } = req.body;
  const countryExists = await Country.findOne({countryName: countryName});    

  try {
      // validations

      if (!countryName) {
          return res.status(422).json({ message: "countryName is mandatory"});
      }

      if (!language) {
          return res.status(422).json({ message: "language is mandatory"});
      }

      if (!region) {
          return res.status(422).json({ message: "region is mandatory"});
          }

      if (countryExists) {
              return res.status(422).json({ message: "Country already exists" });
      }   
      // Create Country
      const country = new Country({
          countryName,
          language,
          region
      });

    await country.save();
    res.status(201).json({ message: "Country created successfully" });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

//Search Countries

router.get("/:region", checkToken, async (req, res) => {
  const region = req.params.region;

  // make it case-insensitive
  const regex = new RegExp(region, "i");

  // Consulta usando a expressão regular
  const countries = await Country.find({ region: regex });


  res.status(200).json({ countries });
});

module.exports = router;
