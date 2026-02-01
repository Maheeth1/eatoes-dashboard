import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import OrdersDashboard from './pages/OrdersDashboard';
import MenuManagement from './pages/MenuManagement';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<OrdersDashboard />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;