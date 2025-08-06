// src/features/production-entity/pages/CurrentServicesPage.tsx
import React, { useState, useRef } from 'react';
import {
  Edit, // Icon for 'Gia hạn'
  ShoppingCart, // Icon for 'Mua bổ sung'
  CheckCircle, // Icon for 'Đã duyệt'
  AlertCircle, // Icon for 'Chưa thanh toán'
  Activity,
  HardDrive,
  Package,
  Tag,
  Users,
} from 'lucide-react';

// Import the new modal components
import RenewServiceModal from '../components/RenewServiceModal';
import ConfirmOrderModal from '../components/ConfirmOrderModal';
import PaymentModal from '../components/PaymentModal';
import PurchaseAddonModal from '../components/PurchaseAddonModal'; // Import the new modal

/**
 * CurrentServicesPage Component
 *
 * This page displays the current services information and allows for renewal and additional purchases.
 * It features a single view for service details and integrates modals for renewal and payment processes.
 * Designed with Tailwind CSS for a clean and responsive look.
 */
const CurrentServicesPage: React.FC = () => {
  // State for modal visibility
  const [showRenewServiceModal, setShowRenewServiceModal] = useState(false);
  const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPurchaseAddonModal, setShowPurchaseAddonModal] = useState(false); // New state for addon modal

  // State to pass data to payment modal
  const [currentOrderCode, setCurrentOrderCode] = useState('');
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);

  // State for toast notification
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);

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
      { stt: 1, packageName: 'Gói truyền thông', packageType: 'Gói chính' as 'Gói chính' | 'Gói bổ sung', params: 'Mã truyền thông', quantity: 10, price: '2,000,000 VNĐ', startDate: '01/07/2024' },
      { stt: 2, packageName: '10,000 mã biến đổi', packageType: 'Gói bổ sung' as 'Gói chính' | 'Gói bổ sung', params: 'Mã biến đổi', quantity: 10000, price: '2,000,000 VNĐ', startDate: '15/07/2024' },
      { stt: 3, packageName: '10,000 lượt kích hoạt', packageType: 'Gói bổ sung' as 'Gói chính' | 'Gói bổ sung', params: 'Lượt kích hoạt', quantity: 10000, price: '3,000,000 VNĐ', startDate: '15/07/2024' },
    ],
  };

  // Helper component for progress bars
  const ProgressBar: React.FC<{ current: number; total: number; color: string }> = ({ current, total, color }) => {
    const percentage = (current / total) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  // Toast notification handler
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000); // Hide after 3 seconds
  };

  // Handlers for modals
  const handleRenewClick = () => {
    setShowRenewServiceModal(true);
  };

  const handleConfirmRenew = (renewedServices: any[], newStartDate: string, newEndDate: string) => {
    console.log('Services to renew:', renewedServices);
    console.log('New Start Date:', newStartDate);
    console.log('New End Date:', newEndDate);

    // Calculate total amount for the order
    const total = renewedServices.reduce((sum, service) => sum + service.price, 0);
    setCurrentTotalAmount(total);

    // Generate a mock order code
    const mockOrderCode = `ORD-${Date.now().toString().slice(-6)}`;
    setCurrentOrderCode(mockOrderCode);

    setShowRenewServiceModal(false); // Close renew modal
    setShowConfirmOrderModal(true); // Open confirm order modal
  };

  const handlePurchaseAddonClick = () => {
    setShowPurchaseAddonModal(true);
  };

  const handleConfirmPurchaseAddon = (selectedPackages: any[]) => {
    console.log('Packages to purchase as addon:', selectedPackages);

    // Calculate total amount for the addon purchase order
    const total = selectedPackages.reduce((sum, service) => sum + service.price, 0);
    setCurrentTotalAmount(total);

    // Generate a mock order code for addon
    const mockOrderCode = `ADDON-ORD-${Date.now().toString().slice(-6)}`;
    setCurrentOrderCode(mockOrderCode);

    setShowPurchaseAddonModal(false); // Close addon modal
    setShowConfirmOrderModal(true); // Open confirm order modal
  };

  const handleConfirmAndPay = () => {
    setShowConfirmOrderModal(false); // Close confirm order modal
    setShowPaymentModal(true); // Open payment modal
  };

  const handlePaymentSuccess = () => {
    showToastNotification('Tạo đơn và thanh toán thành công!');
    // Logic to update service info after successful payment (e.g., refetch data)
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)]">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin dịch vụ hiện tại</h2>
      {/* Removed breadcrumb as per previous instructions if any, or keep if not specified */}
      <p className="text-sm text-gray-600 mb-6">Dịch vụ / Thông tin dịch vụ hiện tại</p>

      {/* Service Statistics */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Thông số dịch vụ</h3>
          <button
            onClick={handleRenewClick}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm cursor-pointer"
          >
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
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
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
          <button
            onClick={handlePurchaseAddonClick} // Changed onClick to open PurchaseAddonModal
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-sm cursor-pointer"
          >
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

      {/* Renew Service Modal */}
      {showRenewServiceModal && (
        <RenewServiceModal
          currentServices={serviceInfo.activeServices}
          currentEndDate={serviceInfo.endDate}
          onClose={() => setShowRenewServiceModal(false)}
          onConfirmRenew={handleConfirmRenew}
        />
      )}

      {/* Purchase Addon Modal */}
      {showPurchaseAddonModal && (
        <PurchaseAddonModal
          onClose={() => setShowPurchaseAddonModal(false)}
          onConfirmPurchase={handleConfirmPurchaseAddon}
        />
      )}

      {/* Confirm Order Modal */}
      {showConfirmOrderModal && (
        <ConfirmOrderModal
          onClose={() => setShowConfirmOrderModal(false)}
          onConfirmAndPay={handleConfirmAndPay}
          totalAmount={currentTotalAmount}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
          orderCode={currentOrderCode}
          totalAmount={currentTotalAmount}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-down">
          <CheckCircle size={20} className="mr-2" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default CurrentServicesPage;
