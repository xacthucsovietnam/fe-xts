// src/features/production-entity/pages/CurrentServicesPage.tsx
import React, { useState } from 'react';
import {
  Info, // Icon for 'Thông tin dịch vụ'
  History, // Icon for 'Lịch sử mua'
  Edit, // Icon for 'Gia hạn'
  ShoppingCart, // Icon for 'Mua bổ sung'
  CheckCircle, // Icon for 'Đã duyệt'
  AlertCircle, // Icon for 'Chưa thanh toán'
  Eye, // Icon for 'Hành động'
  Activity,
  HardDrive,
  Package,
  Tag,
  Users,
} from 'lucide-react';

/**
 * CurrentServicesPage Component
 *
 * This page displays the current services information and purchase history for a production entity.
 * It features a tabbed interface for easy navigation between service details and transaction history.
 * Designed with Tailwind CSS for a clean and responsive look.
 */
const CurrentServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');

  // Mock data for Service Information tab
  const serviceInfo = {
    startDate: '01/07/2024',
    endDate: '01/07/2025',
    warning: 'Dịch vụ sắp hết hạn (01/07/2025). Vui lòng gia hạn để tránh chuyển về gói miễn phí.',
    currentStats: {
      enterpriseCode: { current: 1, total: 1 },
      productTraditionCode: { current: 10, total: 20 },
      identificationCode: { current: 20000, total: 100000 },
      storageMB: { current: 70, total: 100 },
      activations: { current: 10000, total: 25000 },
    },
    activeServices: [
      { stt: 1, packageName: 'Gói Premium', packageType: 'Gói chính', params: 'Tất cả', quantity: 1, price: '2,500,000 VNĐ', startDate: '01/07/2024' },
      { stt: 2, packageName: 'Gói Standard', packageType: 'Gói bổ sung', params: 'Mã truyển thống', quantity: 10, price: '1,800,000 VNĐ', startDate: '15/06/2024' },
      { stt: 3, packageName: 'Gói Basic', packageType: 'Gói bổ sung', params: 'Lượt kích hoạt', quantity: 10000, price: '1,200,000 VNĐ', startDate: '01/03/2024' },
    ],
  };

  // Mock data for Purchase History tab
  const purchaseHistory = [
    { stt: 1, orderCode: 'ORD-2024-001', purchaseDate: '10/12/2024', activationDate: '15/12/2024', totalAmount: '2,500,000 VNĐ', status: 'Đã duyệt' },
    { stt: 2, orderCode: 'ORD-2024-002', purchaseDate: '08/12/2024', activationDate: '-', totalAmount: '1,800,000 VNĐ', status: 'Chưa thanh toán' },
    { stt: 3, orderCode: 'ORD-2024-003', purchaseDate: '01/12/2024', activationDate: '05/12/2024', totalAmount: '1,200,000 VNĐ', status: 'Đã duyệt' },
    { stt: 4, orderCode: 'ORD-2024-004', purchaseDate: '25/11/2024', activationDate: '28/11/2024', totalAmount: '2,500,000 VNĐ', status: 'Đã duyệt' },
    { stt: 5, orderCode: 'ORD-2024-005', purchaseDate: '10/11/2024', activationDate: '15/11/2024', totalAmount: '1,800,000 VNĐ', status: 'Đã duyệt' },
  ];

  // Helper component for progress bars
  const ProgressBar: React.FC<{ current: number; total: number; color: string }> = ({ current, total, color }) => {
    const percentage = (current / total) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)]">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin dịch vụ hiện tại</h2>
      <p className="text-sm text-gray-600 mb-6">Dịch vụ / Thông tin dịch vụ hiện tại</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 text-sm font-medium flex items-center space-x-2 ${
            activeTab === 'info'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <Info size={18} />
          <span>Thông tin dịch vụ</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm font-medium flex items-center space-x-2 ${
            activeTab === 'history'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <History size={18} />
          <span>Lịch sử mua</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="space-y-8">
          {/* Service Statistics */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Thông số dịch vụ</h3>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm">
                <Edit size={16} className="mr-2" /> Gia hạn
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Ngày bắt đầu:</span>
                <span className="font-medium text-gray-800">{serviceInfo.startDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Ngày hết hạn:</span>
                <span className="font-medium text-gray-800">{serviceInfo.endDate}</span>
              </div>
            </div>
            {serviceInfo.warning && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center text-sm">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>{serviceInfo.warning}</span>
              </div>
            )}
          </div>

          {/* Current Usage Stats */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh sách các thông số đang sử dụng</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Mã doanh nghiệp</span>
                  <Activity size={20} className="text-blue-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{serviceInfo.currentStats.enterpriseCode.current}/{serviceInfo.currentStats.enterpriseCode.total}</p>
                <ProgressBar
                  current={serviceInfo.currentStats.enterpriseCode.current}
                  total={serviceInfo.currentStats.enterpriseCode.total}
                  color="bg-green-500"
                />
              </div>
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Mã truyền thống sản phẩm</span>
                  <Package size={20} className="text-purple-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{serviceInfo.currentStats.productTraditionCode.current}/{serviceInfo.currentStats.productTraditionCode.total}</p>
                <ProgressBar
                  current={serviceInfo.currentStats.productTraditionCode.current}
                  total={serviceInfo.currentStats.productTraditionCode.total}
                  color="bg-blue-500"
                />
              </div>
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Mã định danh</span>
                  <Tag size={20} className="text-orange-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{serviceInfo.currentStats.identificationCode.current.toLocaleString()}/{serviceInfo.currentStats.identificationCode.total.toLocaleString()}</p>
                <ProgressBar
                  current={serviceInfo.currentStats.identificationCode.current}
                  total={serviceInfo.currentStats.identificationCode.total}
                  color="bg-red-500"
                />
              </div>
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Dung lượng (MB)</span>
                  <HardDrive size={20} className="text-green-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{serviceInfo.currentStats.storageMB.current}/{serviceInfo.currentStats.storageMB.total}</p>
                <ProgressBar
                  current={serviceInfo.currentStats.storageMB.current}
                  total={serviceInfo.currentStats.storageMB.total}
                  color="bg-yellow-500"
                />
              </div>
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Lượt kích hoạt</span>
                  <Users size={20} className="text-pink-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{serviceInfo.currentStats.activations.current.toLocaleString()}/{serviceInfo.currentStats.activations.total.toLocaleString()}</p>
                <ProgressBar
                  current={serviceInfo.currentStats.activations.current}
                  total={serviceInfo.currentStats.activations.total}
                  color="bg-purple-500"
                />
              </div>
            </div>
          </div>

          {/* List of Active Services */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Danh sách các gói dịch vụ đang sử dụng</h3>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-sm">
                <ShoppingCart size={16} className="mr-2" /> Mua bổ sung
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên gói</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại gói</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tham số</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá tiền</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày bắt đầu</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {serviceInfo.activeServices.map((service) => (
                    <tr key={service.stt}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.stt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{service.packageName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{service.packageType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{service.params}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{service.quantity.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{service.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{service.startDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lịch sử mua</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày mua</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày kích hoạt</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseHistory.map((item) => (
                    <tr key={item.stt}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.stt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{item.orderCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.purchaseDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.activationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.totalAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.status === 'Đã duyệt' ? (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle size={14} className="mr-1" /> Đã duyệt
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle size={14} className="mr-1" /> Chưa thanh toán
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentServicesPage;
