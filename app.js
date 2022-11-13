const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { reset } = require("nodemon");


// middlewares
app.use(cors());
app.use(express.json());

// routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// product api
app.use("/api/v1/product", productRoute);

// brand api
app.use("/api/v1/brand", brandRoute);

module.exports = app;
