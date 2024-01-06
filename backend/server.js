const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path=require('path');
const cors = require("cors");
const {
  errorResponserHandler,
  invalidPathHandler,
} = require("./middleware/errorHandler");

//server
// const server=require('./server');
const userRoutes = require("./routes/userRoutes");
const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
// const postCategoriesRoutes = require('./routes/postCategoriesRoutes');

dotenv.config();
// const config=require('./DB.js');
const app = express();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
//設定路由
const port = process.env.PORT || 4000;
// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000', // 前端服務的來源
    credentials: true  // 允許跨域 cookies
  };
  
  app.use(cors(corsOptions));
// const allowedOrigins = ['http://localhost:3000', 'http://example.com'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
//static file//要讓前端可以吃到後端資料
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(invalidPathHandler);
app.use(errorResponserHandler);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
