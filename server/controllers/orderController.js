const Order = require('../models/Order');

// GET: Orders with Pagination & Stats
exports.getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'All' ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH: Update Status
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AGGREGATION: Top 5 Sellers (The Assessment Challenge)
exports.getTopSellers = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $unwind: "$items" },
      { $group: {
          _id: "$items.menuItem",
          name: { $first: "$items.name" },
          totalSold: { $sum: "$items.quantity" }
      }},
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};