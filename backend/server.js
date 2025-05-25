import http from "http";
import { connectDB } from "./src/config/mongodb.js";
import application from "./app.js";

const PORT = process.env.PORT || 3000; const server = http.createServer(application); 

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port localhost:${PORT}!!`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });
