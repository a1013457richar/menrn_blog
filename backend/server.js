// const express = require("express");
// const fs = require('fs');
// const dotenv = require("dotenv");
// dotenv.config();
// const PORT = process.env.PORT || 4000;
// const https = require('https');

// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const cors = require("cors");
// const helmet = require('helmet');
// const passport = require('passport');
// const { Strategy } = require('passport-google-oauth20');
// const cookieSession = require('cookie-session');
// const { verify } = require('crypto');
// require('dotenv').config();
// const { errorResponserHandler, invalidPathHandler } = require('./middleware/errorHandler');

// // const PORT = 3000;
// const config = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
//   COOKIE_KEY_1: process.env.COOKIE_KEY_1,
//   COOKIE_KEY_2: process.env.COOKIE_KEY_2,
// };

// const AUTH_OPTIONS = {
//   callbackURL: "http://localhost:3000/auth/google/callback",
//   clientID: config.CLIENT_ID,
//   clientSecret: config.CLIENT_SECRET,
// };

// function verifyCallback(accessToken, refreshToken, profile, done) {
//   console.log('Google profile', profile);
//   done(null, profile);

// }

// passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// // Save the session to the cookie
// passport.serializeUser((user, done) => {
//   done(null, user.id);
//   console.log('Serializing user:', user);
// });

// // Read the session from the cookie
// passport.deserializeUser((id, done) => {
//   // User.findById(id).then(user => {
//   //   done(null, user);
//   // });
//   done(null, id);
//   console.log('Deserializing user id:', id);
// });

// const app = express();

// app.use(helmet());

// app.use(cookieSession({
//   name: 'session',
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
// }));
// app.use((req, res, next) => {
//   // Stub out missing regenerate and save functions.
//   // These don't make sense for client side sessions.
//   if (req.session && !req.session.regenerate) {
//     req.session.regenerate = (cb) => {
//       cb();
//     };
//   }
//   err => {
//     console.log(err);
//   }
//   if (req.session && !req.session.save) {
//     req.session.save = (cb) => {
//       cb();
//     };
//   }
//   next();
// });

// app.use(passport.initialize());
// app.use(passport.session());

// function checkLoggedIn(req, res, next) {
//   console.log('Current user is:', req.user);
//   const isLoggedIn = req.isAuthenticated() && req.user;
//   if (!isLoggedIn) {
//     return res.status(401).json({
//       error: 'You must log in!',
//     });
//   }
//   next();
// }

// app.get('/auth/google',
//   passport.authenticate('google', {
//     scope: ['email', 'profile']
//   }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect: '/',
//     session: true,
//   }),
//   (req, res) => {
//     console.log('Google called us back!');
//   }
// );

// app.get('/auth/logout', (req, res, next) => {
//   //Removes req.user and clears any logged in session
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

// app.get('/secret', checkLoggedIn, (req, res) => {
//   return res.send('Your personal secret value is 42!');
// });

// app.get('/failure', (req, res) => {
//   return res.send('Failed to log in!');
// });

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });



// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// // const commentRoutes = require('./routes/commentRoutes');
// // const postCategoriesRoutes = require('./routes/postCategoriesRoutes');


// connectDB();
// // app.use(cookieSession({
// //   name: "session",
// //   keys: [process.env.COOKIE_KEY],
// //   maxAge: 24 * 60 * 60 * 1000,
// // }));

// // app.use(passport.initialize()); //初始化passport
// // app.use(passport.session()); //使用passport session
// //auth the user





// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
// //設定路由
// const port = process.env.PORT || 4000;
// // app.use(cors());

// app.use(cors(corsOptions));
// // app.use("/auth", authRoutes);


// app.use(express.static(path.join("public")));
// app.use("/api/users", userRoutes);




// app.use(invalidPathHandler);
// app.use(errorResponserHandler);



// https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
// }, app).listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });

const express = require("express")
const mongoose = require('mongoose')
const connectDB = require("./config/db");
const cors = require('cors')
const path = require("path");

const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const postCategoriesRoutes = require("./routes/postCategoriesRoutes")
const commentRoutes = require('./routes/commentRoutes');

const app = express()
connectDB()
app.use((req, res, next) => {
  // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  // next();
  res.header('Access-Control-Expose-Headers', 'x-totalpagecount');
  next();
});

// app.use(cors())
const corsOptions = {
  origin: "http://localhost:3000", // 前端服務的來源
  method: ["GET", "POST", "PUT", "DELETE"], // 允許的 http request
  credentials: true, // 允許跨域 cookies
};

app.use(cors(corsOptions));

app.use(express.json())
// app.use(express.json());
app.use(express.static(path.join("public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/post-categories", postCategoriesRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});


const PORT = process.env.PORT || 4000;
// const mongoose = require("mongoose");



app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`);
})

// mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true})
// .then(()=> 