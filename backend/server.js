const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/Database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.error("Shutting down the server due to uncaught exception");
  process.exit(1); // Exit the process after logging the error
});

dotenv.config({path:"./config/.env"});

connectDatabase();
// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: "backend/config/.env",
//   });mongodb+srv://mukulved07:<password>@cluster0.j8mwkbi.mongodb.net/ell6467kc61KafAb
// }

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Promise Rejection: ${err.message}`);
  console.error("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1); // Exit the process after the server has closed
  });
});
