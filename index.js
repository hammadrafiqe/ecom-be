const express = require("express");
const path = require("path");
const app = express();
const data = require("./data.json");
const cors = require("cors");

app.use(cors());

app.get("/product", (req, res) => {
  console.log("getting all products");
  const resData = {
    status: "success",
    message: "products fetched",
    data: Object.values(data),
  };
  res.status(200).json(resData);
});

app.get("/product/:id", (req, res) => {
  if (!req.params.id) {
    console.log("id not found in request");
    return res
      .status(400)
      .json({ status: "fail", message: "id not found", data: null });
  }
  if (!data[req.params.id]) {
    console.log("product not found with id", req.params.id);
    return res.status(400).json({
      status: "fail",
      message: "product not found with id " + req.params.id,
      data: null,
    });
  }
  console.log("product found with id", req.params.id);
  res.status(200).json({
    status: "success",
    message: "product found",
    data: data[req.params.id],
  });
});

app.use(express.static(path.join(__dirname + "/public")));

app.listen(process.env.PORT, () => {
  console.log("running in port", process.env.PORT);
});
