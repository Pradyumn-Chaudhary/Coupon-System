# 🎟️ Round-Robin Coupon Distribution System

This is a **Full-Stack Coupon Distribution System** where users can claim coupons in a **round-robin manner** with an abuse prevention mechanism. The admin can manage coupons.

---

## 📌 Features

### ✅ **User Side**

- Claim a coupon (**once every 24 hours** per IP/browser session)
- Display claimed coupon & message
- Prevent duplicate claims using **cookies & IP tracking**

### ✅ **Admin Panel**

- **Login as Admin**
- **View all coupons**
- **Add new coupons**
- **Update existing coupons**
- **Enable/Disable coupons**
- **View claim history (IP, session, timestamp)**

### ✅ **Abuse Prevention**

- **IP Tracking:** Prevents multiple claims from the same IP within 24 hours.
- **Cookie-Based Tracking:** Restricts claims from the same browser session.
- **Round-Robin Coupon Distribution:** Coupons are assigned in order.

---

## 📌 Tech Stack

**Frontend:**

- React (Vite)
- React Router (Navigation)
- Axios (API Calls)
- React Toastify (Notifications)
- Tailwind CSS (Styling)

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cookie Parser

---

## 📌 Setup Instructions

### **1️⃣ Clone the Repository** (Frontend)

```
git clone https://github.com/Pradyumn-Chaudhary/Coupon-System
```

### **2️⃣ Clone the Repository** (Backend)

```
git clone https://github.com/Pradyumn-Chaudhary/Coupon-System-Backend
```

### **3️⃣ Install Dependencies**

Backend

```
cd backend
npm install
```

Frontend

```
cd frontend
npm install
```

### **4️⃣ Set Up Environment Variables**

Backend

```
MONGO_URI=your_mongodb_connection_string
```

Frontend

```
VITE_BACKEND_URL=your_backend_URL
```

### **5️⃣ Run the Project**
Start the Backend
```
cd backend
npm start
```
Start the Frontend
```
cd frontend
npm run dev
```
--- 

## 📌 Implementation Overview  

## **1️⃣ System Flow**  

### **🔹 User Claim Process**
1. **User visits the claim page** and clicks the "Claim Coupon" button.
2. The backend:
   - **Checks for abuse prevention**:
     - ✅ **IP tracking**: Users can claim **once per 24 hours** from the same IP.
     - ✅ **Cookie-based tracking**: Users can’t claim multiple times from the same browser.
   - **Fetches the next available coupon** (round-robin order).
   - **Deletes the claimed coupon from the database**.
   - **Stores the claim in the database** (IP, session, timestamp).
3. **User gets their coupon displayed** on the frontend.

---

### **🔹 Admin Panel Process**
1. **Admin logs in** 
2. Admin can:
   - **View all coupons**.
   - **Add new coupons**.
   - **Enable/Disable coupons**.
   - **Update existing coupons**
   - **View claim history** (IP, session, timestamp).
---

## **2️⃣ Backend Implementation**
- **Built with:** `Node.js`, `Express.js`, `MongoDB (Mongoose)`
- **Abuse Prevention:** `IP Tracking`, `Session Cookies`


