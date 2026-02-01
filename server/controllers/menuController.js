const MenuItem = require('../models/MenuItem');

// GET: All Items + Search
exports.getMenu = async (req, res) => {
  try {
    const { q, category } = req.query;
    let query = {};

    // Search Logic (Name or Ingredients)
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { ingredients: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All') {
      query.category = category;
    }

    const items = await MenuItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH: Optimistic UI Toggle
exports.toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    item.isAvailable = !item.isAvailable;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// CRUD Operations
exports.createItem = async (req, res) => {
  try {
    const newItem = await MenuItem.create(req.body);
    res.status(201).json(newItem);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};