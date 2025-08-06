// src/features/production-entity/components/PurchaseAddonModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { XCircle, PlusCircle, Trash2 } from 'lucide-react';

// Define types for service packages (re-using from RenewServiceModal for consistency)
interface ServicePackage {
  id: string;
  name: string;
  type: 'Gói chính' | 'Gói bổ sung'; // Although only 'Gói bổ sung' will be selectable here
  params: string;
  quantity: number;
  price: number; // Stored as number for calculation, displayed as formatted string
}

// Mock data for available supplementary service packages
// (Copied from RenewServiceModal, ensuring only supplementary packages are used)
const mockSupplementaryPackages: ServicePackage[] = [
  { id: 'standard_tradition', name: '10,000 mã biến đổi', type: 'Gói bổ sung', params: 'Mã biến đổi', quantity: 10000, price: 1800000 },
  { id: 'basic_activation', name: '10,000 lượt kích hoạt', type: 'Gói bổ sung', params: 'Lượt kích hoạt', quantity: 10000, price: 1200000 },
  { id: 'storage_addon', name: '1000MB dung lượng', type: 'Gói bổ sung', params: 'Dung lượng (MB)', quantity: 50, price: 500000 },
];

// Define props for PurchaseAddonModal
interface PurchaseAddonModalProps {
  onClose: () => void;
  onConfirmPurchase: (selectedPackages: ServicePackage[]) => void;
}

const PurchaseAddonModal: React.FC<PurchaseAddonModalProps> = ({ onClose, onConfirmPurchase }) => {
  const [selectedPackages, setSelectedPackages] = useState<ServicePackage[]>([]);
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

  const handlePackageChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPackageId = e.target.value;
    const selectedPackage = mockSupplementaryPackages.find(pkg => pkg.id === selectedPackageId);

    if (selectedPackage) {
      setSelectedPackages(prev => {
        const newPackages = [...prev];
        newPackages[index] = {
          ...selectedPackage,
          id: newPackages[index].id, // Keep the original unique ID for the row
        };
        return newPackages;
      });
    }
  };

  const handleAddPackage = () => {
    // Add a new row with a default empty supplementary package
    setSelectedPackages(prev => [
      ...prev,
      {
        id: 'new_addon_package_' + Math.random().toString(36).substring(2, 9),
        name: '',
        type: 'Gói bổ sung',
        params: '',
        quantity: 0,
        price: 0,
      },
    ]);
  };

  const handleDeletePackage = (id: string) => {
    setSelectedPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  const calculateTotalPrice = () => {
    return selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
  };

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold text-gray-900">Mua bổ sung gói dịch vụ</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <XCircle size={24} />
          </button>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mb-3">Danh sách gói dịch vụ bổ sung</h4>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gói dịch vụ</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại gói</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tham số</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá tiền</th>
                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedPackages.map((pkg, index) => (
                <tr key={pkg.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                    <select
                      value={pkg.id || ''} // Set value to pkg.id to pre-select, or empty string for default option
                      onChange={(e) => handlePackageChange(index, e)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="" disabled>Chọn gói dịch vụ</option> {/* Default disabled option */}
                      {mockSupplementaryPackages.map(optionPkg => (
                        <option key={optionPkg.id} value={optionPkg.id}>{optionPkg.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                      {pkg.type}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{pkg.params}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{pkg.quantity.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{formatPrice(pkg.price)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 text-sm flex items-center cursor-pointer"
          >
            <PlusCircle size={16} className="mr-2" /> Thêm gói dịch vụ
          </button>
        </div>

        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
          <span className="text-lg font-semibold text-gray-800">Tổng tiền:</span>
          <span className="text-xl font-bold text-blue-700">{formatPrice(calculateTotalPrice())}</span>
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
            onClick={() => onConfirmPurchase(selectedPackages)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-base font-semibold cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAddonModal;
