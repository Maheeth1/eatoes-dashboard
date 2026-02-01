import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Trash2, Plus } from 'lucide-react';

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500); // 500ms delay

  // Fetch Items when search changes
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await API.get(`/menu?q=${debouncedSearch}`);
        setItems(data);
      } catch (err) { console.error(err); }
    };
    fetchMenu();
  }, [debouncedSearch]);

  // OPTIMISTIC UI TOGGLE
  const toggleAvailability = async (id, currentStatus) => {
    // 1. Update UI Immediately
    const originalItems = [...items];
    setItems(items.map(item => 
      item._id === id ? { ...item, isAvailable: !currentStatus } : item
    ));

    try {
      // 2. Make API Call
      await API.patch(`/menu/${id}/availability`);
    } catch (err) {
      // 3. Revert if failed
      setItems(originalItems);
      alert("Failed to update status");
    }
  };

  const deleteItem = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    await API.delete(`/menu/${id}`);
    setItems(items.filter(i => i._id !== id));
  }

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Menu Items</h2>
        <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search by name or ingredient..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
              </div>
              <span className="font-bold text-orange-600">${item.price}</span>
            </div>
            
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
            
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              {/* Toggle Switch */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={item.isAvailable} 
                    onChange={() => toggleAvailability(item._id, item.isAvailable)}
                  />
                  <div className={`block w-10 h-6 rounded-full ${item.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${item.isAvailable ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {item.isAvailable ? 'Available' : 'Sold Out'}
                </span>
              </label>

              <button onClick={() => deleteItem(item._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;