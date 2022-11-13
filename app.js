const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { reset } = require("nodemon");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/product.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// product api
app.use("/api/v1/product", productRoute);

// brand api
app.use("/api/v1/brand", brandRoute);

module.exports = app;
