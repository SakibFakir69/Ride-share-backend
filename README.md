🌍 RideSync Backend API
Embark on a journey with RideSync Backend, a state-of-the-art API fueling a next-gen ride-sharing platform. Built with Node.js, Express, TypeScript, and MongoDB, this backend delivers lightning-fast, secure, and user-friendly APIs for riders, drivers, and admins to create a smooth ride-sharing ecosystem.

  
  
  
  

🌐 API Overview
🚴 Rider Routes
Method	Endpoint	Description
POST	/api/ride-share/ride/request	Book a ride
PATCH	/api/ride-share/ride/:id/status	Update ride status
GET	/api/ride-share/ride/me	View ride history

🚖 Driver Routes
Method	Endpoint	Description
PATCH	/api/ride-share/drivers/request	Accept/Reject ride
PATCH	/api/ride-share/drivers/ride/status	Update ride phase
PATCH	/api/ride-share/drivers/online-status	Toggle online/offline
GET	/api/ride-share/driver/earning	View earnings

🧑‍💼 Admin Routes
Method	Endpoint	Description
GET	/api/ride-share/all-driver	List all drivers
GET	/api/ride-share/all-ride	List all rides
PATCH	/api/ride-share/approve/:id	Approve a driver
PATCH	/api/ride-share/account-status	Update account status

🧪 Scripts
Command	Description
npm run dev	Start server in dev mode
npm run lint	Run ESLint for code quality
npm test	(Coming soon) Test suite
