require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

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

router.post('/', checkToken, async (req, res) => {
    const { login, password } = req.body;

    try {
        const userExists = await User.findOne({login: login});

        if (userExists) {
            return res.status(422).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create User
        const user = new User({
            login,
            password: passwordHash,
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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