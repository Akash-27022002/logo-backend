const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { validateEnv } = require("./utils/scripts/envSchema.js");

dotenv.config({ path: __dirname + "/../.env" });
const { error } = validateEnv(process.env);
if (error) {
  console.log(`Config validation error: ${error.message}`);
  process.exit(1);
}

const routes = require("./routes");
const { routeNotFound, errorHandler } = require("./middlewares");

const app = express();
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/", routes);
app.get('/', (req, res) => {
  return res.json("Hello")
})
app.use(routeNotFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
}

module.exports = app;
