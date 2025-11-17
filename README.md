# Freelance Marketplace — README

> **Project:** Freelance Marketplace (MERN + TailwindCSS)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture & Folder Structure](#architecture--folder-structure)
5. [Installation & Local Setup](#installation--local-setup)
6. [Environment Variables (.env.example)](#environment-variables-envexample)
7. [Running Locally](#running-locally)
8. [Database & Seed Data](#database--seed-data)
9. [Payment Integration (Stripe) — Notes](#payment-integration-stripe---notes)
10. [Deployment (Netlify / Render)](#deployment-netlify--render)
11. [Testing & QA](#testing--qa)
12. [Security & Best Practices](#security--best-practices)
13. [Submission Checklist](#submission-checklist)
14. [Licensing & Terms](#licensing--terms)
15. [Troubleshooting / FAQ](#troubleshooting--faq)

---

## Project Overview

A full-stack freelance marketplace where freelancers can list services and clients can post jobs. The app includes user authentication, role-based access, payments with Stripe, contract/milestone handling, reviews & ratings, search and filters, and dashboards for both freelancers and clients.

This README contains everything needed to run, test, and deploy the project.

---

## Features

* User authentication (email + OAuth optional)
* Role-based users: Freelancer and Client
* Freelancer features: create/manage service listings, portfolio,contracts, reviews
* Client features: create/manage job listings, search & filter freelancers, contracts, payments (escrow/milestones)
* Payment processing via Stripe (one-time & milestone flows)
* Reviews & ratings with response support
* Responsive UI built with TailwindCSS

---

## Tech Stack

* **Frontend:** React (Vite), TailwindCSS, react-router, react-query
* **Backend:** Node.js, Express, MongoDB (Mongoose)
* **Payments:** Stripe (server-side routes + client SDK)
* **Deployment:** Frontend on Netlify, Backend on Render 
* **Storage:** Cloudinary (for images) 
* **Auth:** JWT (access & refresh tokens)

---

## Architecture & Folder Structure

A suggested folder structure (feel free to adapt):

```
root
├─ client/                # React app (Vite)
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ services/        # axios wrapper, auth helper
│  │  ├─ hooks/
│  │  ├─ styles/
│  │  └─ main.jsx
│  └─ package.json
├─ server/                # Express API
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ middleware/
│  │  └─ index.js
│  └─ package.json
└─ README.md
```

---

## Installation & Local Setup

> You'll run two apps locally: the **backend** (Express) and the **frontend** (React). Keep both running in separate terminals.

### Prerequisites

* Node.js (v18+ recommended)
* npm 
* MongoDB instance (local or cloud Atlas)
* Stripe account (for API keys)
* Cloudinary 
  
### 1) Clone the repo

```bash
git clone <your-repo-url>
cd <repo-root>
```

### 2) Install server dependencies

```bash
cd server
npm install
```

### 3) Install client dependencies

```bash
cd ../client
npm install
```

---

## Environment Variables (.env.example)

Create `.env` files in `server/` and `client/` as needed. Example values below.

### server/.env

```
PORT=3000  
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/freelance-db
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_api_secret
CLIENT_URL=http://localhost:5173
```

### client/.env (Vite uses VITE_ prefix)

```
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> **Important:** Never commit `.env` with secret keys to GitHub. Use GitHub secrets or the host's env configuration when deploying.

---

## Running Locally

### Start backend

```bash
cd server
npm start
# or: NODE_ENV=development nodemon src/index.js
```

Server should be running on `http://localhost:3000` (or your configured port).

### Start frontend

```bash
cd client
npm run dev
```

Frontend (Vite) default is `http://localhost:5173`.

---


## Payment Integration (Stripe) — Notes

This project supports two flows:

1. **One-time Payment (Buy Now)**
2. **Milestone/Escrow Flow** — client funds escrow (intent), platform holds until milestone completed, then release to freelancer

### Backend (server)

* Install Stripe SDK: `npm install stripe`
* Create secure endpoints:

  * `POST /api/payments/create-payment-intent` — creates PaymentIntent for immediate payments

**Example server snippet**:

```js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

app.post('/api/payments/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd', metadata } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});
```

### Frontend (client)

* Use `@stripe/react-stripe-js` and `@stripe/stripe-js`.
* Create a checkout flow that calls your backend to get `clientSecret` and confirms payment with `stripe.confirmCardPayment(clientSecret, { payment_method: ... })`.

**Important:** Keep all secret keys on the server. Only use publishable key in client.

---

## Deployment (Netlify / Render)

**Recommended setup:**

* Deploy **backend** (Express API) on **Render** as a web service (Node).

  * Set build & start commands: `npm install` and `npm start` (or start script in package.json)
  * Add environment variables in Render dashboard (MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY, CLOUDINARY etc.)

* Deploy **frontend** (client) on **Netlify** (or Vercel): connect GitHub repo and set build command and publish directory.

  * Build command: `npm run build`
  * Publish directory: `dist`
  * Add environment variables in Netlify UI: `VITE_API_URL`, `VITE_STRIPE_PUBLISHABLE_KEY` (do not put secret keys here)

### Netlify specifics

* If you get dependency issues on Netlify, ensure `package.json` doesn't contain old/unsupported packages (React 18 vs 19 issues). Clean install locally and commit updated `package-lock.json`.
* If you use client-side routing, add a `_redirects` file in `public/` with:

  ```
  /*    /index.html   200
  ```

### Render specifics

* Expose port via `process.env.PORT || 3000`.
* Add health checks and auto deploy from main branch.

---

## Testing & QA

* Manual tests:

  * Register as freelancer/client
  * Create a gig / create a job
  * Upload images to Cloudinary
  * Create contract and trigger payment (test Stripe keys)
  * Leave a review and ensure it appears

* Automated tests (optional):

  * Unit tests with Jest for backend controllers
  * Integration tests for API routes using supertest

---

## Security & Best Practices

* Never expose secret keys in client or commit `.env`
* Use HTTPS in production
* Validate and sanitize all incoming user data
* Rate-limit auth routes and sensitive endpoints
* Use Helmet and CORS configuration in Express
* Hash passwords with bcrypt (or Argon2) and use salted hashes

---

## Submission Checklist (what to submit in the portal)

1. GitHub repo URL (public) — include `client/` and `server/` folders
2. Netlify URL (frontend)
3. Render URL (backend)
4. README.md in root (this document) and additional docs if needed
5. .env.example files in both client & server

---

## Licensing & Terms

* Open-source your repository (MIT is fine). Do **NOT** include any mention of the proprietary company name anywhere in the code or README.
* Do **NOT** commit secret keys or credentials.
* By submitting, you confirm you will not share this confidential assignment externally.

---

## Troubleshooting / FAQ

**Q: I get dependency install errors on Netlify**

* A: Remove unsupported/old packages (e.g., `infinite-react-carousel`). Clean `node_modules` and `package-lock.json` locally, run `npm install`, commit lockfile, then redeploy. Use `--legacy-peer-deps` only locally, not recommended in CI.

**Q: Stripe webhook fails locally**

* A: Use `stripe listen --forward-to localhost:5000/api/payments/webhook` to forward webhooks during development.

**Q: Images not loading on production**

* A: Ensure Cloudinary (or S3) credentials set in host environment and the URLs in DB are absolute (https://...)

---

## Contact

If you need additional deliverables (sample seed scripts, Postman collection, or deployment step-by-step screenshots), reply and I will add them.

---

*Good luck — deliver something you’re proud of!*
