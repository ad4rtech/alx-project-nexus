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

#### Primary Users
- **Procurement Manager**
  - Goal: Purchase electronics efficiently for the organization
  - Pain Points: Supplier delays, lack of transparency, order tracking issues

- **IT Administrator**
  - Goal: Verify product compatibility and manage deployment timelines
  - Pain Points: Unclear warranties, inconsistent product quality, delivery uncertainty

---

### 3.4 Functional Requirements

1. **Welcome & Onboarding**
   - Landing page with “Get Started” CTA
2. **Authentication & Roles**
   - Email/password login and sign-up
   - Role selection and session persistence
3. **Company Profile Management**
   - Create and view organization profile
   - View past orders
4. **Product Listing & Search**
   - Browse electronics catalog
   - Keyword-based search
   - Product detail pages
5. **Order Placement & Bulk Purchasing**
   - Add products to cart
   - Adjust quantities for bulk orders
   - Checkout and order review
6. **Order Tracking**
   - View order list with status and delivery dates
7. **Supplier & Trust Signals**
   - Verified supplier badges
   - Supplier contact details
   - Warranty information

---

### 3.5 Non-Functional Requirements

- **Performance:** Fast page loads and responsive UI
- **Security:** Secure authentication and role-based access
- **Scalability:** Ability to support multiple organizations
- **Accessibility:** Clear typography, readable layouts, keyboard-friendly navigation
- **Reliability:** Consistent order and status data display

---

### 3.6 Assumptions & Constraints

- MVP is **web-only**, desktop-first but responsive
- Static or manually updated data for early versions
- Limited time and scope prioritize simplicity over advanced automation
- Backend services and integrations may evolve post-MVP

---

## 🛠️ Tech Stack

### 4.1 Tech Stack Table

| Layer            | Technology                          | Purpose |
|------------------|-------------------------------------|---------|
| Frontend         | Next.js 16 (React 19)               | App Router, SSR, and React Server Components |
| Language         | TypeScript                          | End-to-end type safety and maintainability |
| State Management | Redux Toolkit / Context API         | Global state (cart, orders, session) and UI state |
| Styling          | Tailwind CSS v4                     | Utility-first, responsive UI styling |
| Backend & Auth   | Supabase                            | Authentication, RBAC, and API services |
| Database         | PostgreSQL (Supabase)               | Secure, scalable data persistence |
| Realtime         | Supabase Realtime                   | Live updates for orders and deployments |

---


### 4.2 Tech Stack Visual Representation

**Technology Badges**

These badges highlight the core technologies powering **ElectroProcure**, emphasizing modern, scalable, and enterprise-ready tools used across the frontend, state management, styling, and backend services.

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)

**Stack Summary**
- **Next.js 16 (App Router)** – Server-Side Rendering (SSR) and React Server Components (RSC)
- **React 19** – Modern, high-performance UI development
- **TypeScript** – End-to-end type safety and maintainability
- **Redux Toolkit** – Centralized global state management (cart, session, orders)
- **Tailwind CSS v4** – Utility-first, responsive UI styling
- **Supabase** – Authentication, PostgreSQL database, and real-time services


**Architecture (High-Level)**

```mermaid
flowchart LR
    Client[Web Client] --> Frontend[Next.js App]
    Frontend --> API[Backend API]
    API --> DB[(Database)]

🧱 System Architecture

Client-side rendered web application using Next.js App Router

Backend API handles authentication, products, orders

Database stores users, organizations, products, and orders

✨ Features
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

⚙️ Installation & Setup
Prerequisites

Node.js (LTS)

npm or yarn

Installation
git clone <repository-url>
cd project
npm install

Run Development Server
npm run dev



▶️ Usage

Visit the Welcome Page

Click Get Started

Sign up or log in as Procurement Manager or IT Administrator

Browse products and place orders (Procurement Manager)

Review products and track orders (IT Administrator)

📂 Project Structure
src/app/
├─ (public)/
│  ├─ page.tsx             # Welcome / Landing Page
│  ├─ privacy/page.tsx     # Privacy Policy
│  └─ terms/page.tsx       # Terms of Service
├─ (auth)/
│  ├─ home/page.tsx        # User Dashboard
│  ├─ products/page.tsx    # Product Catalog
│  ├─ orders/page.tsx      # Order History
│  ├─ cart/page.tsx        # Shopping Cart
│  └─ layout.tsx           # Authenticated Layout
├─ (auth-portal)/
│  ├─ login/page.tsx       # Login Page
│  └─ register/page.tsx    # Registration Page
├─ layout.tsx              # Root Layout
└─ globals.css             # Global Styles



🤝 Contributing

Fork the repository

Create a feature branch

Submit a pull request with clear descriptions

Follow existing code and formatting conventions

License
This project is licensed under the MIT License.


