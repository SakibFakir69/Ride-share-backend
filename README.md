 🚗 Dive into the RideShare Backend, a vibrant and powerful API driving a cutting-edge ride-sharing platform. Crafted with Node.js, Express, TypeScript, and MongoDB, this backend delivers secure, scalable, and colorful APIs for riders, drivers, and admins to power a seamless ride-sharing adventure.


# BackEnd Render Live Link : ` https://ride-share-backend-jmx6.onrender.com/`

🛣️ Rider API Endpoints
 
| Description              | Method | Endpoint                              |
| ------------------------ | ------ | ------------------------------------- |
| Request a ride           | POST   | `/api/ride-share/ride/request`        |
| Update ride status       | PATCH  | `/api/ride-share/ride/:rideId/status` |
| Get current user's rides | GET    | `/api/ride-share/ride/me`             |

🚕 Driver API Endpoints

| Description                                | Method | Endpoint                                |
| ------------------------------------------ | ------ | --------------------------------------- |
| Accept/reject ride requests                | PATCH  | `/api/ride-share/drivers/request`       |
| View earnings history                      | GET    | `/api/ride-share/drivers/earning`        |
| Update ride status (Picked Up → Completed) | PATCH  | `/api/ride-share/drivers/ride/status`   |
| Set availability status (Online/Offline)   | PATCH  | `/api/ride-share/drivers/online-status` |


🛡️ Admin API Endpoints


| Description             | Method | Endpoint                                    |
| ----------------------- | ------ | ------------------------------------------- |
| Get all drivers         | GET    | `/api/ride-share/admin/all-driver`          |
| Get all rides           | GET    | `/api/ride-share/admin/all-ride`            |
| Get all users           | GET    | `/api/ride-share/admin/all-users`           |
| Approve/suspend drivers | PATCH  | `/api/ride-share/admin/drivers/approve/:id` |
| Block / Unblock users   | PATCH  | `/api/ride-share/admin/block/:id`           |


📜 Script

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Start server with auto-restart |
| `npm run lint` | Run ESLint for code quality    |
| `npm test`     | Placeholder for tests (TBD)    |



🔐 Environment Variables
Create a .env file in your project root with the following content:


 PORT=5000
MONGO_URI=mongodb://localhost:27017/rideshare
JWT_SECRET=your_jwt_secret
