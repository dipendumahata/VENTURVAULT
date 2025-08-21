VENTURVAULT 🚀
The bridge between Indian innovation and capital.

VENTURVAULT is a full-stack MERN application designed to be a comprehensive ecosystem connecting entrepreneurs, investors, advisors, and bankers in the Indian startup landscape. It's more than a marketplace; it's a platform for growth, featuring real-time deal rooms, dynamic role-based dashboards, and a marketplace for professional services.

✨ Features
This project is packed with features designed to create a seamless and valuable experience for every user role.

Core Platform Features:
Role-Based Authentication: Secure JWT-based authentication for four distinct user roles: Business Owner, Investor, Advisor, and Banker.

Real-time Notifications: Instant updates for key events (like an investor showing interest) using Socket.IO.

Dynamic Dashboards: Each user role gets a unique, animated dashboard with relevant previews and actions.

Interactive Deal Rooms: A private, real-time chat room (with a WhatsApp-style UI) is created when a business owner accepts an investor's interest.

Professional UI/UX: A modern, premium design built with Tailwind CSS and brought to life with "God-level" animations using Framer Motion.

Role-Specific Functionality:
For Business Owners:

Create and manage business proposals.

A "Proposal Health Score" to improve their pitch.

Publish proposals to make them visible to investors.

View and accept interest from investors.

For Investors:

Browse all published business proposals.

View detailed proposal pages.

Express interest in proposals to initiate contact.

Manage a personal portfolio of interested proposals.

For Advisors:

Create and manage a marketplace of fixed-price "Gigs" (e.g., "Financial Review").

View and manage client orders.

For Bankers:

Post and manage various loan products (e.g., "Working Capital Loan").

🛠️ Tech Stack
This project is built using the MERN stack and other modern technologies.

Frontend: React, Vite, Redux Toolkit, React Router, Tailwind CSS, Framer Motion, Axios, Socket.io-client

Backend: Node.js, Express.js, MongoDB (with Mongoose), JWT, Socket.IO, Bcrypt.js

Database: MongoDB Atlas

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

🌟 Future Enhancements
This project has a solid foundation with many potential avenues for future development:

AI-Powered Matchmaking: An intelligent engine to suggest proposals to investors and provide feedback to founders.

Cap Table Modeler: A tool for founders to visually manage and model their company's equity.

Payment Gateway Integration: Fully functional purchasing of advisory "Gigs."

Hyper-Local Hub: Integration of government schemes and city-specific mentor networks for the Indian market.



VENTURVAULT - Low-Level Design (LLD)
Version: 1.0 (Post-Deployment)
Date: August 14, 2025

1. System Overview
1.1 Project Description
VENTURVAULT is a full-stack MERN application designed as a comprehensive ecosystem to connect Indian entrepreneurs with investors, advisors, and bankers. The platform facilitates investment opportunities through proposals, a marketplace for professional services ("Gigs"), loan product listings, and secure, real-time communication channels ("Deal Rooms") to foster negotiations and partnerships.

1.2 Technology Stack
Frontend: React (with Vite), Redux Toolkit, React Router, Tailwind CSS, Framer Motion, Axios, Socket.io-client

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Authentication: JSON Web Tokens (JWT) with role-based access control (RBAC)

Real-time Communication: Socket.IO

Deployment:

Frontend: Vercel

Backend: Render

2. System Architecture
We adopted a monolithic backend architecture for rapid development and ease of management, which is ideal for the current stage of the project.

2.1 High-Level Architecture
[Frontend: React on Vercel] <--> [API (REST & WebSocket)] <--> [Backend: Node.js on Render] <--> [Database: MongoDB Atlas]

2.2 Backend Folder Structure
/BACKEND
|-- /controllers  // Handles application logic for each route
|-- /middleware   // Auth (protect, authorize) and error handling
|-- /models       // Mongoose schemas for all database collections
|-- /routes       // API endpoint definitions
|-- .env          // Environment variables (secrets)
|-- index.js      // Main server entry point

2.3 Frontend Folder Structure
/FRONTEND
|-- /src
|   |-- /assets       // Icons and static assets
|   |-- /components   // Reusable UI components (layout, shared, role-specific)
|   |-- /context      // Socket.IO provider
|   |-- /pages        // Top-level page components
|   |-- /router       // React Router configuration
|   |-- /services     // Centralized Axios instance
|   |-- /store        // Redux Toolkit store and slices (authSlice, dataSlice)
|   |-- App.jsx       // Main application component
|   |-- main.jsx      // Application entry point

3. Database Design (MongoDB)
3.1 Collections & Schemas
users: Stores user authentication data and profiles.

