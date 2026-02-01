// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');

const sampleMenu = [
  { name: 'Spicy Chicken Wings', category: 'Appetizer', price: 12, ingredients: ['Chicken', 'Chili Sauce', 'Spices'], isAvailable: true },
  { name: 'Classic Burger', category: 'Main Course', price: 15, ingredients: ['Beef', 'Lettuce', 'Tomato', 'Bun'], isAvailable: true },
  { name: 'Truffle Pasta', category: 'Main Course', price: 22, ingredients: ['Pasta', 'Truffle Oil', 'Cream'], isAvailable: false },
  { name: 'Chocolate Lava Cake', category: 'Dessert', price: 9, ingredients: ['Chocolate', 'Flour', 'Sugar'], isAvailable: true },
  { name: 'Iced Lemon Tea', category: 'Beverage', price: 5, ingredients: ['Tea', 'Lemon', 'Ice'], isAvailable: true },
  // ... add 10 more variations for search testing
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Connected to DB');

    // Clear existing data
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log('🧹 Cleared old data');

    // Insert Menu
    const createdMenu = await MenuItem.insertMany(sampleMenu);
    console.log('✅ Menu Inserted');

    // Create Fake Orders (for Analytics)
    const orders = [
      {
        customerName: "John Doe",
        tableNumber: 5,
        totalAmount: 34,
        status: "Delivered",
        items: [
          { menuItem: createdMenu[0]._id, name: createdMenu[0].name, quantity: 2, price: 12 }, // 2 Wings
          { menuItem: createdMenu[4]._id, name: createdMenu[4].name, quantity: 2, price: 5 }  // 2 Teas
        ]
      },
      {
        customerName: "Jane Smith",
        tableNumber: 2,
        totalAmount: 15,
        status: "Pending",
        items: [
          { menuItem: createdMenu[1]._id, name: createdMenu[1].name, quantity: 1, price: 15 } // 1 Burger
        ]
      }
    ];

    await Order.insertMany(orders);
    console.log('✅ Orders Inserted');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();