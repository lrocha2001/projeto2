require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const rateLimit = require('express-rate-limit');
const logger = require('../logger');

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 15, // limite de 10 requisições por janela
  message: 'Too many login attempts from this IP, please try again after 10 minutes'
});

router.post("/authenticate", authLimiter, async (req, res) => {
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
       error = res.status(404).json({ message: "User not found" });
       logger.error(error);
       return error;
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      error = res.status(422).json({ message: "Incorrect Password"});
      logger.error(error);
      return error;
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        {
          expiresIn: '1000s'
        }
      );

      res.status(200).json({token});
    } catch (error) {
      logger.error(error);
      res.status(500).json({error});
    }
  });

module.exports = router;