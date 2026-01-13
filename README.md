# GigFlow

GigFlow is a mini freelance marketplace backend where:
- Users can post jobs (Gigs)
- Freelancers can place bids
- Gig owners can hire one freelancer per gig
- This project focuses on backend architecture, authentication, authorization, and correct state transitions.

## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT (HttpOnly Cookies)
- Security: bcrypt, route protection middleware
- API Testing: Postman

## Core Features Implemented
Authentication
- User registration & login
- Password hashing using bcrypt
- JWT stored in HttpOnly cookies
- Protected routes via middleware

Gig Management
- Create a gig (authenticated users)
- Fetch all open gigs (public)
- Search gigs by title
- Gig status management (open → assigned)

Bidding System
- Freelancers can place bids on open gigs
- Gig owners cannot bid on their own gigs
- Bid status tracking (pending, hired, rejected)
- Only gig owners can view bids for their gigs

Hiring Logic 
- When a gig owner hires a freelancer:
- Gig status changes from open → assigned
- Selected bid status becomes hired
- All other bids for the same gig are automatically marked rejected
- Further hiring is blocked once a gig is assigned
- Only the gig owner can perform the hire action

## API Endpoints
* Auth

| Method |	Endpoint |	Description |
|--------|-----------|--------------|
| `POST `|	/api/auth/register |	Register user |
| `POST` |	/api/auth/login |	Login & set JWT cookie |

* Gigs

| Method |	Endpoint |	Description |
|--------|-----------|--------------|
| `GET` |	/api/gigs |	Fetch all open gigs |
| `POST` |	/api/gigs |	Create a new gig (protected) |

* Bids

| Method |	Endpoint |	Description |
|--------|-----------|--------------|
| `POST` |	/api/bids	| Place a bid (protected) |
| `GET` |	/api/bids/:gigId |	Get bids for a gig (owner only) |
|` PATCH` |	/api/bids/:bidId/hire |	Hire a freelancer (owner only) |

### Environment Setup
- Clone repository
- git clone https://github.com/psawner/gigFlow.git
- cd backend
- Install dependencies
- npm install
- Create .env file
- MONGO_URI=mongodb://127.0.0.1:27017/gigflow
- JWT_SECRET=your_secret_key
- Run server
- npm start
- Server runs on http://localhost:5000

### Testing the Application
All flows are tested using Postman:
- User registration & login
- Gig creation
- Bid placement
- Hiring flow with correct state updates

### Frontend
Due to time constraints, the frontend is not implemented.

### Demo Video
Due to time constraints, a demo video could not be recorded.
However, the complete hiring flow can be verified using the provided APIs.

