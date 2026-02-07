# 📦 Institutional Electronics E-Commerce Web Application
*A streamlined web platform for organizational electronics procurement*

---

## 🚀 Project Overview

The **Institutional Electronics E-Commerce Platform** is a web-based application designed to simplify how **companies and institutions** procure electronic equipment. Unlike general consumer marketplaces, this platform focuses on **organizational needs** such as bulk purchasing, supplier verification, order tracking, and role-based workflows.

### Problems Addressed
- Supplier delays and unclear delivery timelines
- Lack of trust in vendors and product authenticity
- Poor visibility into order status and procurement history
- Inefficient coordination between procurement and IT teams

### Target Users
- Companies and institutions purchasing electronics
- Procurement and IT teams responsible for sourcing and deployment

---

## 📘 Product Requirements Document (PRD)

### 3.1 Goals & Objectives
- **Increase procurement efficiency** through centralized product discovery and ordering
- **Reduce fulfillment issues** with clear order status and delivery visibility
- **Improve trust and reliability** via supplier verification and warranty transparency

**Success Criteria**
- Faster procurement cycle times
- Reduced order disputes and delays
- Increased repeat usage by registered organizations

---

### 3.2 Scope

#### In Scope
- Web-based MVP application
- Role-based authentication (Procurement Manager, IT Administrator)
- Product browsing and keyword search
- Bulk ordering and cart management
- Order tracking with status labels
- Supplier verification and warranty display

#### Out of Scope
- Social login and multi-factor authentication
- Advanced search filters or recommendations
- Real-time shipment tracking
- Reviews, ratings, or internal messaging
- Bulk pricing or discount logic

---

### 3.3 User Personas

#### Procurement Manager
- Goal: Purchase electronics efficiently for the organization
- Pain Points: Supplier delays, lack of transparency, order tracking issues

#### IT Administrator
- Goal: Verify product compatibility and manage deployment timelines
- Pain Points: Unclear warranties, inconsistent product quality, delivery uncertainty

---

### 3.4 Functional Requirements

1. Welcome & onboarding with CTA
2. Email/password authentication with role selection
3. Company profile creation and order history
4. Product catalog and keyword search
5. Bulk ordering via cart and checkout
6. Order tracking with status labels
7. Supplier verification and warranty display

---

### 3.5 Non-Functional Requirements

- Fast page loads and responsive UI
- Secure authentication and RBAC
- Scalable multi-organization support
- Accessible and readable UI
- Reliable order data consistency

---

### 3.6 Assumptions & Constraints

- Web-only MVP
- Desktop-first, responsive design
- Static or manually updated data initially
- Backend integrations evolve post-MVP

---

## 🛠️ Tech Stack

### 4.1 Tech Stack Table

| Layer            | Technology                  | Purpose |
|------------------|-----------------------------|---------|
| Frontend         | Next.js 16 (React 19)       | App Router, SSR, RSC |
| Language         | TypeScript                  | Type safety |
| State Management | Redux Toolkit / Context API | Global state |
| Styling          | Tailwind CSS v4             | Responsive UI |
| Backend & Auth   | Supabase                    | Auth, RBAC, APIs |
| Database         | PostgreSQL (Supabase)       | Data persistence |
| Realtime         | Supabase Realtime           | Live updates |

---

### 4.2 Tech Stack Visual Representation

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)

---

## 🧱 System Architecture (High-Level)

Web Client
    │
    ▼
Next.js App (Frontend)
    │
    ▼
Backend API
    │
    ▼
Database

# Architecture Description

Client-side rendered web application using Next.js App Router

Backend API handles authentication, products, and orders

Database stores users, organizations, products, and orders

# ✨ Features
Current (MVP)

Welcome page with onboarding CTA

Role-based authentication

Company profile management

Product browsing and search

Bulk ordering and cart

Order tracking with status labels

Supplier verification and warranty display

Planned / Future

Advanced search and filtering

Real-time shipment tracking

Supplier ratings and reviews

Bulk pricing and discounts

Admin analytics dashboard

# ⚙️ Installation & Setup
Prerequisites

Node.js (LTS)

npm or yarn

Installation
git clone <repository-url>
cd project
npm install

Run Development Server
npm run dev

# ▶️ Usage

Visit the Welcome Page

Click Get Started

Sign up or log in as Procurement Manager or IT Administrator

Browse products and place orders

Track orders and review history

# 📂 Project Structure
src/app/
├─ (public)/
│  ├─ page.tsx
│  ├─ privacy/page.tsx
│  └─ terms/page.tsx
├─ (auth)/
│  ├─ home/page.tsx
│  ├─ products/page.tsx
│  ├─ orders/page.tsx
│  ├─ cart/page.tsx
│  └─ layout.tsx
├─ (auth-portal)/
│  ├─ login/page.tsx
│  └─ register/page.tsx
├─ layout.tsx
└─ globals.css

# 🤝 Contributing

Fork the repository

Create a feature branch

Submit a pull request

Follow formatting and code standards

# 📄 License

This project is licensed under the MIT License.