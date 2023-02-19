const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Yashis@GoodPersonwithformalbehaviour";

//? ROUTE 1 : USER CREATION, HASHING PASSWORD AND AUTHENTICATION USING "JWT"
//! Create a User using : POST "api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    //! Validating the inputs of user using express-validator

    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //* Validation error resolve : If there are errors, return Bad Request with the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    //! Checking if the user with the similar email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: true,
          error: "Sorry, user with this email already exists",
        });
      }

      //* Hashing the password using bcryptjs

      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);

      //! Creating a new user
      user = await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securedPass,
      });

      //! Authenticating user by "authentication token" using "JSONWebToken (JWT)" :::: Using authToken here to send the response to user

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  }
);

//? ROUTE 2 : USER LOGIN AND AUTHENTICATING USER THROUGH "JWT"
//! Authenticate a User using : POST "api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //* Validation error resolve : If there are errors, return Bad Request with the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          errors: "Please try to login with valid credentials",
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({
          success: false,
          errors: "Please try to login with valid credentials",
        });
      }

      //* Unique identification data to generate the authToken
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        success: false,
        error: "User with these credentials not found",
      });
    }
  }
);

module.exports = router;
