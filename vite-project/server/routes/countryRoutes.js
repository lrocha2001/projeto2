require("dotenv").config();
const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

router.post('/', async (req, res) => {
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

module.exports = router;