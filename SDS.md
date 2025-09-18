# 📘 Software Design Specification (SDS)

- **Project Name:** Zareshop
- **Version:** 1.0
- **Date:** July 6, 2025
- **Authors:** Abel Ashine, Yitbarek Alemu

---

## 1. Introduction

### 1.1 Purpose
This document provides a detailed software design for Zareshop, an e-commerce platform tailored to the Ethiopian market. It describes the system architecture, component-level designs, data models, and external interfaces necessary to implement the system defined in the SRS.

### 1.2 Scope
The system includes:
- Customer Web App
- Merchant Dashboard
- Backend REST API
- Integration with Telebirr, CBE Birr, and SMS providers
- Role-based access control and localized UI (Amharic, English)

---

## 2. System Architecture

### 2.1 Architecture Style
- Modular 3-tier architecture
- Frontend: React (Customer + Admin UIs)
- Backend: Node.js with Express (RESTful APIs)
- Database: MongoDB (NoSQL for flexibility)

### 2.2 High-Level Architecture Diagram
```
[Browser] ---> [React Frontend] ---> [Express API Server] ---> [MongoDB]
                                        |
                                        +--> [Telebirr API]
                                        +--> [SMS API]
                                        +--> [CBE Birr API]
```

---

## 3. Component Design

### 3.1 Frontend Components (React)
| Component | Description |
|---|---|
| `<HomePage />` | Displays featured products, categories |
| `<ProductList />` | Displays paginated, filtered product grid |
| `<ProductDetails />` | Product detail with images, reviews |
| `<Cart />` | Shows selected items |
| `<Checkout />` | Shipping + Payment interface |
| `<Orders />` | User's order history |
| `<Login/Register />` | Auth screens |
| `<AdminDashboard />` | Merchant controls |
| `<AddProductForm />` | Merchant product creation |

### 3.2 Backend Modules (Express)
| Module | Description |
|---|---|
| Auth | Register/login, JWT, role-based access |
| User | Profile management |
| Product | CRUD operations, image upload |
| Order | Order creation, status updates |
| Cart | Cart synchronization |
| Payment | Integrations with Telebirr, CBE Birr |
| Notification | SMS/email triggers |
| Admin | Role management, analytics |

---

## 4. Database Design

### 4.1 Key Collections (MongoDB)

1) `users`
```json
{
  "_id": "ObjectId",
  "name": "Abel",
  "phone": "09xxxxxxxx",
  "email": "abel@example.com",
  "role": "customer | merchant | admin",
  "passwordHash": "****",
  "language": "am | en"
}
```

2) `products`
```json
{
  "_id": "ObjectId",
  "name": "Leather Bag",
  "price": 1500,
  "category": "fashion",
  "stock": 34,
  "images": ["url1", "url2"],
  "merchantId": "ObjectId"
}
```

3) `orders`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [{ "productId": "ObjectId", "qty": 2 }],
  "paymentMethod": "telebirr",
  "status": "pending | paid | shipped | delivered",
  "deliveryZone": "Addis Ababa",
  "total": 3000
}
```

---

## 5. API Design

### 5.1 Auth APIs
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### 5.2 Product APIs
- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products` (merchant only)

### 5.3 Order APIs
- POST `/api/orders`
- GET `/api/orders/my`
- PATCH `/api/orders/:id/status` (admin/merchant)

### 5.4 Payment APIs
- POST `/api/payments/telebirr/initiate`
- POST `/api/payments/cbebirr/initiate`
- POST `/api/payments/callback`

---

## 6. Security Design

### 6.1 Authentication
- JWT-based tokens
- Role claims embedded in token
- Middleware for route protection

### 6.2 Input Validation
- All inputs validated with zod or joi
- Rate limiting for sensitive endpoints

### 6.3 Payment Security
- Token-based handshake with Telebirr/CBE
- Signed request validation (SHA-256 hash)

---

## 7. Localization

### 7.1 Language Support
- i18n using react-i18next
- Language toggle UI on navbar
- Right-to-left (RTL) layout support for Amharic

### 7.2 Currency and Date
- Currency: Ethiopian Birr (ETB)
- Date format: DD/MM/YYYY
- Optional support for Ethiopian calendar

---

## 8. Deployment Strategy

### 8.1 Stack
- React (Vite) → Netlify or Vercel
- Node.js API → Render or Railway
- MongoDB Atlas (M0 or M2 cluster)

### 8.2 Environments
- Dev: `.env.dev`, local MongoDB
- Staging: for internal merchant testing
- Prod: live payments, delivery

---

## 9. External Services

| Service | Purpose |
|---|---|
| Telebirr API | Payment handling |
| CBE Birr API | Bank transfer payments |
| Beem Africa | SMS delivery for OTP/order alerts |
| SendGrid | Transactional email |

---

## 10. Diagrams (Overview)

### 10.1 Entity Relationship Diagram (ERD)
```
User ─────┐
         ▼
       Order ───── Product
          ▲             ▲
          │             │
       Payment       Merchant
```

### 10.2 Sequence – Order Checkout
```
User → Cart → Checkout → API → Telebirr → Callback → API → Order confirmed
```

---

## 11. Notes
- This SDS reflects the current planned architecture and may evolve during implementation.
- For UML diagrams (class, sequence, activity), we can add Mermaid or PlantUML diagrams, or export to PDF/Word on request.
