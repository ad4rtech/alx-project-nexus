# 📖 implementation Guide

## 🌐 View the Project
You can access the live version of the project at the link below:

**https://alx-project-nexus-tau-three.vercel.app**

---

## 📱 App Guide

This guide covers how to set up, run, and use the **Institutional Electronics E-Commerce Platform**.

### 🛠️ Installation & Local Setup

To run the application locally on your machine, follow these steps:

#### Prerequisites
- **Node.js** (LTS version recommended)
- **npm** or **yarn**

#### Steps
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd project-nexus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env.local` file in the root directory.
   - Add necessary API keys (e.g., Supabase credentials) as specified in `SUPABASE_SETUP.md`.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

### 💡 User Guide & Workflows

#### 1. Onboarding
- **Welcome Page:** Users land on a clean welcome screen with a "Get Started" call-to-action.
- **Goal:** Introduces the platform's value proposition for organizational procurement.

#### 2. Authentication
- **Sign Up / Login:** Secure access using email and password.
- **Role Selection:**
  - **Procurement Manager:** Focuses on sourcing, bulk ordering, and budget management.
  - **IT Administrator:** Focuses on technical specifications, compatibility verification, and deployment records.

#### 3. Procurement Flow (Manager)
- **Product Discovery:** Search for electronics by keyword or browse categories.
- **Bulk Ordering:** Add multiple units to the cart easily.
- **Checkout:** Review order summaries and confirm purchases for the organization.

#### 4. Administration & Tracking (IT Admin)
- **Order Tracking:** View clear status labels for active orders.
- **Verification:** Check supplier warranty verification badges to ensure authenticity.
- **History:** Access past deployment logs and procurement records.
