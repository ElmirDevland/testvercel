const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://elmirdevland:r1n6YyvHEMCqP0kg@cluster0.sgqlwbw.mongodb.net/DrinksLogger?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const drinkSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

app.get('/', function (req, res) {
  res.send('Hello World');

});

app.get('/drinks', function (req, res) {
  const drinks = await Drink.find(query);
  res.status(200).json(drinks);
});

app.listen(3000);
