require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const recipeRouter = require("./routes/recipes");
const technoRouter = require("./routes/technologies");
const filterRouter = require("./routes/filter");

app.use(bodyParser.json());
app.use("/recipes", recipeRouter);
app.use("/technology", technoRouter);
app.use("/filter", filterRouter);

// handle bad routes
app.use((req, res) => {
  res.send("404 NOT FOUND");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
