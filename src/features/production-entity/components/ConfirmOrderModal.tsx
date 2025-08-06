// src/features/production-entity/components/ConfirmOrderModal.tsx
import React, { useRef, useEffect } from 'react';
import { XCircle, DollarSign } from 'lucide-react';

// Define props for ConfirmOrderModal
interface ConfirmOrderModalProps {
  onClose: () => void;
  onConfirmAndPay: () => void;
  totalAmount: number;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({ onClose, onConfirmAndPay, totalAmount }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-center">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <XCircle size={24} />
          </button>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận tạo đơn hàng</h3>
        <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn tạo đơn hàng này không?</p>
        <p className="text-lg font-semibold text-gray-800 mb-6">Tổng tiền: <span className="text-blue-700">{formatPrice(totalAmount)}</span></p>
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 text-base font-semibold cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirmAndPay}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200 text-base font-semibold flex items-center cursor-pointer"
          >
            <DollarSign size={20} className="mr-2" /> Xác nhận và thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;
