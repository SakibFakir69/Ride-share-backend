Ride-Share Backend
A robust backend for a ride-sharing application built with Node.js, Express, TypeScript, and MongoDB. This project provides APIs for riders, drivers, and admins to facilitate ride requests, driver management, and administrative tasks.
Table of Contents

Features
Technologies
Installation
Running the Application
API Endpoints
Rider Endpoints
Driver Endpoints
Admin Endpoints


Scripts
Environment Variables
Contributing
License

Features

Rider Features:
Request rides with pickup and destination locations.
View ride history.
Update ride status.


Driver Features:
Accept or reject ride requests.
View earnings history.
Update ride status (Picked Up, In Transit, Completed).
Toggle online/offline availability.


Admin Features:
Manage platform operations (to be implemented).



Technologies

Runtime: Node.js
Framework: Express
Language: TypeScript
Database: MongoDB with Mongoose
Authentication: JSON Web Tokens (JWT), bcrypt
Validation: Joi, Zod
Security: Helmet, CORS
Logging: Morgan
Development Tools: ESLint, ts-node-dev, TypeScript

Installation

Clone the repository:
git clone https://github.com/your-username/ride-share-backend.git
cd ride-share-backend


Install dependencies:
npm install


Create a .env file in the root directory (see Environment Variables).


Running the Application

Development Mode (with auto-restart):
npm run dev


Linting:
npm run lint



The server will run on http://localhost:5000 by default.
API Endpoints
Rider Endpoints

Request a Ride:
POST /api/ride-share/ride/request
Body: { pickupLocation, destinationLocation }


Update Ride Status:
PATCH /api/ride-share/ride/:id/status
Example: /api/ride-share/ride/:id/status


View Ride History:
GET /api/ride-share/ride/me



Driver Endpoints

Accept/Reject Ride Requests:
PATCH /api/ride-share/drivers/request


View Earnings History:
GET /api/ride-share/driver/earning


Update Ride Status (Picked Up → In Transit → Completed):
PATCH /api/ride-share/drivers/ride/status


Set Availability Status (Online/Offline):
PATCH /api/ride-share/drivers/online-status



Admin Endpoints

To be implemented.

Scripts

npm run dev: Start the server in development mode with auto-restart.
npm run lint: Run ESLint to check code quality.
npm test: Placeholder for tests (to be implemented).

Environment Variables
Create a .env file in the root directory with the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/ride-share
JWT_SECRET=your_jwt_secret



License
This project is licensed under the ISC License.
