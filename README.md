 🚗 Dive into the RideShare Backend, a vibrant and powerful API driving a cutting-edge ride-sharing platform. Crafted with Node.js, Express, TypeScript, and MongoDB, this backend delivers secure, scalable, and colorful APIs for riders, drivers, and admins to power a seamless ride-sharing adventure.



 
 # Rider Api Endpoint

Request a ride with pickup & destination location
  Post  http://localhost:5000/api/ride-share/ride/request
Patch  http://localhost:5000/api/ride-share/ride/688a2f009fe200d6c9e5b1ba/status
Get    http://localhost:5000/api/ride-share/ride/me


# Driver api EndPoint

Accept/reject ride requests
Patch http://localhost:5000/api/ride-share/drivers/request

View earnings history
GET  http://localhost:5000/api/ride-share/driver/earning


Update ride status (Picked Up → In Transit → Completed)
Patch   http://localhost:5000/api/ride-share/drivers/ride/status

Set availability status (Online/Offline)
Patch  http://localhost:5000/api/ride-share/drivers/online-status

#Admin Api Endpoint 


` All Driver ` 
" GET http://localhost:5000/api/ride-share/admin/all-driver"
` All Rides ` 
" GET http://localhost:5000/api/ride-share/admin/all-ride " 
' all User '
" GET http://localhost:5000/api/ride-share/admin/all-users " 
` Approve/suspend drivers `
" http://localhost:5000/api/ride-share/admin/drivers/approve/:id"

` Block / Unblock ` 
http://localhost:5000/api/ride-share/admin/block/:id



 

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




🔐 Environment Variables

Create a .env file with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/rideshare
JWT_SECRET=your_jwt_secret



