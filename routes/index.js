const router = require("express").Router();
const userRouter = require("./user");
const publicRouter = require("./public");
const authRouter = require("./auth");
const logoRouter = require("./business");
const adminRouter = require("./admin");
const cors = require("cors");

const privateRouteCORS = {
  origin: (origin, callback) => {
    if (origin === process.env.CLIENT_URL || origin == "https://logo-frontend.vercel.app" || !origin) {
      console.log("origin ===>", origin);
      callback(null, true);
    } else {
      console.log("origin ===>", origin, process.env.CLIENT_URL);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

router.use("/auth", cors(privateRouteCORS), authRouter);
router.use("/user", cors(privateRouteCORS), userRouter);
router.use("/admin", cors(privateRouteCORS), adminRouter);
router.use("/public", cors(privateRouteCORS), publicRouter);
router.use("/business", logoRouter);
router.use("/admin", cors(privateRouteCORS), adminRouter);

module.exports = router;
