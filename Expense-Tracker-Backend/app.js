const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const userroutes = require("./Routes/userRoutes");
const expenseroutes = require("./Routes/expenseRoutes");
const purchaseroute = require("./Routes/purchaseRoutes");
const premiumroute = require("./Routes/premiumRoutes");
const passwordroute = require("./Routes/passwordRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyparser.json({ extended: false }));
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/user", userroutes);
app.use("/expenses", expenseroutes);
app.use("/purchase", purchaseroute);
app.use("/premium", premiumroute);
app.use("/password", passwordroute);

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
        .then(() => {
            app.listen(8006);
            console.log("connected");
        })
        .catch((err) => console.log(err));
