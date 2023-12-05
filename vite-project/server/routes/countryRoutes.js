require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Country = require('../models/Country');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('../logger');
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

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token){
    let error = res.status(401).json({ message: "Unauthorized" });
    logger.error(error);
    return error;
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    logger.error(error);
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
    error = res.status(400).json({ message: "Invalid characters in input" });
    logger.error(error)
    return error;
  }

  const countryExists = await Country.findOne({countryName: countryName});    

  try {
      // validations

      if (!countryName || countryName.length < 4) {
          return res.status(422).json({ message: "countryName is mandatory and length must be greater than 3"});
      }

      if (!language) {
          return res.status(422).json({ message: "language is mandatory"});
      }

      if (!region || region.length < 4) {
          return res.status(422).json({ message: "region is mandatory and length must be greater than 3"});
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
      logger.error(error);
      res.status(500).json({ message: error.message });
  }
});

//Search Countries

router.get("/:region", checkToken, mongoSanitize(), cache.route(), async (req, res) => {
  let region = req.params.region;

  if (!region || region.length < 3) {
    let error = res.status(422).json({ message: "region length must be greater than 3"});
    logger.error(error);
    return error;
  }

  // Check if region contains special characters
  const hasInvalidChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(region);

  if (hasInvalidChars) {
    let error = res.status(400).json({ message: "Invalid characters in input" });
    logger.error(error);
    return error;
    
  }

  // make it case-insensitive
  const regex = new RegExp(region, "i");

  // Consulta usando a expressão regular
  const countries = await Country.find({ region: regex });

  res.status(200).json({ countries });
});

module.exports = router;