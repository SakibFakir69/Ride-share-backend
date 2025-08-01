🌈 RideShare Backend API
Dive into the RideShare Backend, a vibrant and powerful API driving a cutting-edge ride-sharing platform. Crafted with Node.js, Express, TypeScript, and MongoDB, this backend delivers secure, scalable, and colorful APIs for riders, drivers, and admins to power a seamless ride-sharing adventure.

  
  
🎨 API Endpoints
🚴 Rider APIs



Method
Endpoint
Description
Body/Params




/api/ride-share/ride/request
Request a new ride
{ pickupLocation, destinationLocation }



/api/ride-share/ride/:id/status
Update ride status
id (param)



/api/ride-share/ride/me
View ride history
-


Example: PATCH /api/ride-share/ride/688a2f009fe200d6c9e5b1ba/status
🚖 Driver APIs



Method
Endpoint
Description
Body/Params




/api/ride-share/drivers/request
Accept/Reject ride requests
-



/api/ride-share/driver/earning
View earnings history
-



/api/ride-share/drivers/ride/status
Update ride status
-



/api/ride-share/drivers/online-status
Toggle online/offline status
-


🧑‍💼 Admin APIs



Method
Endpoint
Description
Body/Params




/api/ride-share/all-driver
List all drivers
-



/api/ride-share/all-ride
List all rides
-



/api/ride-share/approve/:id
Approve driver account
id (param)



/api/ride-share/account-status
Update user account status
-
  
  



📖 Table of Contents

✨ Features
🛠 Tech Stack
⚡ Installation
🚀 Running the App
🎨 API Endpoints
🚴 Rider APIs
🚖 Driver APIs
🧑‍💼 Admin APIs


📜 Scripts
🔐 Environment Variables
🤝 Contributing
📄 License


✨ Features
🚴 Rider Experience

Ride Booking: Request rides with pinpoint pickup and destination locations.
Ride History: Explore a vivid log of your past and current rides.
Live Status: Update and track ride progress in real-time.

🚖 Driver Hub

Request Management: Accept or reject ride requests with a tap.
Earnings View: Dive into a colorful earnings history dashboard.
Ride Stages: Transition rides through Picked Up, In Transit, and Completed.
Availability: Toggle online/offline status effortlessly.

🧑‍💼 Admin Control

Driver Oversight: Approve and manage driver accounts.
Ride Monitoring: View all platform rides in a glance.
Account Security: Update user account statuses with precision.


🛠 Tech Stack



Category
Tools



Runtime
Node.js


Framework
Express


Language
TypeScript


Database
MongoDB, Mongoose


Auth
JWT, bcrypt


Validation
Joi, Zod


Security
Helmet, CORS


Logging
Morgan


Dev Tools
ESLint, ts-node-dev, TypeScript



⚡ Installation

Clone the Repo:
git clone https://github.com/your-username/rideshare-backend.git
cd rideshare-backend


Install Dependencies:
npm install


Configure Environment:Create a .env file in the root (see Environment Variables).



🚀 Running the App

Dev Mode (with hot-reload):
npm run dev


Code Linting:
npm run lint



The server shines at http://localhost:5000 by default.




📜 Scripts



Command
Description



npm run dev
Start server with auto-restart


npm run lint
Run ESLint for code quality


npm test
Placeholder for tests (TBD)



🔐 Environment Variables
Create a .env file with:
PORT=5000
MONGO_URI=mongodb://localhost:27017/rideshare
JWT_SECRET=your_jwt_secret





📄 License
Licensed under the ISC License.


  🌟 RideShare: Where vibrant code meets smooth journeys! 🚗
