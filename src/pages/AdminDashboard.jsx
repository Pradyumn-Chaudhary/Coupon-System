import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [updateDiv, setupdateDiv] = useState(false);
  const [code, setcode] = useState("");
  const [newCode, setnewCode] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/coupons`
        );
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogged") === "true"; // Convert to Boolean
    if (loggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  const handleAddCoupon = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/coupon/add`,
        {
          code: couponCode,
        }
      );
      toast.success(`${response.data.message}`);
      setCoupons([...coupons, { code: couponCode, enabled: true }]);
      setCouponCode("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding coupon.");
    }
  };

  const handleToggleCoupon = async (code) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/coupon/toggle`,
        {
          code,
        }
      );
      toast.success(`${response.data.message}`);
      setCoupons(
        coupons.map((coupon) =>
          coupon.code === code
            ? { ...coupon, enabled: !coupon.enabled }
            : coupon
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error toggling coupon.");
    }
  };

  const handleUpdateDiv = (code) => {
    setupdateDiv(true);
    setcode(code);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    window.location.href = "/";
  };

  const handleUpdateCoupon = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/updateCoupon`,
        {
          code,
          newCode,
        }
      );
      toast.success(`${response.data.message}`);
      setCoupons(
        coupons.map((coupon) =>
          coupon.code === code ? { ...coupon, code: newCode } : coupon
        )
      );
      setupdateDiv(false);
      setnewCode("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating coupon.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ToastContainer />
      {/* Left Section - Card Grid */}
      <div className="w-2/3 p-6 overflow-auto h-screen">
        <h1 className="text-3xl font-bold !text-gray-900 mb-6">Coupons</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/271/116/non_2x/coupon-template-vector.jpg"
                alt="coupon"
              />
              <h2 className="text-xl font-semibold !text-gray-800 mb-2">
                {coupon.code}
              </h2>
              <p className="!text-gray-600">
                Status: {coupon.enabled ? "Enabled" : "Disabled"}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleToggleCoupon(coupon.code)}
                  className={`mt-2 px-4 py-2 rounded-md font-semibold text-white ${
                    coupon.enabled
                      ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
                >
                  {coupon.enabled ? "Disable" : "Enable"}
                </button>
                <button
                  className="mt-2 px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  onClick={() => handleUpdateDiv(coupon.code)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Coupon Form */}
      <div className="w-1/3 bg-white p-6 shadow-lg border-l border-gray-200 flex flex-col justify-between h-screen">
        <div>
          <h2 className="text-2xl font-semibold !text-gray-900 mb-6">
            Add Coupon
          </h2>
          <form onSubmit={handleAddCoupon} className="space-y-4">
            <div>
              <label
                htmlFor="couponCode"
                className="!text-gray-700 font-medium"
              >
                Coupon Code
              </label>
              <input
                type="text"
                id="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 !text-gray-900"
                placeholder="Enter coupon code"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 !text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
              onClick={handleAddCoupon}
            >
              Add Coupon
            </button>
          </form>

          {updateDiv && (
            <div className="space-y-4 mt-7">
              <div>
                <label
                  htmlFor="couponCode"
                  className="!text-gray-700 font-medium"
                >
                  Current Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  readOnly
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 !text-gray-900"
                />
                <input
                  type="text"
                  id="newCode"
                  value={newCode}
                  onChange={(e) => setnewCode(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 !text-gray-900"
                  placeholder="Enter new code"
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 !text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
                onClick={handleUpdateCoupon}
              >
                Update
              </button>
              <button
                type="button"
                className="w-full bg-red-600 !text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300 cursor-pointer"
                onClick={() => setupdateDiv(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between gap-7">
          <Link to={"/claim-history"} className="w-full">
            <button
              type="button"
              className="w-full bg-gray-600 !text-white py-2 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
            >
              Claim History
            </button>
          </Link>

          <button
            type="button"
            className="w-full bg-red-600 !text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
