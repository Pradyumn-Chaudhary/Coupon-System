import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ClaimCoupon = () => {
  const navigate = useNavigate();

  const handleClaim = async () => {
    try {
      const response = await axios.post("HOST/api/claim");

      //Access response.data
      toast.success(`Coupon Code: ${response.data.couponCode}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error claiming coupon.");
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogged") === "true"; // Convert to Boolean
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center relative bg-neutral-400">
      <ToastContainer />
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img
          className="p-8 rounded-t-lg"
          src="https://static.vecteezy.com/system/resources/previews/000/271/116/non_2x/coupon-template-vector.jpg"
          alt="product image"
        />
        <div className="px-5 pb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Claim your free Coupon
          </h1>
          <div className="flex items-center justify-between mt-5">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={handleClaim}
            >
              Claim Coupon
            </button>
          </div>
        </div>
      </div>
      <Link to={"/login"}>
        {" "}
        <button className="absolute top-5 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer right-10 p-3 font-bold">
          Admin Login
        </button>
      </Link>
    </div>
  );
};

export default ClaimCoupon;
