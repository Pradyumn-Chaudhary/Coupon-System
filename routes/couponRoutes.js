const express = require("express");
const { claimCoupon, getAllCoupons } = require("../controllers/couponController");

const router = express.Router();

// Route to claim a coupon
router.post("/claim", claimCoupon);

// Route to get all coupons (For testing/admin)
router.get("/coupons", getAllCoupons);

module.exports = router;
