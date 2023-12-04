require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Country = require('../models/Country');
const mongoSanitize = require('express-mongo-sanitize');
const cache = require('express-redis-cache')({
  prefix: 'infocountries',
  host: process.env.REDIS_URL,
  port: 15685,
  auth_pass: process.env.REDIS_PASSWORD
});

cache.on('connected', () => {
  console.log('Redis connection');
});

cache.on('error', (error) => {
  console.error('Erro ao conectar ao Redis:', error);
});

cache.invalidate = (name) => {
  return (req, res, next) => {
    const route_name = name ? name : req.url;
    if (!cache.connected) {
      next();
      return ;
    }
    cache.del(route_name, (err) => console.log(err));
    next();
  };
};
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

router.post('/', checkToken, mongoSanitize(), cache.invalidate(), async (req, res) => {
  const { countryName, language, region } = req.body;

  // Check if values contain special characters
const hasInvalidChars = [countryName, language, region].some(
  value => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)
);  

  if (hasInvalidChars) {
    return res.status(400).json({ message: "Invalid characters in input" });
  }

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

router.get("/:region", checkToken, mongoSanitize(), cache.route(), async (req, res) => {
  let region = req.params.region;

  // Check if region contains special characters
  const hasInvalidChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(region);

  if (hasInvalidChars) {
    return res.status(400).json({ message: "Invalid characters in input" });
  }

  // make it case-insensitive
  const regex = new RegExp(region, "i");

  // Consulta usando a expressão regular
  const countries = await Country.find({ region: regex });

  res.status(200).json({ countries });
});

module.exports = router;