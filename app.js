require("dotenv").config();
const express = require("express");
const cors = require("cors");

const posts = require('./controllers/post')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");


app.use(cors());
//database images
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))
// Conecction Database
const PORT = process.env.PORT || 8081
mongoose.connect(
  process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("conectado ao banco")
})
//Middlewares
app.use(bodyParser.json());
app.use(express.json());
//Routes
app.use('/posts', posts);


app.listen(PORT, () => console.log(`server rodando ${PORT}`))