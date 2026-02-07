# ElectroProcure - Application Guide

## Project Overview
**ElectroProcure** is a smart electronics procurement platform designed for modern teams. It streamlines device ordering and asset management by offering a unified, role-based platform for Procurement Managers and IT Administrators. The application facilitates the entire lifecycle of electronics procurement, from ordering to deployment and tracking.

## Features & Functionality

### Role-Based Access Control (RBAC)
The application serves two primary user roles, each with tailored views and functionalities:
- **Procurement Managers**:
  - Secure account creation and management.
  - Vendor relationship management.
  - Streamlined bulk ordering processes.
  - Cart and checkout workflows.
- **IT Administrators**:
  - Dedicated dashboard (IT Admin Dashboard 2.0).
  - Device lifecycle management.
  - Organizational compliance oversight.
  - Deployment tracking.

### Core Modules
- **Authentication**: Secure login and registration portals.
- **Product Management**: Browsing and selection of electronic equipment.
- **Order Management**: Cart system, checkout process, and order history.
- **Tracking & Logistics**: Real-time tracking of shipments and deployments.
- **Dashboard**: Visual insights for admins and managers.

## UI Design Rationale
The user interface is designed to be **professional, trustworthy, and efficient**, reflecting the corporate nature of procurement while maintaining a modern user experience.

- **Color Palette**: A dominant use of **Blue** (e.g., `bg-blue-600`, `text-blue-700`) evokes trust, security, and professionalism—standard for enterprise software.
- **Typography**:
  - **Lexend**: Used for headings to provide a clean, geometric, and modern look.
  - **Funnel Sans**: Used for body text for high readability.
  - **Courier Prime**: Used for accents or data-heavy elements, adding a technical touch.
- **Visual Hierarchy**: Clear distinction between actions (primary buttons) and information. Role-specific dashboards ensure users are not overwhelmed by irrelevant features.
- **Responsiveness**: The application is mobile-first, ensuring accessibility across desktops, tablets, and phones.

## Technologies Used

### Frontend Framework
- **Next.js 16 (App Router)**: Utilizing server-side rendering (SSR) and React Server Components (RSC) for optimal performance and SEO.
- **React 19**: The latest React features for building interactive UIs.

### State Management
- **Redux Toolkit**: Manages complex global state such as the shopping cart, user session, and order data.
- **Context API**: Handles UI-specific state like Toast notifications (`ToastProvider`).

### Styling & Design
- **Tailwind CSS v4**: Utility-first CSS framework for rapid, consistent, and responsive styling.
- **Lucide React**: A consistent and lightweight icon set.
- **Google Fonts**: Custom typography integration.

### Backend & Services
- **Supabase**: Provides authentication, database (PostgreSQL), and real-time subscription capabilities.

## Best Practices & Industry Standards Followed
- **Component-Based Architecture**: Modular and reusable components (e.g., `Button`, UI blocks) to maintain code cleanliness.
- **Type Safety**: Strictly typed with **TypeScript** to prevent runtime errors and improve developer experience.
- **Directory Structure**: Logical separation of concerns using Next.js App Router conventions (`(auth)`, `(public)`, `(auth-portal)`).
- **Accessibility**: Semantic HTML tags and aria-attributes (implied by usage of standard elements and accessible component patterns).
- **Responsive Design**: Mobile-first approach using Tailwind's breakpoint system.
