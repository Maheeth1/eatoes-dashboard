require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const menuRoutes = require('express').Router();
const menuController = require('./controllers/menuController');
menuRoutes.get('/', menuController.getMenu);
menuRoutes.post('/', menuController.createItem);
menuRoutes.delete('/:id', menuController.deleteItem);
menuRoutes.patch('/:id/availability', menuController.toggleAvailability);

const orderRoutes = require('express').Router();
const orderController = require('./controllers/orderController');
orderRoutes.get('/', orderController.getOrders);
orderRoutes.patch('/:id/status', orderController.updateStatus);
orderRoutes.get('/analytics', orderController.getTopSellers);

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log(err));