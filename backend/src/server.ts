
import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
dotenv.config()
let server: Server
async function main(){
    try {
        mongoose.connect(process.env.MONGODB_URI as string)
        server = app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
main();
process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  console.error('🔥 Unhandled Rejection:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err); // <-- this logs the error!
});
