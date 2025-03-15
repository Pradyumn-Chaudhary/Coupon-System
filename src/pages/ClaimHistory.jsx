import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClaimHistory = () => {
  const navigate = useNavigate();

  const [coupons, setcoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("Backend/api/admin/claimHistory");
        setcoupons(response.data);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Home Button */}
      <a
        href="/"
        className="fixed top-4 left-4 flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Home
      </a>

      {/* Page Title */}
      <h1 className="text-3xl font-bold !text-gray-900 mb-8 mt-12 text-center">
        Claimed Coupons
      </h1>

      {/* Coupons List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start gap-6"
          >
            {/* Coupon Image */}
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/271/116/non_2x/coupon-template-vector.jpg"
              alt="coupon"
              className="w-full md:w-1/3 h-40 object-cover rounded-md"
            />

            {/* Coupon Details */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold !text-gray-800 mb-2">
                Coupon: {coupon.coupon}
              </h2>
              <p className="!text-gray-700 mb-1">
                <span className="font-medium !text-gray-700">
                  Browser Session:
                </span>{" "}
                {coupon.browserSession}
              </p>
              <p className="!text-gray-700 mb-1">
                <span className="font-medium !text-gray-700">IP Address:</span>{" "}
                {coupon.ip}
              </p>
              <p className="!text-gray-700">
                <span className="font-medium !text-gray-700">Claimed On:</span>{" "}
                {new Date(coupon.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimHistory;
