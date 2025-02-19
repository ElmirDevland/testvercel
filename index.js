const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

mongoose
  .connect(
    'mongodb+srv://elmirdevland:r1n6YyvHEMCqP0kg@cluster0.sgqlwbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const drinksDb = mongoose.connection.useDb('DrinksLogger');

const drinkSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

const Drink = drinksDb.model('Drink', drinkSchema);

app.get('/drinks', async function (req, res) {
  const drinks = await Drink.find();
  res.status(200).json(drinks);
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