email, password (hashed), role (enum: business, investor, advisor, banker, admin), profile (firstName, lastName, etc.), isVerified.

businessproposals: Stores proposals created by business owners.

businessId (ref: User), title, description, category, pitchDeck (object with problem, solution, etc.), healthScore, fundingDetails, status (enum: draft, published), interestedInvestors (array of refs: User).

gigs: Stores fixed-price services offered by advisors.

advisorId (ref: User), title, description, price, category, deliveryTime, platformFee.

loanproducts: Stores loan products offered by bankers.

bankerId (ref: User), productName, loanType, interestRate (min, max), loanAmount (min, max).

dealrooms: Represents a private chat room between a business and an investor.

proposalId (ref: BusinessProposal), businessId (ref: User), investorId (ref: User), status.

chatmessages: Stores individual messages for each deal room.

dealRoomId (ref: DealRoom), senderId (ref: User), message.

orders: Tracks purchases of Gigs.

gigId (ref: Gig), businessId (ref: User), advisorId (ref: User), totalAmount, commission.

notifications: Stores real-time notifications for users.

userId (ref: User), message, link, read (boolean).

4. API Design (Backend)
4.1 RESTful API Endpoints
Authentication (/api/auth)

POST /register: Create a new user.

POST /login: Authenticate a user and receive a JWT.

GET /me: Get the profile of the currently logged-in user (Private).

Business Proposals (/api/business)

POST /proposals: Create a new proposal (Role: business).

GET /proposals: Get all published proposals.

GET /my-proposals: Get all proposals for the logged-in business owner (Role: business).

GET /proposals/:id: Get details of a single proposal.

PUT /proposals/:id: Update a proposal (Role: business).

PUT /proposals/:id/publish: Change a proposal's status to "published" (Role: business).

POST /proposals/:id/interest: Express interest in a proposal (Role: investor).

POST /proposals/:proposalId/accept/:investorId: Accept interest and create a Deal Room (Role: business).

Advisory (/api/advisory)

POST /gigs: Create a new gig (Role: advisor).

GET /gigs: Get all active gigs.

GET /my-gigs: Get all gigs for the logged-in advisor (Role: advisor).

GET /gigs/:id: Get details of a single gig.

PUT /gigs/:id: Update a gig (Role: advisor).

Banking (/api/banking)

POST /products: Create a new loan product (Role: banker).

GET /products: Get all active loan products.

GET /my-products: Get all products for the logged-in banker (Role: banker).

Deal Rooms (/api/deal-rooms)

GET /: Get all deal rooms for the logged-in user.

GET /:id: Get details and messages for a specific deal room.

POST /:id/messages: Send a message in a deal room.

4.2 Real-time Events (Socket.IO)
Client Emits:

join_deal_room: Client joins a specific room upon opening the chat page.

Server Emits:

new_notification: Sent to a specific user when an event concerning them occurs (e.g., interest expressed).

new_chat_message: Broadcast to all members of a specific deal room when a new message is sent.

5. Frontend Design (React)
5.1 State Management (Redux Toolkit)
authSlice.js: Manages user authentication state, including user object, token, loading, error, and notifications. Handles async thunks for loginUser, registerUser, and fetchUserByToken.

dataSlice.js: Manages all application data. Holds state for proposals, gigs, orders, dealRooms, etc. Contains all async thunks for fetching and creating data.

5.2 Component Architecture
/pages: Contains top-level components for each route, such as HomePage, LoginPage, DashboardPage, ProposalDetailPage, and DealRoomPage.

/components/layout: Contains structural components like Navbar and Footer.

/components/dashboard: Contains components specific to the user dashboard, including ProfileCard, QuickActions, and the role-specific dashboard views (BusinessDashboard, InvestorDashboard, etc.).

/components/shared: Contains reusable components used across multiple pages, like AuthFormCard and NotificationBell.

5.3 Routing (react-router-dom)
Public Routes: /, /login, /register, /about, /careers, etc.

Protected Routes: All other routes (e.g., /dashboard, /my-proposals, /deal-rooms/:id) are wrapped in a ProtectedRoute component that checks for a valid user session in the Redux store.

6. Deployment Architecture
Frontend (Vercel): The React application is deployed on Vercel, connected directly to the GitHub repository for continuous deployment. A vercel.json file is used to handle client-side routing on refresh by rewriting all paths to index.html.

Backend (Render): The Node.js server is deployed as a Web Service on Render. It is also connected to GitHub for continuous deployment. Environment variables on the Render dashboard are used to securely store the MONGO_URI and JWT_SECRET.

CORS: The backend is configured to only accept requests from the deployed Vercel frontend URL and the local development environment.