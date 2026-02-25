import React from 'react';

export default function Dashboard() {
  // Mock data for dashboard
  const stats = [
    { label: 'Total Products', value: '24', change: '+12%' },
    { label: 'Monthly Orders', value: '156', change: '+23%' },
    { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2' },
    { label: 'Revenue', value: '₹2,45,670', change: '+18%' }
  ];

  const recentOrders = [
    { id: '#001', customer: 'Priya Sharma', amount: '₹1,497', status: 'Delivered' },
    { id: '#002', customer: 'Rajesh Kumar', amount: '₹2,998', status: 'Shipped' },
    { id: '#003', customer: 'Anita Patel', amount: '₹899', status: 'Processing' },
    { id: '#004', customer: 'Sanjay Gupta', amount: '₹1,796', status: 'Delivered' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-lotus-maroon mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-lotus-maroon mt-1">{stat.value}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-lotus-maroon">Recent Orders</h2>
                <button className="text-sm text-lotus-maroon hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-lotus-maroon">{order.amount}</div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-serif text-xl text-lotus-maroon mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border rounded-lg hover:bg-lotus-pink transition-colors">
                  ➕ Add New Product
                </button>
                <button className="w-full text-left p-3 border rounded-lg hover:bg-lotus-pink transition-colors">
                  📊 View Analytics
                </button>
                <button className="w-full text-left p-3 border rounded-lg hover:bg-lotus-pink transition-colors">
                  📦 Manage Inventory
                </button>
                <button className="w-full text-left p-3 border rounded-lg hover:bg-lotus-pink transition-colors">
                  👥 Customer Management
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-serif text-xl text-lotus-maroon mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Website</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Gateway</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Stable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-serif text-xl text-lotus-maroon mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-lotus-gold rounded-full flex items-center justify-center">
                <span className="text-sm">📦</span>
              </div>
              <div>
                <p className="text-sm font-medium">New order #005 placed</p>
                <p className="text-xs text-gray-600">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-lotus-gold rounded-full flex items-center justify-center">
                <span className="text-sm">⭐</span>
              </div>
              <div>
                <p className="text-sm font-medium">New product review received</p>
                <p className="text-xs text-gray-600">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-lotus-gold rounded-full flex items-center justify-center">
                <span className="text-sm">🔄</span>
              </div>
              <div>
                <p className="text-sm font-medium">Inventory updated for Honey Gold Makhana</p>
                <p className="text-xs text-gray-600">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}