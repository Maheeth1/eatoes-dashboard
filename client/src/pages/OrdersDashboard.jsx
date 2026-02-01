import { useEffect, useState } from 'react';
import API from '../api/axios';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders').then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, newStatus) => {
    const { data } = await API.patch(`/orders/${id}/status`, { status: newStatus });
    setOrders(orders.map(o => o._id === id ? data : o));
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Preparing: 'bg-blue-100 text-blue-800',
      Ready: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100';
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Incoming Orders</h2>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Order ID</th>
              <th className="p-4 font-semibold text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-gray-600">Items</th>
              <th className="p-4 font-semibold text-gray-600">Total</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{order._id.slice(-6)}</td>
                <td className="p-4">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-gray-500">Table {order.tableNumber}</div>
                </td>
                <td className="p-4">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="text-sm">
                      {i.quantity}x {i.name || 'Item'}
                    </div>
                  ))}
                </td>
                <td className="p-4 font-bold">${order.totalAmount}</td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-none focus:ring-0 cursor-pointer ${getStatusColor(order.status)}`}
                  >
                    {['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersDashboard;