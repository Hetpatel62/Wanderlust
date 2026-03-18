require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;

/* =========================
   DATABASE CONNECTION
========================= */

async function main() {
  await mongoose.connect(dbUrl);
  console.log("connected to DB");

  // FIX 1: Clear old unencrypted sessions so connect-mongo doesn't crash
  try {
    await mongoose.connection.collection("sessions").deleteMany({});
    console.log("Old sessions cleared");
  } catch (e) {
    // sessions collection may not exist yet — fine
  }

  startServer();
}

main().catch((err) => console.log(err));

/* =========================
   EXPRESS CONFIG
========================= */

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   SESSION STORE
========================= */

function startServer() {

  const store = MongoStore.create({
    mongoUrl:dbUrl,
    touchAfter: 24 * 3600,
  });

  store.on("error", (err) => {
    console.log("SESSION STORE ERROR:", err);
  });

  const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // FIX 3: new Date()
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  };

  /* =========================
     MIDDLEWARE (order matters!)
  ========================= */

  app.use(session(sessionOptions));   // 1. session first
  app.use(flash());                   // 2. flash

  app.use(passport.initialize());     // 3. passport init
  app.use(passport.session());        // 4. passport session

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // 5. Global locals — AFTER passport so req.user is populated
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;  // now always defined in views
    next();
  });

  /* =========================
     TEST ROUTE
  ========================= */

  app.get("/fakeUser", async (req, res) => {
    let fakeUser = new User({
      email: "fake@gmail.com",
      username: "fakeUser",
    });
    const registeredUser = await User.register(fakeUser, "het");
    res.send(registeredUser);
  });

  /* =========================
     ROUTES
  ========================= */

  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewRouter);
  app.use("/", userRouter);

  /* =========================
     404 HANDLER
  ========================= */

  app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
  });

  /* =========================
     ERROR HANDLER
  ========================= */

  app.use((err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
      return next(err);
    }
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
  });

  /* =========================
     START SERVER
  ========================= */

  app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });
}