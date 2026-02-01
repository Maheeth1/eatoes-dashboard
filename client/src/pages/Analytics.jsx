import { useEffect, useState } from 'react';
import API from '../api/axios';
import { TrendingUp, Award } from 'lucide-react';

const Analytics = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    // This matches the route defined in server.js (/api/orders/analytics)
    API.get('/orders/analytics')
       .then(res => setTopItems(res.data))
       .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <TrendingUp className="text-orange-600" /> Performance Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Sellers Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="text-yellow-500" /> Top 5 Best Sellers
          </h3>
          
          <div className="space-y-4">
            {topItems.length === 0 ? (
              <p className="text-gray-400">No sales data available yet.</p>
            ) : (
              topItems.map((item, index) => (
                <div key={item._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.totalSold} sold</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;