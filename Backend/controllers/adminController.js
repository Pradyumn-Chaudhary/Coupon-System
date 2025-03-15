const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Coupon = require("../models/coupon");
const Claim = require("../models/claim");

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    localStorage.setItem("loggedIn", true);
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create Admin (Run only once to create an admin user)
// const createAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const existingAdmin = await Admin.findOne({ username });

//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const newAdmin = new Admin({ username, password });
//     await newAdmin.save();

//     res.json({ message: "Admin created successfully" });
//   } catch (error) {
//     console.error("Admin Creation Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const viewCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    console.error("Get Coupons Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add new coupon
const addCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const newCoupon = new Coupon({ code, enabled: true });
    await newCoupon.save();
    res.json({ message: "Coupon added successfully" });
  } catch (error) {
    console.error("Add Coupon Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const toggleCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    coupon.enabled = !coupon.enabled;
    await coupon.save();
    res.json({ message: "Coupon toggled successfully" });
  } catch (error) {
    console.error("Toggle Coupon Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  adminLogin,
  createAdmin,
  viewCoupons,
  addCoupon,
  toggleCoupon,
};
