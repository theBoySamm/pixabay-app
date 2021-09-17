const express = require("express");
const app = express();
require("dotenv").config();
const fetch = require("node-fetch");
// const Router = express.Router()

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

let key = process.env.API_KEY;
let api = `https://pixabay.com/api/?key=${key}`;

app.get("/", async function (req, res) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const { hits } = data;
    res.render("index", { hits: hits });
  } catch (error) {
    console.log(error);
  }
});

app.get("/search", async function (req, res) {
  try {
    const searchBar = req.query.searchText;
    const response = await fetch(
      `${api}&q=${searchBar}&image_type="illustration"&colors="grayscale"`
    );
    const data = await response.json();

    const { hits } = data;
    res.render("search", { hits: hits });
  } catch (error) {
    console.log(error);
  }
});

app.get("/search/:id", async (req, res) => {});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port " + port);
});
