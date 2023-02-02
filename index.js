require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes/routes")

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

// MongoDB connection
const mongoose = require('mongoose');
const mongoURL = process.env.DB_CONN;
mongoose.set('strictQuery', true);
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});