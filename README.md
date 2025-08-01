🌍 RideSync Backend API
Embark on a journey with RideSync Backend, a state-of-the-art API fueling a next-gen ride-sharing platform. Built with Node.js, Express, TypeScript, and MongoDB, this backend delivers lightning-fast, secure, and user-friendly APIs for riders, drivers, and admins to create a smooth ride-sharing ecosystem.

  
  
  
  



🚀 Navigation Hub

✨ Highlights
🔧 Tech Stack
🛠️ Setup Guide
▶️ Launching RideSync
🌐 API Routes
🚴 Rider Routes
🚖 Driver Routes
🧑‍💼 Admin Routes


📜 Commands
🔒 Environment Setup
🤝 Join the Ride
📄 License


✨ Highlights
🚴 Rider Experience

Ride Requests: Book rides with pinpoint pickup and destination locations.
Journey Log: Access a sleek history of all your rides.
Live Updates: Stay in sync with real-time ride status changes.

🚖 Driver Dashboard

Request Control: Accept or decline ride requests in a snap.
Earnings Insights: Dive into a clear view of your earnings history.
Ride Flow: Seamlessly update ride stages (Picked Up → In Transit → Completed).
Availability Switch: Go online or offline with a single toggle.

🧑‍💼 Admin Command Center

Driver Oversight: Review and approve driver profiles.
Ride Monitoring: Keep tabs on every ride across the platform.
Account Management: Fine-tune user account statuses for security.


🔧 Tech Stack



Category
Tools



Engine
Node.js


Framework
Express


Codebase
TypeScript


Storage
MongoDB, Mongoose


Security
JWT, bcrypt


Validation
Joi, Zod


Protection
Helmet, CORS


Monitoring
Morgan


Tools
ESLint, ts-node-dev, TypeScript



🛠️ Setup Guide

Grab the Code:
git clone https://github.com/your-username/ridesync-backend.git
cd ridesync-backend


Install Packages:
npm install


Set Up Config:Create a .env file in the root (see Environment Setup).



▶️ Launching RideSync

Dev Mode (with live reload):
npm run dev


Code Check:
npm run lint



The API will be live at http://localhost:5000 by default.

🌐 API Routes
🚴 Rider Routes



Method
Path
Purpose
Payload/Params



POST
/api/ride-share/ride/request
Book a new ride
{ pickupLocation, destinationLocation }


PATCH
/api/ride-share/ride/:id/status
Update ride status
id (param)


GET
/api/ride-share/ride/me
View ride history
-


Example: PATCH /api/ride-share/ride/688a2f009fe200d6c9e5b1ba/status
🚖 Driver Routes



Method
Path
Purpose
Payload/Params



PATCH
/api/ride-share/drivers/request
Accept/Reject ride requests
-


GET
/api/ride-share/driver/earning
View earnings history
-


PATCH
/api/ride-share/drivers/ride/status
Update ride status
-


PATCH
/api/ride-share/drivers/online-status
Toggle online/offline
-


🧑‍💼 Admin Routes



Method
Path
Purpose
Payload/Params



GET
/api/ride-share/all-driver
List all drivers
-


GET
/api/ride-share/all-ride
List all rides
-


PATCH
/api/ride-share/approve/:id
Approve driver account
id (param)


PATCH
/api/ride-share/account-status
Update account status
-



📜 Commands



Command
Action



npm run dev
Start server with live reload


npm run lint
Enforce code quality with ESLint


npm test
Test suite placeholder (TBD)



🔒 Environment Setup
Create a .env file with:
PORT=5000
MONGO_URI=mongodb://localhost:27017/ridesync
JWT_SECRET=your_jwt_secret


🤝 Join the Ride

Fork the repository.
Create a feature branch: git checkout -b feature/your-epic-feature.
Commit your work: git commit -m "Add epic feature".
Push to the branch: git push origin feature/your-epic-feature.
Open a pull request and let’s build together!


📄 License
This project cruises under the ISC License.


  🌟 RideSync: Connecting journeys with cutting-edge code! 🚀
