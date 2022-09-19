// Rendering with ejs (Embedded JavaScript Template)
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;

//set the ejs template by accessing the folder path and setting the view engine as ejs
app.set("views", path.join(__dirname, "html"));
app.set("view engine", "ejs");

//middleware
app.use(express.urlencoded({ extended: false })); //look for more than incoming requests
app.use(express.static(__dirname, +"public")); //allows express to use static files, including css, images, and other web medias

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const recommendedRestaurants = JSON.parse(fileData);
  recommendedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(recommendedRestaurants));
  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const recommendedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numbersOfRestaurants: recommendedRestaurants.length,
    restaurants: recommendedRestaurants,
  });
});

app.listen(PORT);
console.log("Server is open at localhost:" + PORT);

//rendering the website using nodejs and expressjs

// const path = require("path");
// const fs = require("fs");
// const express = require("express");
// const app = express();
// const PORT = 3000;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(__dirname, +"public"));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "html", "index.html"));
// });

// app.get("/about", function (req, res) {
//   res.sendFile(path.join(__dirname, "html", "about.html"));
// });

// app.get("/restaurants", function (req, res) {
//   res.sendFile(path.join(__dirname, "html", "restaurants.html"));
// });

// app.get("/confirm", function (req, res) {
//   res.sendFile(path.join(__dirname, "html", "confirm.html"));
// });

// app.get("/recommend", function (req, res) {
//   res.sendFile(path.join(__dirname, "html", "recommend.html"));
// });

// app.post("/recommend", function (req, res) {
//   const restaurants = req.body;
//   const filePath = path.join(__dirname, "data", "restaurants.json");
//   const fileData = fs.readFileSync(filePath);
//   const recommendedRestaurants = JSON.parse(fileData);
//   recommendedRestaurants.push(restaurants);

//   fs.writeFileSync(filePath, JSON.stringify(recommendedRestaurants));
//   res.redirect("/confirm");
// });

// app.listen(PORT);
// console.log("Server is open at localhost:" + PORT);
