// src/features/production-entity/pages/SystemServicesPage.tsx
import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  ShoppingCart,
  ArrowUpCircle,
  Package,
  Tag,
  HardDrive,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho các gói dịch vụ chính
interface MainServicePackage {
  id: string;
  name: string;
  price: string;
  period: string; // e.g., "/năm"
  features: string[];
  isPopular?: boolean;
  icon: React.ElementType; // Icon for the package
}

// Định nghĩa kiểu dữ liệu cho gói hỗ trợ đối tác
interface PartnerSupportPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ElementType; // Icon for the package
}

// Định nghĩa kiểu dữ liệu cho gói bổ sung
interface AddonPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ElementType; // Icon for the package
}

// Dữ liệu mẫu cho các gói dịch vụ chính
const mainServicePackages: MainServicePackage[] = [
  {
    id: 'goi-phat-trien',
    name: 'Gói Truyền thông cơ bản',
    price: '1.800.000 VNĐ',
    period: '/năm',
    features: [
      '10 mã truyền thông',
    ],
    icon: Package,
  },
  {
    id: 'goi-chuyen-nghiep',
    name: 'Gói Mã biến đổi cơ bản',
    price: '2.000.000 VNĐ',
    period: '/năm',
    features: [
      '1000000 mã biến đổi',
    ],
    isPopular: true,
    icon: Tag,
  },
  {
    id: 'goi-doanh-nghiep',
    name: 'Gói Mã biến đổi nâng cao',
    price: '3.800.000 VNĐ',
    period: '/năm',
    features: [
      '2000000 mã biến đổi',
    ],
    icon: HardDrive,
  },
  // Thêm một vài gói để minh họa carousel
  {
    id: 'goi-nang-cao',
    name: 'Gói Truyền thông Nâng cao',
    price: '3.000.000 VNĐ',
    period: '/năm',
    features: [
      '20 Mã truyền thông',
    ],
    icon: Users,
  },
];

// Dữ liệu mẫu cho gói hỗ trợ của đối tác
const partnerSupportPackages: PartnerSupportPackage[] = [
  {
    id: 'cau-hinh-thong-tin',
    name: 'Cấu hình thông tin',
    description: 'Hỗ trợ cấu hình thông tin chi tiết cho chủ thể.',
    price: '1.000.000 VNĐ',
    icon: HardDrive,
  },
  {
    id: 'dao-tao',
    name: 'Đào tạo',
    description: 'Đào tạo sử dụng hệ thống, cài đặt và cấu hình máy in.',
    price: '1.000.000 VNĐ',
    icon: Users,
  },
  {
    id: 'ho-tro',
    name: 'Hỗ trợ',
    description: 'Thời gian hỗ trợ xuyên suốt sự kiện dịch vụ, hỗ trợ cài đặt máy in nếu gặp sự cố.',
    price: '300.000 VNĐ',
    icon: Package,
  },
];

// Dữ liệu mẫu cho gói bổ sung
const addonPackages: AddonPackage[] = [
  {
    id: 'ma-bien-doi-10k',
    name: 'Gói 10.000 mã biến đổi',
    description: 'Thêm 10.000 mã định danh để sử dụng cho sản phẩm.',
    price: '200.000 VNĐ',
    icon: Tag,
  },
  {
    id: 'ma-truyen-thong-20',
    name: 'Gói 20 mã truyền thông',
    description: 'Thêm 20 mã truyền thông để quảng bá sản phẩm.',
    price: '400.000 VNĐ',
    icon: Package,
  },
  {
    id: 'dung-luong-1000mb',
    name: 'Gói 1000MB Dung lượng',
    description: 'Bổ sung 1000MB dung lượng lưu trữ cho dữ liệu của bạn.',
    price: '2.000.000 VNĐ',
    icon: HardDrive,
  },
  {
    id: 'luot-kich-hoat-5k',
    name: 'Gói 5.000 lượt kích hoạt',
    description: 'Thêm 5.000 lượt kích hoạt tem cho sản phẩm của bạn.',
    price: '500.000 VNĐ',
    icon: Users,
  },
  {
    id: 'ma-bien-doi-20k',
    name: 'Gói 20.000 mã biến đổi',
    description: 'Thêm 20.000 mã định danh để sử dụng cho sản phẩm.',
    price: '350.000 VNĐ',
    icon: Tag,
  },
];

const SystemServicesPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<{ id: string, name: string } | null>(null);
  
  // State for Main Packages Carousel
  const [mainIndex, setMainIndex] = useState(0);
  const [mainItemsToShow, setMainItemsToShow] = useState(3);
  
  // State for Addon Packages Carousel
  const [addonIndex, setAddonIndex] = useState(0);
  const [addonItemsToShow, setAddonItemsToShow] = useState(3);

  // Custom modal for confirmations
  const ConfirmationModal: React.FC<{ onClose: () => void, onConfirm: () => void, packageName: string }> = ({ onClose, onConfirm, packageName }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-fade-in-down">
        <h3 className="text-xl font-bold mb-4">Xác nhận</h3>
        <p className="text-gray-700 mb-6">Bạn có muốn tiếp tục với gói <span className="font-semibold">{packageName}</span> không?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );

  // Set number of items to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      setMainItemsToShow(window.innerWidth < 768 ? 1 : 3);
      setAddonItemsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoscroll logic for Main Packages
  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex(prevIndex => {
        const maxIndex = mainServicePackages.length - mainItemsToShow;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // 5s auto-scroll
    return () => clearInterval(interval);
  }, [mainItemsToShow]);

  // Autoscroll logic for Add-on Packages
  useEffect(() => {
    const interval = setInterval(() => {
      setAddonIndex(prevIndex => {
        const maxIndex = addonPackages.length - addonItemsToShow;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // 5s auto-scroll
    return () => clearInterval(interval);
  }, [addonItemsToShow]);

  const handleAction = (packageId: string, packageName: string) => {
    setSelectedPackage({ id: packageId, name: packageName });
  };

  const handleBuyAll = (packages: PartnerSupportPackage[]) => {
    const packageNames = packages.map(p => p.name).join(', ');
    setSelectedPackage({ id: 'all', name: `tất cả các gói: ${packageNames}` });
  };

  const handleConfirm = () => {
    if (selectedPackage) {
      console.log(`Đã xác nhận hành động với gói: ${selectedPackage.name}`);
      // Implement actual buy/upgrade logic here
      setSelectedPackage(null); // Close the modal
    }
  };

  const handleCancel = () => {
    setSelectedPackage(null); // Close the modal
  };

  // Logic to get a subset of packages for carousel
  const getMainPackagesToDisplay = () => {
    if (mainIndex + mainItemsToShow > mainServicePackages.length) {
      return [...mainServicePackages.slice(mainIndex), ...mainServicePackages.slice(0, (mainIndex + mainItemsToShow) % mainServicePackages.length)];
    }
    return mainServicePackages.slice(mainIndex, mainIndex + mainItemsToShow);
  };
  
  const getAddonPackagesToDisplay = () => {
    if (addonIndex + addonItemsToShow > addonPackages.length) {
      return [...addonPackages.slice(addonIndex), ...addonPackages.slice(0, (addonIndex + addonItemsToShow) % addonPackages.length)];
    }
    return addonPackages.slice(addonIndex, addonIndex + addonItemsToShow);
  };

  const mainPackagesToDisplay = getMainPackagesToDisplay();
  const addonPackagesToDisplay = getAddonPackagesToDisplay();


  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)]">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Dịch vụ hệ thống</h2>
      <p className="text-sm text-gray-600 mb-6">Dịch vụ / Dịch vụ hệ thống</p>

      {/* Main Service Packages Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center relative">
          Lựa chọn Gói Dịch vụ Chính
          <span className="block w-24 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></span>
        </h3>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainPackagesToDisplay.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  pkg.isPopular ? 'border-blue-500 transform' : 'border-gray-100'
                } p-8 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-tr-xl rounded-bl-lg">
                    Phổ biến nhất
                  </div>
                )}
                <div className="flex-grow flex flex-col items-center">
                  <div className={`p-4 rounded-full ${pkg.isPopular ? 'bg-blue-100' : 'bg-gray-100'} mb-4 transition-colors duration-300`}>
                    <pkg.icon size={36} className={`${pkg.isPopular ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <p className="text-5xl font-extrabold text-blue-600 mb-4">
                    {pkg.price}
                    <span className="text-lg font-semibold text-gray-600">{pkg.period}</span>
                  </p>
                  <ul className="text-gray-700 mb-6 space-y-3 text-left w-full mt-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleAction(pkg.id, pkg.name)}
                  className={`w-full py-4 px-6 rounded-xl text-white font-bold flex items-center justify-center transition-all duration-300 ease-in-out
                    shadow-lg cursor-pointer
                    ${pkg.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  <ArrowUpCircle size={24} className="mr-3" /> Nâng cấp
                </button>
              </div>
            ))}
          </div>
          {/* Navigation Buttons for Main Packages */}
          <button
            onClick={() => setMainIndex(prev => prev === 0 ? mainServicePackages.length - mainItemsToShow : prev - 1)}
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={mainServicePackages.length <= mainItemsToShow}
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={() => setMainIndex(prev => prev >= mainServicePackages.length - mainItemsToShow ? 0 : prev + 1)}
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={mainServicePackages.length <= mainItemsToShow}
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </section>

      {/* Add-on Packages Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center relative">
          Danh sách Gói Bổ sung
          <span className="block w-24 h-1 bg-green-600 mx-auto mt-2 rounded-full"></span>
        </h3>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addonPackagesToDisplay.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <pkg.icon size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{pkg.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-green-600">{pkg.price}</span>
                  <button
                    onClick={() => handleAction(pkg.id, pkg.name)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-sm font-semibold cursor-pointer"
                  >
                    <ShoppingCart size={16} className="mr-2" /> Mua
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons for Add-on Packages */}
          <button
            onClick={() => setAddonIndex(prev => prev === 0 ? addonPackages.length - addonItemsToShow : prev - 1)}
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={addonPackages.length <= addonItemsToShow}
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={() => setAddonIndex(prev => prev >= addonPackages.length - addonItemsToShow ? 0 : prev + 1)}
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={addonPackages.length <= addonItemsToShow}
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </section>

      {/* Partner Support Packages Section */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center relative">
          Gói Hỗ trợ của Đối tác
          <span className="block w-24 h-1 bg-purple-600 mx-auto mt-2 rounded-full"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerSupportPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-purple-100 rounded-full mr-4">
                  <pkg.icon size={24} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{pkg.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-purple-600">{pkg.price}</span>
                <button
                  onClick={() => handleAction(pkg.id, pkg.name)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 text-sm font-semibold cursor-pointer"
                >
                  <ShoppingCart size={16} className="mr-2" /> Mua
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* 'Buy All' Button for Partner Packages */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleBuyAll(partnerSupportPackages)}
            className="flex items-center px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 text-lg font-semibold shadow-md cursor-pointer"
          >
            <ShoppingCart size={20} className="mr-3" /> Mua tất cả gói hỗ trợ
          </button>
        </div>
      </section>

      {/* Confirmation Modal */}
      {selectedPackage && (
        <ConfirmationModal
          onClose={handleCancel}
          onConfirm={handleConfirm}
          packageName={selectedPackage.name}
        />
      )}
    </div>
  );
};

export default SystemServicesPage;
