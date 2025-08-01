🚀 Ride-Share Backend API
Welcome to the Ride-Share Backend, a sleek and powerful API built with Node.js, Express, TypeScript, and MongoDB. Designed for riders, drivers, and admins, this backend fuels a seamless ride-sharing experience with secure, scalable, and modern APIs.

  
🔗 API Endpoints
🚴‍♂️ Rider APIs



Method
Endpoint
Description
Body/Params



POST
/api/ride-share/ride/request
Request a new ride
{ pickupLocation, destinationLocation }


PATCH
/api/ride-share/ride/:id/status
Update ride status
rideId (param)


GET
/api/ride-share/ride/me
View ride history
-


Example: PATCH /api/ride-share/ride/688a2f009fe200d6c9e5b1ba/status
🚗 Driver APIs



Method
Endpoint
Description



PATCH
/api/ride-share/drivers/request
Accept/Reject ride requests


GET
/api/ride-share/driver/earning
View earnings history


PATCH
/api/ride-share/drivers/ride/status
Update ride status


PATCH
/api/ride-share/drivers/online-status
Toggle online/offline status


👩‍💼 Admin APIs



Method
Endpoint
Description



GET
/api/ride-share/admin/users
List all users (TBD)


PATCH
/api/ride-share/admin/ride/:id
Manage ride details (TBD)


GET
/api/ride-share/admin/analytics
Platform analytics (TBD)  
  
  



📋 Table of Contents

🌟 Features
🧑‍💻 Technologies
⚙️ Installation
🏁 Running the Application
🔗 API Endpoints
🚴‍♂️ Rider APIs
🚗 Driver APIs
👩‍💼 Admin APIs


📝 Scripts
🔐 Environment Variables
🤝 Contributing
📜 License


🌟 Features
🚴‍♂️ Rider Features

Book Rides: Request rides with precise pickup and destination details.
Track History: View all past and ongoing rides effortlessly.
Real-Time Updates: Monitor and update ride status on the fly.

🚗 Driver Features

Manage Requests: Accept or reject ride requests instantly.
Earnings Dashboard: Access a detailed history of earnings.
Ride Workflow: Update ride stages (Picked Up → In Transit → Completed).
Availability Control: Switch between online and offline modes.

👩‍💼 Admin Features

Platform Oversight: Manage users, rides, and drivers (in development).
Analytics: Monitor platform performance (coming soon).


🧑‍💻 Technologies



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
JSON Web Tokens (JWT), bcrypt


Validation
Joi, Zod


Security
Helmet, CORS


Logging
Morgan


Dev Tools
ESLint, ts-node-dev, TypeScript



⚙️ Installation

Clone the Repo:
git clone https://github.com/your-username/ride-share-backend.git
cd ride-share-backend


Install Dependencies:
npm install


Configure Environment:Create a .env file in the root directory (see Environment Variables).



🏁 Running the Application

Development Mode (with hot-reload):
npm run dev


Code Quality Check:
npm run lint



The server will be live at http://localhost:5000 by default.




Note: Admin endpoints are under development.

📝 Scripts



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
MONGO_URI=mongodb://localhost:27017/ride-share
JWT_SECRET=your_jwt_secret


🤝 Contributing

Fork the repository.
Create a feature branch: git checkout -b feature/awesome-feature.
Commit changes: git commit -m "Add awesome feature".
Push to the branch: git push origin feature/awesome-feature.
Open a pull request and let's make it happen!


📜 License
Licensed under the ISC License.


  🚀 Powering the future of ride-sharing with code! 🚗
