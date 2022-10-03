const express = require("express");
const app = express();
const connectDB = require("./DB/connect");
const sectionRouter = require("./routes/sectionRoute");
const ideaRouter = require("./routes/ideaRoute");
const adminRouter = require("./routes/adminRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const path = require("path");

const {
  notFoundError,
  errorHandler,
} = require("./Middlewares/errorHandler.js");
const Admin = require("./models/AdminSchema");

//MiddleWares
app.use("/images", express.static(path.join(__dirname, "public/")));

app.use(cors());

// parse application/x-www-form-urlencoded

// parse application/json
app.use(bodyParser.json());

//Upload

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/");
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, request.body.name);
  },
});

var upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  console.log(req.body); // form fields
  console.log(req.file); // form files
  res.status(204).end();
});

//Routes

app.use("/api/section", sectionRouter);
app.use("/api/idea", ideaRouter);
app.use("/api/admin", adminRouter);

//Error MeddaleWares

app.use(notFoundError);
app.use(errorHandler);

const PORT = process.env.PORT;
const start = async () => {
  await connectDB;

  console.log("DATABASE CONNECTED");
  const server = app.listen(PORT || 5000, () => {
    console.log("Server is Running");
  });
};

start();
