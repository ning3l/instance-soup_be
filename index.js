require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const recipeRouter = require("./routes/recipes");
const technoRouter = require("./routes/technologies");
const filterRouter = require("./routes/filter");

app.use(bodyParser.json());
app.use("/recipes", recipeRouter);
app.use("/technologies", technoRouter);
app.use("/filter", filterRouter);

// send README on bad routes so user sees available endpoints
app.use((req, res) => {
  res.sendFile(__dirname + "/README.md");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
