// src/features/production-entity/components/RenewServiceModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { XCircle, PlusCircle, Trash2 } from 'lucide-react';

// Define types for service packages
interface ServicePackage {
  id: string;
  name: string;
  type: 'Gói chính' | 'Gói bổ sung';
  params: string;
  quantity: number;
  price: number; // Stored as number for calculation, displayed as formatted string
}

// Mock data for available service packages
const mockMainPackages: ServicePackage[] = [
  { id: 'premium', name: 'Gói truyền thông', type: 'Gói chính', params: 'Mã truyền thông', quantity: 10, price: 2500000 },
  { id: 'enterprise', name: 'Gói truy xuất', type: 'Gói chính', params: 'Mã biến đổi', quantity: 10000, price: 3000000 },
];

const mockSupplementaryPackages: ServicePackage[] = [
  { id: 'standard_tradition', name: '10,000 mã biến đổi', type: 'Gói bổ sung', params: 'Mã biến đổi', quantity: 10000, price: 1800000 },
  { id: 'basic_activation', name: '10,000 lượt kích hoạt', type: 'Gói bổ sung', params: 'Lượt kích hoạt', quantity: 10000, price: 1200000 },
  { id: 'storage_addon', name: '1000MB dung lượng', type: 'Gói bổ sung', params: 'Dung lượng (MB)', quantity: 1000, price: 500000 },
];

// Define props for RenewServiceModal
interface RenewServiceModalProps {
  currentServices: {
    stt: number;
    packageName: string;
    packageType: 'Gói chính' | 'Gói bổ sung';
    params: string;
    quantity: number;
    price: string; // Price from mock data is string, convert to number for internal use
    startDate: string;
  }[];
  currentEndDate: string; // The current service's end date, used to calculate new start date
  onClose: () => void;
  onConfirmRenew: (renewedServices: ServicePackage[], newStartDate: string, newEndDate: string) => void;
}

const RenewServiceModal: React.FC<RenewServiceModalProps> = ({ currentServices, currentEndDate, onClose, onConfirmRenew }) => {
  const [renewedServices, setRenewedServices] = useState<ServicePackage[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate new start and end dates based on currentEndDate
  const calculateNewDates = (currentEnd: string) => {
    const [day, month, year] = currentEnd.split('/').map(Number);
    const endDateObj = new Date(year, month - 1, day); // Month is 0-indexed

    const newStartDateObj = new Date(endDateObj);
    newStartDateObj.setDate(newStartDateObj.getDate() + 1); // New start date is day after current end date

    const newEndDateObj = new Date(newStartDateObj);
    newEndDateObj.setFullYear(newEndDateObj.getFullYear() + 1); // New end date is 1 year after new start date
    newEndDateObj.setDate(newEndDateObj.getDate() - 1); // Adjust to be inclusive of the year

    const formatDate = (date: Date) => {
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    };

    return {
      newStartDate: formatDate(newStartDateObj),
      newEndDate: formatDate(newEndDateObj),
    };
  };

  const { newStartDate, newEndDate } = calculateNewDates(currentEndDate);

  useEffect(() => {
    // Initialize renewedServices with currentServices, converting price to number
    const initialRenewed = currentServices.map(service => {
      // Find the corresponding package in mock data to get its ID
      const allPackages = [...mockMainPackages, ...mockSupplementaryPackages];
      const foundPackage = allPackages.find(pkg => pkg.name === service.packageName && pkg.type === service.packageType);

      return {
        id: foundPackage ? foundPackage.id : service.packageName.replace(/\s/g, '_').toLowerCase() + Math.random().toString(36).substring(2, 9), // Use found ID or generate unique ID
        name: service.packageName,
        type: service.packageType,
        params: service.params,
        quantity: service.quantity,
        price: parseFloat(service.price.replace(/[^0-9,-]+/g, '').replace(',', '.')), // Convert "2,500,000 VNĐ" to 2500000
      };
    });
    setRenewedServices(initialRenewed);

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentServices, onClose, currentEndDate]);

  const handlePackageChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPackageId = e.target.value;
    const allPackages = [...mockMainPackages, ...mockSupplementaryPackages];
    const selectedPackage = allPackages.find(pkg => pkg.id === selectedPackageId);

    if (selectedPackage) {
      setRenewedServices(prev => {
        const newServices = [...prev];
        // Retain original STT, but update other fields from the selected package
        newServices[index] = {
          ...selectedPackage,
          id: newServices[index].id, // Keep the original unique ID for the row
        };
        return newServices;
      });
    }
  };

  const handleAddPackage = () => {
    // Add a new empty row, or a default supplementary package
    setRenewedServices(prev => [
      ...prev,
      {
        id: 'new_package_' + Math.random().toString(36).substring(2, 9),
        name: '',
        type: 'Gói bổ sung', // New packages are typically supplementary
        params: '',
        quantity: 0,
        price: 0,
      },
    ]);
  };

  const handleDeletePackage = (id: string) => {
    setRenewedServices(prev => prev.filter(service => service.id !== id));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  const calculateTotalPrice = () => {
    return renewedServices.reduce((sum, service) => sum + service.price, 0);
  };

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold text-gray-900">Gia hạn dịch vụ</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Ngày bắt đầu mới:</p>
              <p className="font-semibold text-gray-800">{newStartDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày hết hạn mới:</p>
              <p className="font-semibold text-gray-800">{newEndDate}</p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mb-3">Danh sách gói dịch vụ</h4>
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
              {renewedServices.map((service, index) => (
                <tr key={service.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                    <select
                      value={service.id} // Set value to service.id to pre-select
                      onChange={(e) => handlePackageChange(index, e)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {service.type === 'Gói chính' ? (
                        mockMainPackages.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                        ))
                      ) : (
                        mockSupplementaryPackages.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                        ))
                      )}
                    </select>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                      {service.type}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{service.params}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{service.quantity.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{formatPrice(service.price)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => handleDeletePackage(service.id)}
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
            onClick={() => onConfirmRenew(renewedServices, newStartDate, newEndDate)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-base font-semibold cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewServiceModal;
