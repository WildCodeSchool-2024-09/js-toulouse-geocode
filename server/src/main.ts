// Load environment variables from .env file
import "dotenv/config";

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
import "../database/checkConnection";

// Import the Express application from ./app
import app from "./app";

// Get the port from the environment variables
const port = process.env.APP_PORT;
const portWs = process.env.APP_PORT_WS;

// Start the server and listen on the specified port
app.app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });

app.appWs
  .listen(portWs, () => {
    console.info(`Websocket server is listening on port ${portWs}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
