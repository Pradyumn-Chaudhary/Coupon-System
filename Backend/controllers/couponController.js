const Coupon = require("../models/coupon");
const Claim = require("../models/claim");
const mongoose = require("mongoose");

// Function to get the next available coupon in round-robin order
const claimCoupon = async (req, res) => {
  try {
    const userIP = req.ip;
    const userSession = req.cookies.session || Math.random().toString(36).substring(2);

    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours

    // Find the last claim based on IP or Session
    const existingClaim = await Claim.findOne({
      $or: [{ ip: userIP }, { browserSession: userSession }],
    }).sort({ timestamp: -1 });

    if (existingClaim) {
      const timeSinceLastClaim = Date.now() - existingClaim.timestamp.getTime();

      if (timeSinceLastClaim < cooldownPeriod) {
        const remainingTime = Math.ceil((cooldownPeriod - timeSinceLastClaim) / (1000 * 60)); // Convert to minutes
        return res.status(403).json({ 
          message: `You can claim again in ${remainingTime} minutes.` 
        });
      }
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
