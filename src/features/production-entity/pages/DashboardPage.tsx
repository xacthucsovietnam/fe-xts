// src/features/production-entity/pages/DashboardPage.tsx
import React from 'react';
import {
  Activity,
  HardDrive,
  Package,
  Tag,
  Users,
  TrendingUp,
  Crown,
  BarChart3,
  PieChart
} from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho dashboardData
interface DashboardData {
  activations: { total: number; used: number; remaining: number; };
  storage: { total: number; used: number; remaining: number; }; // GB
  products: { total: number; active: number; locked: number; };
  stamps: {
    totalPrintable: number;
    printed: number;
    white: number;
    activated: number;
    sold: number;
    cancelled: number;
  };
  users: { total: number; linked: number; invited: number; canInvite: number; };
}

// Dữ liệu mẫu cho dashboard
const dashboardData: DashboardData = {
  activations: { total: 10000, used: 7500, remaining: 2500 },
  storage: { total: 100, used: 65, remaining: 35 }, // GB
  products: { total: 150, active: 120, locked: 30 },
  stamps: {
    totalPrintable: 5000,
    printed: 3200,
    white: 800,
    activated: 2400,
    sold: 2000,
    cancelled: 200
  },
  users: { total: 500, linked: 350, invited: 100, canInvite: 50 }
};

// Định nghĩa kiểu dữ liệu cho màu sắc của StatsCard
type StatsCardColor = "blue" | "green" | "purple" | "orange" | "pink";

// Định nghĩa kiểu dữ liệu cho props của StatsCard
interface StatsCardProps {
  title: string;
  icon: React.ElementType; // Sử dụng React.ElementType cho các icon từ lucide-react
  data: { [key: string]: number | string }; // Dữ liệu có thể chứa các giá trị số hoặc chuỗi
  color?: StatsCardColor;
}

// Component Card thống kê
const StatsCard: React.FC<StatsCardProps> = ({ title, icon: Icon, data, color = "blue" }) => {
  const colorClasses: Record<StatsCardColor, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    pink: "bg-pink-50 text-pink-600 border-pink-200"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 capitalize">
              {key === 'total' ? 'Tổng' :
                key === 'used' ? 'Đã dùng' :
                key === 'remaining' ? 'Còn lại' :
                key === 'active' ? 'Hoạt động' :
                key === 'locked' ? 'Khóa' :
                key === 'totalPrintable' ? 'Tổng có thể in' :
                key === 'printed' ? 'Đã in' :
                key === 'white' ? 'Tem trắng' :
                key === 'activated' ? 'Đã kích hoạt' :
                key === 'sold' ? 'Đã bán' :
                key === 'cancelled' ? 'Đã hủy' :
                key === 'linked' ? 'Đã liên kết' :
                key === 'invited' ? 'Đã mời' :
                key === 'canInvite' ? 'Có thể mời' : key}
            </span>
            <span className="font-semibold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
              {title === 'Dung lượng' && (key === 'total' || key === 'used' || key === 'remaining') ? ' GB' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component Biểu đồ đơn giản
const SimpleChart: React.FC = () => {
  const chartData = [
    { label: 'Lượt kích hoạt', value: 75, color: 'bg-blue-500' },
    { label: 'Dung lượng', value: 65, color: 'bg-green-500' },
    { label: 'Sản phẩm hoạt động', value: 80, color: 'bg-purple-500' },
    { label: 'Tem đã bán', value: 40, color: 'bg-orange-500' },
    { label: 'Người dùng liên kết', value: 70, color: 'bg-pink-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Biểu Đồ Tổng Quan</h3>
        <BarChart3 className="text-gray-500" size={24} />
      </div>
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm text-gray-500">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component Biểu đồ tròn đơn giản
const DonutChart: React.FC = () => {
  const data = [
    { label: 'Tem đã bán', value: 40, color: '#3B82F6' },
    { label: 'Tem đã kích hoạt', value: 48, color: '#10B981' },
    { label: 'Tem trắng', value: 16, color: '#F59E0B' },
    { label: 'Tem đã hủy', value: 4, color: '#EF4444' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Phân Bố Tem</h3>
        <PieChart className="text-gray-500" size={24} />
      </div>

      {/* Biểu đồ tròn CSS */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            {data.map((item, index) => {
              const offset = data.slice(0, index).reduce((sum, d) => sum + d.value, 0);
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((offset / 100) * circumference);

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * ProductionEntityDashboardPage Component
 *
 * This component displays the dashboard for the "Chủ thể sản xuất" role.
 * It includes various statistics cards, simple charts, and quick action buttons
 * to provide an overview of the production entity's data.
 */
const ProductionEntityDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      {/* Header section for the dashboard content */}
      <div className="bg-white shadow-sm border-b border-gray-200 rounded-xl mb-6">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">👋 Xin chào Nguyễn Văn A!</h1>
                <p className="text-gray-600">Chào mừng bạn trở lại với dashboard quản lý</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
              <Crown size={20} />
              <span>Nâng cấp gói</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Lượt kích hoạt"
            icon={Activity}
            data={dashboardData.activations}
            color="blue"
          />
          <StatsCard
            title="Dung lượng"
            icon={HardDrive}
            data={dashboardData.storage}
            color="green"
          />
          <StatsCard
            title="Sản phẩm"
            icon={Package}
            data={dashboardData.products}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StatsCard
            title="Tem"
            icon={Tag}
            data={dashboardData.stamps}
            color="orange"
          />
          <StatsCard
            title="Người dùng"
            icon={Users}
            data={dashboardData.users}
            color="pink"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimpleChart />
          <DonutChart />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200">
              <Activity className="mx-auto mb-2 text-blue-600" size={24} />
              <span className="text-sm font-medium text-gray-700">Kích hoạt tem</span>
            </button>
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors duration-200">
              <Package className="mx-auto mb-2 text-green-600" size={24} />
              <span className="text-sm font-medium text-gray-700">Thêm sản phẩm</span>
            </button>
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200">
              <Users className="mx-auto mb-2 text-purple-600" size={24} />
              <span className="text-sm font-medium text-gray-700">Mời người dùng</span>
            </button>
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200">
              <Tag className="mx-auto mb-2 text-orange-600" size={24} />
              <span className="text-sm font-medium text-gray-700">In tem</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductionEntityDashboardPage;
