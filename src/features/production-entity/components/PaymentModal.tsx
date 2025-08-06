// src/features/production-entity/components/PaymentModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { XCircle, CheckCircle, Info, Trash2 } from 'lucide-react'; // Import Trash2 for remove image

// Define props for PaymentModal                                                                                                                                           ddddddddddddddddddddddđ       
interface PaymentModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
  orderCode: string;
  totalAmount: number;
}
const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onPaymentSuccess, orderCode, totalAmount }) => {
  const [transactionCode, setTransactionCode] = useState('');
  const [paymentImage, setPaymentImage] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState(''); // State for validation error
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false); // New state for confirmation popup
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmPaymentModalRef = useRef<HTMLDivElement>(null); // Ref for confirmation popup

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (showConfirmPaymentModal && confirmPaymentModalRef.current && !confirmPaymentModalRef.current.contains(event.target as Node)) {
        setShowConfirmPaymentModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, showConfirmPaymentModal]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPaymentImage(event.target?.result as string);
        setPaymentError(''); // Clear error on successful upload
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPaymentImage(null);
  };

  const handleConfirmPaymentAttempt = () => {
    if (!transactionCode && !paymentImage) {
      setPaymentError('Vui lòng nhập mã giao dịch hoặc tải lên ảnh giao dịch.');
      return;
    }
    setPaymentError('');
    setShowConfirmPaymentModal(true); // Show confirmation popup
  };

  const confirmPaymentAction = () => {
    // Simulate payment processing
    console.log('Processing payment for order:', orderCode);
    console.log('Transaction Code:', transactionCode);
    console.log('Payment Image:', paymentImage);

    // In a real application, you would send this data to your backend
    // and wait for a response. For now, simulate success.
    setTimeout(() => {
      onPaymentSuccess(); // Trigger success callback in parent
      setShowConfirmPaymentModal(false); // Close confirmation popup
      onClose(); // Close the main modal
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  const currentDateTime = new Date().toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // QR Code URL
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https://xacthucso.vn";

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold text-gray-900">Thanh toán hóa đơn</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <XCircle size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin hóa đơn */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Thông tin hóa đơn</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Mã đơn hàng:</span>
                <span>{orderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Thời gian tạo đơn:</span>
                <span>{currentDateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tên chủ thể:</span>
                <span>User1</span> {/* Mock data */}
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Mã chủ thể:</span>
                <span>KH001</span> {/* Mock data */}
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-700">
                <span className="font-medium">Chi phí phải trả:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-md font-semibold text-gray-800 mb-3">Thông tin xác nhận đã chuyển khoản</h5>
              <div className="mb-4">
                <label htmlFor="transactionCode" className="block text-gray-700 text-sm font-bold mb-2">Mã giao dịch:</label>
                <input
                  type="text"
                  id="transactionCode"
                  value={transactionCode}
                  onChange={(e) => { setTransactionCode(e.target.value); setPaymentError(''); }} // Clear error on input
                  placeholder="Nhập mã giao dịch"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="paymentImage" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  Ảnh giao dịch:
                  <div className="ml-2 text-blue-500 cursor-help" title="Vui lòng tải lên ảnh chụp màn hình giao dịch thành công">
                    <Info size={16} />
                  </div>
                </label>
                <input
                  type="file"
                  id="paymentImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 cursor-pointer"
                />
                {paymentImage && (
                  <div className="mt-4 relative">
                    <img src={paymentImage} alt="Payment Proof" className="max-w-full h-auto max-h-32 object-contain rounded-lg shadow-md" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200 cursor-pointer"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              {paymentError && <p className="text-red-500 text-xs italic mt-2">{paymentError}</p>}
            </div>
          </div>

          {/* Thông tin chuyển khoản */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Thông tin chuyển khoản</h4>
            <div className="flex justify-center mb-4">
              {/* QR Code */}
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-64 h-64 rounded-lg border border-gray-200" // Increased size to 128x128
              />
            </div>
            <p className="text-center text-xs text-gray-600 mb-4">Quét mã để chuyển khoản nhanh</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Ngân hàng:</span>
                <span>TMCP Ngoại Thương Việt Nam Vietcombank CN Thành Công</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Số tài khoản:</span>
                <span>04510003094571</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tên chủ tài khoản:</span>
                <span>CÔNG TY CỔ PHẦN CÔNG NGHỆ XÁC THỰC SỐ</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-700">
                <span className="font-medium">Số tiền:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Nội dung chuyển khoản:</span>
                <span>{orderCode}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 text-base font-semibold cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirmPaymentAttempt}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-base font-semibold flex items-center cursor-pointer"
          >
            <CheckCircle size={20} className="mr-2" /> Xác nhận
          </button>
        </div>
      </div>

      {/* Confirm Payment Popup */}
      {showConfirmPaymentModal && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div ref={confirmPaymentModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận thanh toán</h3>
            <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn xác nhận thanh toán này không?</p>
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={() => setShowConfirmPaymentModal(false)}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 text-base font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmPaymentAction}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-base font-semibold cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
