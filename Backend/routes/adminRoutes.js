const express = require("express");
const {
  adminLogin,
  createAdmin,
  viewCoupons,
  addCoupon,
  toggleCoupon,
  claimHistory,
} = require("../controllers/adminController");
const router = express.Router();

// Admin login route
router.post("/admin/login", adminLogin);

// Create admin account (For initial setup)
router.post("/admin/create", createAdmin);

// Admin Coupon Management Routes
router.get("/admin/coupons", viewCoupons);
router.post("/admin/coupon/add", addCoupon);
router.post("/admin/coupon/toggle", toggleCoupon);

router.get("/admin/claimHistory", claimHistory)

module.exports = router;
