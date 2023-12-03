require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

router.post("/authenticate", async (req, res) => {
    const { login, password } = req.body;

    // validations
    if (!login) {
      return res.status(422).json({ message: "Login is mandatory"});
    }

    if (!password) {
      return res.status(422).json({ message: "Password is mandatory"});
    }

    // user enumeration only for testing, it will be removed later
    const user = await User.findOne({ login: login });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Incorrect Password"});
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res.status(200).json({token});
    } catch (error) {
      res.status(500).json({error});
    }
  });

module.exports = router;
