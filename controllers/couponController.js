const Coupon = require("../models/coupon");
const Claim = require("../models/claim");
const mongoose = require("mongoose");

// Function to get the next available coupon in round-robin order
const claimCoupon = async (req, res) => {
  try {
    const userIP = req.ip;
    const userSession =
      req.cookies.session || Math.random().toString(36).substring(2);

    // Check if the user has already claimed a coupon (IP or session-based abuse prevention)
    const existingClaim = await Claim.findOne({
      $or: [{ ip: userIP }, { browserSession: userSession }],
    });
    if (existingClaim) {
      return res
        .status(403)
        .json({ message: "You have already claimed a coupon." });
    }

    // Get the next available coupon (sorted by _id)
    const coupon = await Coupon.findOne({ enabled: true }).sort({ _id: 1 });

    if (!coupon) {
      return res.status(404).json({ message: "No coupons available." });
    }

    // Remove the coupon from the coupons collection
    await Coupon.deleteOne({ _id: coupon._id });

    // Store claim record
    await Claim.create({
      coupon: coupon._id,
      ip: userIP,
      browserSession: userSession,
    });

    // Set a session cookie for abuse prevention
    res.cookie("session", userSession, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day

    res.json({
      message: "Coupon claimed successfully!",
      couponCode: coupon.code,
    });
  } catch (error) {
    console.error("Claim Coupon Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { claimCoupon };
