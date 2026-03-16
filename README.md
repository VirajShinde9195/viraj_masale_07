# 🌶️ Viraj Masale – Role-Based E-Commerce Platform

![HTML](https://img.shields.io/badge/Frontend-HTML-orange)
![CSS](https://img.shields.io/badge/Style-CSS-blue)
![JavaScript](https://img.shields.io/badge/Logic-JavaScript-yellow)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Supabase](https://img.shields.io/badge/Backend-Supabase-green)
![License](https://img.shields.io/badge/Project-Academic-lightgrey)

**Viraj Masale** is a **cloud-powered role-based e-commerce platform** developed to sell spice products online.
The system integrates **secure authentication, database management, inventory control, and order lifecycle tracking** using **Supabase backend services**.

This project demonstrates **backend database design, API integration, role-based access control, and secure cloud architecture**.

---

# 🌐 Live Project

You can explore the project here:

```
Website: https://viraj-masale.netlify.app/

```

This allows interviewers to:

* View the working website
* Observe product ordering workflow
* Understand backend database structure

---

# 🏗️ System Architecture

```
                User Browser
                     │
                     │
        HTML + CSS + JavaScript Frontend
                     │
                     │ API Calls
                     ▼
              Supabase Backend
        ┌─────────────────────────┐
        │  Authentication Service │
        │  PostgreSQL Database    │
        │  Row Level Security     │
        │  REST APIs              │
        └─────────────────────────┘
                     │
                     ▼
               Database Tables
```

---

# 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Supabase

### Database

* PostgreSQL

### Security

* Supabase Authentication
* Row Level Security (RLS)

---

# 👥 User Roles

The application supports **three user types**.

| Role     | Permissions                             |
| -------- | --------------------------------------- |
| Guest    | Browse products                         |
| Customer | Add to cart, place orders, track orders |
| Admin    | Manage products, inventory, and orders  |

---

# 🛒 Complete Application Workflow

## 1️⃣ Guest Browsing

Users can open the website and explore available products.

Features available:

* View product list
* Search products
* View product details
* Check stock availability

However, guests must login to place orders.

---

## 2️⃣ User Authentication

Authentication is handled through **Supabase Auth**.

Supported features:

* User signup
* Secure login
* Session management

After login:

| Role     | Redirect           |
| -------- | ------------------ |
| Customer | Customer dashboard |
| Admin    | Admin dashboard    |

---

## 3️⃣ Product Display

Products are stored in the **products table** and dynamically loaded.

Each product contains:

* Name
* Category
* Description
* Price per gram
* Image
* Available stock

Stock visibility:

```
Stock > 0  → Available
Stock = 0  → Out of Stock
```

---

## 4️⃣ Add to Cart

Customers select product quantity in **grams**.

Example quantities:

```
100 gm
200 gm
500 gm
```

Before adding to cart:

* System verifies login
* System checks available stock
* Quantity validation is performed

Cart items are temporarily stored in **local storage**.

---

## 5️⃣ Order Placement

During checkout:

1️⃣ Order is created in **orders table**
2️⃣ Individual products are stored in **order_items table**
3️⃣ Product stock is reduced
4️⃣ Order status is set to:

```
pending
```

---

## 6️⃣ Order Lifecycle

Orders follow a controlled lifecycle.

```
pending
   ↓
accepted
   ↓
preparing
   ↓
delivered
```

Special case:

```
pending → cancelled
```

Customers can cancel only **pending orders**.

This ensures proper order management and prevents misuse.

---

# 🗄️ Database Schema

The system uses a **normalized relational schema**.

```
customers
   │
   │ 1
   │
   ▼
orders
   │
   │ 1
   │
   ▼
order_items
   ▲
   │
   │ many
   │
products
```

### Tables

### products

Stores product catalog and inventory.

Fields include:

* id
* name
* category
* price
* description
* image_url
* stock_quantity

---

### orders

Stores customer order details.

Fields include:

* id
* customer_id
* total_amount
* status
* created_at

---

### order_items

Stores product items inside orders.

Fields include:

* id
* order_id
* product_id
* quantity
* price

---

### profiles / users

Stores user role information.

Fields include:

* user_id
* email
* role

---

# 📦 Inventory Management

Inventory is controlled using **stock_quantity**.

When order is placed:

```
stock_quantity = stock_quantity - ordered_quantity
```

When order is cancelled:

```
stock_quantity = stock_quantity + cancelled_quantity
```

This ensures **accurate inventory tracking**.

---

# 🔐 Security Implementation

Security is implemented using **Row Level Security (RLS)**.

Example policy:

Customers can only access their own orders.

```sql
auth.uid() = customer_id
```

Security ensures:

* Data privacy
* Role-based access
* Multi-user protection

---

# 🧑‍💼 Admin Dashboard

Admins have complete platform control.

Admin features include:

### Product Management

* Add new products
* Update stock
* Edit product details
* Remove products

### Order Management

* View all customer orders
* Update order status
* Track delivery progress

### Customer Monitoring

* View registered users
* Monitor order activity

---

# ⚠️ Risk Handling

The system addresses several operational risks.

| Risk                | Solution                      |
| ------------------- | ----------------------------- |
| Inventory mismatch  | Stock validation before order |
| Over-ordering       | Quantity check vs stock       |
| Unauthorized access | Authentication + RLS          |
| Data loss           | Orders never deleted          |

---

# 📈 Future Improvements

Planned enhancements:

* AI powered help chatbot
* Online payment gateway
* Customer review system
* Mobile responsive design
* Advanced analytics dashboard

---

# 🎯 Learning Outcomes

This project demonstrates knowledge in:

* Full-stack web development
* Relational database design
* Role-based access control
* Secure API communication
* Cloud database systems
* Inventory and order management

---

# 👨‍💻 Developer

**Viraj Shinde**

Developer of **Viraj Masale E-Commerce Platform**

---
