import { User } from "../models/userSchema.js";
import nodemailer from "nodemailer";
import { generateToken } from "../middleware/jwt.js";
import jwt from "jsonwebtoken";

// Setup to send emails from the app using nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS_NODEMAILER,
    pass: process.env.EMAIL_PASSWORD_NODEMAILER,
  },
});

// Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // TODO validators in schema or controller or both?

    // Create new user and generate verification token
    const newUser = new User({ name, email, password });
    const token = generateToken({ userId: newUser._id }); // Payload with user ID
    newUser.validationToken = token; // Store validation token in user's validationToken field
    await newUser.save();

    // Set up email options
    // TODO adapt to our new app name
    const mailOptions = {
      from: "LeckerLex",
      to: newUser.email,
      subject: "Confirm Your Registration - LeckerLex",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Welcome to LeckerLex!</h2>
        <p style="font-size: 16px; color: #555;">Hi ${newUser.name},</p>
        <p style="font-size: 16px; color: #555;">
          Thank you for registering on LeckerLex! To get started, we just need to verify your email address. 
          Please click the button below to confirm your account:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a 
            href="${process.env.BASE_URL}${
        process.env.PORT
      }/users/verify-email/${token}" 
            style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px;"
          >
            Verify Email
          </a>
        </div>
        <p style="font-size: 16px; color: #555;">
          Or, if the button doesn't work, you can copy and paste the following link into your browser:
        </p>
        <p style="font-size: 16px; color: #555; word-wrap: break-word;">
          <a href="${process.env.BASE_URL}${
        process.env.PORT
      }/users/verify-email/${token}" style="color: #4CAF50;">${
        process.env.BASE_URL
      }${process.env.PORT}/users/verify-email/${token}</a>
        </p>
        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px;">
          If you didn't sign up for LeckerLex, please ignore this email.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          &copy; ${new Date().getFullYear()} LeckerLex. All rights reserved.
        </p>
      </div>
    `,
      text: `
      Welcome to LeckerLex, ${newUser.name}!
      Thank you for registering. Please verify your email address by clicking the link below:
      ${process.env.BASE_URL}${process.env.PORT}/users/verify-email/${token}
      
      If you didn't sign up for LeckerLex, please ignore this email.
  
      Best regards,
      The LeckerLex Team
    `,
    };

    // Send the verification email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending verification email", error);
        res.status(500).json({ msg: "Error sending verification email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({
          msg: "User created. Verification email has been sent",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.params.token; // Extract token from URL params
    jwt.verify(token, process.env.JWT_SECRET); // Verify token via JWT_SECRET

    // Find the user associated with the verification token
    const user = await User.findOne({ validationToken: token });

    if (user) {
      user.isEmailValidated = true; // Set the user's emailVerified field to true
      user.validationToken = null; // Remove the registration token
      await user.save();
      return res.status(200).json({
        msg: "Email successfully verified",
        isEmailValidated: user.isEmailValidated,
      });
    } else {
      return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isAuthenticated = await user.authenticate(password); // Compare the clear-text password from req.body with the hashed one in the database

    if (!isAuthenticated)
      return res.status(401).json({ msg: "Incorrect credentials" });

    // If email-address was not verified, reject login attempt
    if (!user.isEmailValidated)
      return res.status(401).json({
        msg: "Unverified email-address: email-address must be verified to log in",
      });

    // If login successful, generate authentication token and send in a cookie
    const token = generateToken({ userId: user._id }); // payload
    return res
      .status(200)
      .cookie("jwt", token, {
        // httpOnly: true,
        // secure: true, // Deactivated for backend-only demo purposes via Insomnia
        maxAge: 24 * 60 * 60 * 1000, // 1 day in miliseconds
      })
      .json({ msg: "Successfully signed in" });
  } catch (error) {
    next(error);
  }
};
