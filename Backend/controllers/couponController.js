const Coupon = require("../models/coupon");
const Claim = require("../models/claim");
const mongoose = require("mongoose");

// Function to claim a coupon in round-robin order
const claimCoupon = async (req, res) => {
  try {
    const userIP = req.ip;
    const userSession =
      req.cookies.session || Math.random().toString(36).substring(2);

    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours

    // Find the last claim based on IP or Session
    const existingClaim = await Claim.findOne({
      $or: [{ ip: userIP }, { browserSession: userSession }],
    }).sort({ timestamp: -1 });

    if (existingClaim) {
      const timeSinceLastClaim = Date.now() - existingClaim.timestamp.getTime();
      if (timeSinceLastClaim < cooldownPeriod) {
        const remainingTime = Math.ceil(
          (cooldownPeriod - timeSinceLastClaim) / (1000 * 60)
        );
        return res.status(403).json({
          message: `You can claim again in ${remainingTime} minutes.`,
        });
      }
    }

    // Get the next available coupon
    const coupon = await Coupon.findOne({ enabled: true }).sort({ _id: 1 });

    if (!coupon) {
      return res.status(404).json({ message: "No coupons available." }); // ✅ Fix: Stop execution here
    }

    const couponCode = coupon?.code; // Store coupon ID before deleting

    // Remove the coupon from the database
    await Coupon.deleteOne({ _id: coupon._id });

    // Store claim record
    await Claim.create({
      coupon: couponCode, // Save coupon ID instead of the actual code
      ip: userIP,
      browserSession: userSession,
    });

    // Set a session cookie for abuse prevention
    res.cookie("session", userSession, {
      httpOnly: true,
      maxAge: cooldownPeriod,
    });

    res.json({
      message: "Claim successful",
      couponCode: couponCode,
    });
  } catch (error) {
    console.error("Claim Coupon Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { claimCoupon };
