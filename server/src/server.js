require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");
require("./models");

const PORT = process.env.PORT || 5000;


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connected");

    await sequelize.sync({
      alter: true,
    });

    console.log("✓ Models synchronized");

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
}

startServer();