# Architecture Design: Anas Watches Store

This document outlines the proposed system architecture for the "Anas Watches Store" based on the requirements defined in the project configuration.

## 1. High-Level Architecture

The project will follow a decoupled **Client-Server Architecture**:
- **Frontend (Client):** A static, highly animated, and responsive user interface built with core web technologies.
- **Backend (Server):** A secure RESTful API handling business logic, user authorization, and data processing.
- **Database:** A centralized database to store all application data securely.

---

## 2. Frontend Architecture (UI/UX)

The frontend will be deployed on **Vercel** for fast global delivery. 

### Technology Stack
- **Structure:** HTML5
- **Styling:** CSS3 (Custom styles focusing on a Luxury Black & Gold theme)
- **Interactivity:** Vanilla JavaScript
- **Animations:** GSAP (GreenSock Animation Platform)
- **Carousels/Sliders:** Swiper.js
- **Icons:** Font Awesome

### Directory Structure (Proposed)
```text
/frontend
  /assets         # Images, fonts, icons
  /css            # global.css, styles for individual pages
  /js             # main.js, animations.js, api.js (for fetching data)
  index.html      # Landing page
  shop.html       # Product listing
  product.html    # Product details
  cart.html       # Shopping cart & checkout
  dashboard.html  # User/Admin dashboard
```

---

## 3. Backend Architecture (RESTful API)

Since the frontend relies on raw HTML/JS, the backend will act as an independent API. 
*(Recommendation: **Node.js with Express** or **Python with FastAPI/Flask**)*

### Core Modules
1. **Authentication & Authorization:** JWT (JSON Web Tokens) based auth for users and admins.
2. **Product Management:** CRUD operations for watches and categories.
3. **Order Management:** Tracking orders (Pending, Shipped, Delivered).
4. **Payment Processing:** Handling COD, Easypaisa, and Jazzcash verification.

### Key API Endpoints
- `POST /api/auth/login` - User/Admin login
- `GET /api/products` - Fetch all watches (with filtering/sorting)
- `POST /api/orders` - Place a new order
- `GET /api/admin/analytics` - Fetch store statistics (Admin only)

---

## 4. Database Schema Design

*(Recommendation: **MongoDB** for flexible product data or **PostgreSQL** for strict relational orders)*

### Core Tables / Collections
- **Users:** `id`, `name`, `email`, `password_hash`, `role` (admin/customer), `address`, `phone`
- **Products:** `id`, `title`, `description`, `price`, `images[]`, `category`, `stock_status`
- **Categories:** `id`, `name`
- **Orders:** `id`, `user_id`, `products[]`, `total_amount`, `status` (Pending/Shipped/Delivered), `payment_method` (COD/Easypaisa/Jazzcash), `shipping_address`
- **Reviews:** `id`, `product_id`, `user_id`, `rating`, `comment`

---

## 5. Payment Integration Flow

The system will support manual and automated payment verification:
1. **Cash on Delivery (COD):** Order is marked as "Pending" until manually updated to "Delivered" by the admin.
2. **Easypaisa / Jazzcash:** 
   - Customers will be prompted to send the total amount to the registered number (`0370-6178733`).
   - The user inputs their Transaction ID / Reference Number during checkout.
   - Admin verifies the transaction in the dashboard and updates the order status to "Processing/Shipped".

---

## 6. Next Steps & Open Questions

Before we begin coding, please consider the following:
1. **Backend Language:** Do you have a preference for the backend technology (e.g., Node.js, Python, PHP)?
2. **Database Hosting:** Should we use a cloud database like MongoDB Atlas or Supabase?
