import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Image,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Star
} from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - will be fetched from API
  const stats = [
    {
      label: 'Total Bookings',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Gallery Items',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: Image,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      label: 'Total Clients',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Avg. Rating',
      value: '4.9',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const recentBookings = [
    { id: 1, client: 'Sarah M.', service: 'Signature Glow Facial', date: 'Today, 2:00 PM', status: 'confirmed' },
    { id: 2, client: 'Jessica K.', service: 'Lash Lift & Tint', date: 'Tomorrow, 10:00 AM', status: 'confirmed' },
    { id: 3, client: 'Maria L.', service: 'Chemical Peel', date: 'Jan 31, 3:00 PM', status: 'pending' },
    { id: 4, client: 'Amanda R.', service: 'Signature Glow Facial', date: 'Feb 1, 11:00 AM', status: 'confirmed' },
  ];

  const popularServices = [
    { name: 'Signature Glow Facial', bookings: 45, percentage: 35 },
    { name: 'Lash Lift & Tint', bookings: 38, percentage: 30 },
    { name: 'Chemical Peel', bookings: 28, percentage: 22 },
    { name: 'Microdermabrasion', bookings: 17, percentage: 13 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your studio.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/bookings')}
          >
            View All Bookings
          </Button>
          <Button
            variant="gold"
            onClick={() => navigate('/gallery')}
          >
            Manage Gallery
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/bookings')}
              className="flex items-center gap-1"
            >
              View All
              <ArrowUpRight size={16} />
            </Button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-medium">
                    {booking.client.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{booking.client}</p>
                    <p className="text-sm text-gray-500">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>{booking.date}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Popular Services</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {popularServices.map((service, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{service.name}</span>
                  <span className="text-sm text-gray-500">{service.bookings} bookings</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
