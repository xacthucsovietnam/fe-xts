// src/features/production-entity/pages/SystemServicesPage.tsx
import React from 'react';
import {
  CheckCircle, // For features list
  ShoppingCart, // For buy button
  ArrowUpCircle, // For upgrade button
} from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho các gói dịch vụ chính
interface MainServicePackage {
  id: string;
  name: string;
  price: string;
  period: string; // e.g., "/năm"
  features: string[];
  isPopular?: boolean;
}

// Định nghĩa kiểu dữ liệu cho gói hỗ trợ đối tác
interface PartnerSupportPackage {
  id: string;
  name: string;
  description: string;
  price: string;
}

// Định nghĩa kiểu dữ liệu cho gói bổ sung
interface AddonPackage {
  id: string;
  name: string;
  description: string;
  price: string;
}

// Dữ liệu mẫu cho các gói dịch vụ chính
const mainServicePackages: MainServicePackage[] = [
  {
    id: 'goi-phat-trien',
    name: 'Gói Phát triển',
    price: '1.200.000 VNĐ',
    period: '/năm',
    features: [
      '500 lượt kích hoạt',
      '10GB dung lượng',
      '5 sản phẩm',
      'Hỗ trợ cơ bản',
    ],
  },
  {
    id: 'goi-chuyen-nghiep',
    name: 'Gói Chuyên nghiệp',
    price: '2.500.000 VNĐ',
    period: '/năm',
    features: [
      '1000 lượt kích hoạt',
      '25GB dung lượng',
      '10 sản phẩm',
      'Hỗ trợ ưu tiên',
      'Báo cáo nâng cao',
    ],
    isPopular: true,
  },
  {
    id: 'goi-doanh-nghiep',
    name: 'Gói Doanh nghiệp',
    price: '5.000.000 VNĐ',
    period: '/năm',
    features: [
      '2500 lượt kích hoạt',
      '50GB dung lượng',
      'Không giới hạn sản phẩm',
      'Hỗ trợ 24/7',
      'Tích hợp API',
    ],
  },
];

// Dữ liệu mẫu cho gói hỗ trợ của đối tác
const partnerSupportPackages: PartnerSupportPackage[] = [
  {
    id: 'cau-hinh-thong-tin',
    name: 'Cấu hình thông tin',
    description: 'Hỗ trợ cấu hình thông tin chi tiết cho chủ thể.',
    price: '1.000.000 VNĐ',
  },
  {
    id: 'dao-tao',
    name: 'Đào tạo',
    description: 'Đào tạo sử dụng hệ thống, cài đặt và cấu hình máy in.',
    price: '1.000.000 VNĐ',
  },
  {
    id: 'ho-tro',
    name: 'Hỗ trợ',
    description: 'Thời gian hỗ trợ xuyên suốt sự kiện dịch vụ, hỗ trợ cài đặt máy in nếu gặp sự cố.',
    price: '300.000 VNĐ',
  },
];

// Dữ liệu mẫu cho gói bổ sung
const addonPackages: AddonPackage[] = [
  {
    id: 'ma-bien-doi-10k',
    name: 'Gói 10.000 mã biến đổi',
    description: 'Thêm 10.000 mã định danh để sử dụng cho sản phẩm.',
    price: '200.000 VNĐ',
  },
  {
    id: 'ma-truyen-thong-20',
    name: 'Gói 20 mã truyền thông',
    description: 'Thêm 20 mã truyền thông để quảng bá sản phẩm.',
    price: '400.000 VNĐ',
  },
  {
    id: 'dung-luong-1000mb',
    name: 'Gói 1000MB Dung lượng',
    description: 'Bổ sung 1000MB dung lượng lưu trữ cho dữ liệu của bạn.',
    price: '2.000.000 VNĐ',
  },
  {
    id: 'luot-kich-hoat-5k',
    name: 'Gói 5.000 lượt kích hoạt',
    description: 'Thêm 5.000 lượt kích hoạt tem cho sản phẩm của bạn.',
    price: '500.000 VNĐ',
  },
];

/**
 * SystemServicesPage Component
 *
 * This page presents various service packages offered by the system,
 * including main service plans, partner support packages, and add-on packages.
 * Designed with a clean, card-based layout using Tailwind CSS for a modern look.
 */
const SystemServicesPage: React.FC = () => {
  const handleUpgrade = (packageId: string) => {
    console.log(`Nâng cấp gói: ${packageId}`);
    // Implement actual upgrade logic here (e.g., navigate to payment, show confirmation)
    alert(`Bạn đã chọn nâng cấp gói: ${packageId}.`);
  };

  const handleBuy = (packageId: string) => {
    console.log(`Mua gói: ${packageId}`);
    // Implement actual buy logic here
    alert(`Bạn đã chọn mua gói: ${packageId}.`);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)]">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Dịch vụ hệ thống</h2>
      <p className="text-sm text-gray-600 mb-6">Dịch vụ / Dịch vụ hệ thống</p>

      {/* Main Service Packages Section */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Lựa chọn Gói Dịch vụ Chính</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServicePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-xl shadow-lg border-2 ${
                pkg.isPopular ? 'border-blue-500 shadow-blue-200' : 'border-gray-100'
              } p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl transform translate-x-2 -translate-y-2 rotate-3 shadow-md">
                  Phổ biến nhất
                </div>
              )}
              <h4 className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</h4>
              <p className="text-4xl font-extrabold text-blue-600 mb-4">
                {pkg.price}
                <span className="text-lg font-semibold text-gray-600">{pkg.period}</span>
              </p>
              <ul className="text-gray-700 mb-6 space-y-2 text-left w-full">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(pkg.id)}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold flex items-center justify-center transition duration-200 ease-in-out
                  ${pkg.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                <ArrowUpCircle size={20} className="mr-2" /> Nâng cấp
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add-on Packages Section */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Danh sách Gói Bổ sung</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addonPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col transition-all duration-200 hover:shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h4>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{pkg.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-blue-600">{pkg.price}</span>
                <button
                  onClick={() => handleBuy(pkg.id)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
                >
                  <ShoppingCart size={16} className="mr-2" /> Mua
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Support Packages Section */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Gói Hỗ trợ của Đối tác</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerSupportPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col transition-all duration-200 hover:shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h4>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{pkg.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-blue-600">{pkg.price}</span>
                <button
                  onClick={() => handleBuy(pkg.id)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
                >
                  <ShoppingCart size={16} className="mr-2" /> Mua
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SystemServicesPage;
