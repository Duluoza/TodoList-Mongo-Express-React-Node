const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/item');


const app = express();

app.use(cors());

const dbRoute = "mongodb://localhost:27017/Todo";
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/items', itemRoutes);

const API_PORT = 3001;

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));