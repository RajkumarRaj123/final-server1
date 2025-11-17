# Freelance Marketplace Backend – README

## 📌 Overview

This is the **Backend** for the Freelance Marketplace platform built using the **MERN Stack**. The backend provides RESTful APIs for authentication, gigs/services, job postings, orders, payments, reviews, and user management.

---

## 🛠️ Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Server-side framework
* **MongoDB + Mongoose** – Database & ORM
* **JWT Authentication** – Secure user login
* **Stripe Payment Gateway** – Payment & checkout
* **Multer / Cloud storage (optional)** – For file uploads

---

## 📂 Folder Structure

```
backend/
|-- controllers/
|-- models/
|-- routes/
|-- middleware/
|-- utils/
|-- config/
|-- server.js
|-- package.json
```

### **Controllers**

Handles business logic (Auth, Users, Gigs, Jobs, Orders, Reviews)

### **Models**

MongoDB schema definitions

### **Routes**

API endpoints

### **Middleware**

Authentication, Error handling, Validation

### **Utils**

Payment integration, helper functions

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```
PORT=8800
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Installation & Setup

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the server

**Development:**

```
npm run dev
```

**Production:**

```
npm start
```

Backend will run on:

```
http://localhost:8800
```

---

## 🔑 Authentication APIs

### **POST /api/auth/register**

Register new freelancer or client

### **POST /api/auth/login**

Get JWT token

### **GET /api/auth/logout**

Clear session

---

## 👤 Users API

### **GET /api/users/:id**

Get single user profile

### **PUT /api/users/:id**

Update user profile

### **DELETE /api/users/:id**

Delete account

---

## 🛒 Gigs / Services API

### **POST /api/gigs**

Create a new gig

### **GET /api/gigs/single/:id**

Get gig details

### **GET /api/gigs**

Get all gigs (with filters)

---

## 📋 Job Listings API

### **POST /api/jobs**

Client posts a job

### **GET /api/jobs**

View all jobs

### **GET /api/jobs/:id**

View single job

---

## 💰 Orders / Payment API

### **POST /api/orders/create-payment-intent**

Create Stripe Payment Intent

### **POST /api/orders**

Confirm order

### **GET /api/orders**

List orders (client/freelancer)

---

## ⭐ Reviews API

### **POST /api/reviews/:gigId**

Add review for gig

### **GET /api/reviews/:gigId**

List reviews

---

## 🔒 Middleware

### **verifyToken**

Ensures user is authenticated

### **roleCheck**

Ensures user is freelancer/client

### **errorHandler**

Handles API errors

---

## 🧪 Testing

Use **Postman** or **Thunder Client**

Collection examples:

```
POST /api/auth/register
POST /api/auth/login
GET  /api/gigs/single/:id
POST /api/orders/create-payment-intent
```

---

## 📦 Deployment

### 1️⃣ Upload backend to **Render / Railway**

* Create Web Service
* Add environment variables
* Set start command:

```
npm start
```

### 2️⃣ Add MongoDB Atlas connection

### 3️⃣ Add frontend URL in CORS

---

## 📝 License

This backend API is open-source for assessment purposes.

---

If you need:
✅ Full backend code
✅ Routes + controllers templates
✅ MongoDB models
✅ Postman collection
→ Just tell me, I will generate everything.
