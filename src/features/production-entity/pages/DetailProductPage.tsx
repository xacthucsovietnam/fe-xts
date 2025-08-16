import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  DollarSign,
  Package,
  Calendar,
  Grid,
  FileText,
  Image as ImageIcon,
  Video,
} from 'lucide-react';

// Enum for attribute types
enum AttributeType {
  BASIC = 'Cơ bản',
  ACTIVE = 'Kích hoạt',
  BUSINESS = 'Kinh doanh',
}

// Interface for a single product attribute
interface ProductAttribute {
  id: number;
  name: string;
  unit: string;
  value: string;
  type: AttributeType;
  required: boolean;
}

// Interface for the entire product data
interface ProductData {
  productName: string;
  price: number;
  expiryValue: string;
  expiryUnit: string;
  gtin: string;
  profileImages: { src: string; alt: string }[];
  description: string;
  attributes: ProductAttribute[];
  productDescription: string;
  introImages: { src: string; alt: string }[];
  introVideoSrc: string | null;
}

const DetailProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product data from an API
    const fetchProductData = () => {
      setIsLoading(true);
      // Mock data for a single product
      const mockProduct: ProductData = {
        productName: 'Bột giặt OMO Matic Tinh Dầu Thơm',
        price: 150000,
        expiryValue: '2',
        expiryUnit: 'Năm',
        gtin: '8934567890123',
        profileImages: [
          { src: 'https://placehold.co/100x100/E5E7EB/1F2937?text=Omo+1', alt: 'Omo product image 1' },
          { src: 'https://placehold.co/100x100/E5E7EB/1F2937?text=Omo+2', alt: 'Omo product image 2' },
          { src: 'https://placehold.co/100x100/E5E7EB/1F2937?text=Omo+3', alt: 'Omo product image 3' },
        ],
        description: 'Bột giặt OMO Matic với công thức đột phá giúp đánh bay vết bẩn cứng đầu chỉ trong một lần giặt, đồng thời lưu lại hương thơm dịu nhẹ từ tinh dầu thiên nhiên.',
        attributes: [
          { id: 1, name: 'Khối lượng', unit: 'kg', value: '3', type: AttributeType.BASIC, required: true },
          { id: 2, name: 'Loại', unit: '', value: 'Máy giặt cửa trên', type: AttributeType.BASIC, required: true },
          { id: 3, name: 'Số lượng', unit: 'chai', value: '1', type: AttributeType.BUSINESS, required: false },
        ],
        productDescription: 'OMO Matic Bột Giặt Cửa Trên Tinh Dầu Thơm với công thức đột phá, ứng dụng công nghệ giặt sạch vượt trội giúp đánh bay những vết bẩn cứng đầu một cách hiệu quả chỉ trong một lần giặt. Sản phẩm còn có thành phần tinh dầu thơm tự nhiên, giúp quần áo luôn mềm mại và thơm mát. Thích hợp cho cả giặt tay và giặt máy.',
        introImages: [
          { src: 'https://placehold.co/200x150/E5E7EB/1F2937?text=Intro+1', alt: 'Introduction image 1' },
          { src: 'https://placehold.co/200x150/E5E7EB/1F2937?text=Intro+2', alt: 'Introduction image 2' },
        ],
        introVideoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
      };
      
      setTimeout(() => {
        setProduct(mockProduct);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchProductData();
  }, []);

  // Handle "Quay lại" button click
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous screen
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-lg">Đang tải dữ liệu sản phẩm...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-lg">Không tìm thấy sản phẩm.</div>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="space-y-6 pb-24">
      {/* Tên sản phẩm */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
        <p className="text-lg font-semibold text-gray-900">{product.productName}</p>
      </div>

      {/* Giá bán & Hạn sử dụng */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><DollarSign size={16} className="mr-1" /> Giá bán</label>
          <p className="text-gray-800 font-medium">{product.price.toLocaleString('vi-VN')} VND</p>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><Calendar size={16} className="mr-1" /> Hạn sử dụng</label>
          <p className="text-gray-800 font-medium">{product.expiryValue} {product.expiryUnit}</p>
        </div>
      </div>

      {/* Mã GTIN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><Package size={16} className="mr-1" /> Mã GTIN</label>
        <p className="text-gray-800 font-medium">{product.gtin}</p>
      </div>

      {/* Ảnh */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><ImageIcon size={16} className="mr-1" /> Ảnh</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.profileImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} className="w-24 h-24 object-cover rounded-md border border-gray-200" />
          ))}
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><FileText size={16} className="mr-1" /> Mô tả</label>
        <div className="mt-2 p-3 bg-gray-100 rounded-md text-gray-800 text-sm whitespace-pre-wrap">{product.description}</div>
      </div>

      {/* Danh sách thuộc tính */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-800 flex items-center"><Grid size={18} className="mr-1" /> Danh sách thuộc tính</h3>
        </div>
        
        {/* Table view for larger screens (sm and up) */}
        <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tên thuộc tính</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Đơn vị tính</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Giá trị</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bắt buộc</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {product.attributes.map((attr, index) => (
                <tr key={attr.id}>
                  <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{attr.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{attr.unit}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{attr.value}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{attr.type}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-800">{attr.required ? 'Có' : 'Không'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Card view for mobile/tablet screens */}
        <div className="block sm:hidden space-y-4">
          {product.attributes.map((attr, index) => (
            <div key={attr.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-blue-600">Thuộc tính #{index + 1}</span>
              </div>
              <div className="mt-3 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Tên thuộc tính</label>
                  <p className="text-sm text-gray-800 mt-1">{attr.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Đơn vị tính</label>
                  <p className="text-sm text-gray-800 mt-1">{attr.unit}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Giá trị</label>
                  <p className="text-sm text-gray-800 mt-1">{attr.value}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Loại thuộc tính</label>
                  <p className="text-sm text-gray-800 mt-1">{attr.type}</p>
                </div>
                <div className="flex items-center pt-2 border-t border-gray-100 mt-4">
                  <p className="text-sm text-gray-900">Bắt buộc: <span className="font-medium">{attr.required ? 'Có' : 'Không'}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntroductionTab = () => (
    <div className="space-y-6 pb-24">
      {/* Mô tả sản phẩm */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><FileText size={16} className="mr-1" /> Mô tả sản phẩm</label>
        <div className="mt-2 p-3 bg-gray-100 rounded-md text-gray-800 text-sm whitespace-pre-wrap">{product.productDescription}</div>
      </div>
      {/* Ảnh */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><ImageIcon size={16} className="mr-1" /> Ảnh</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.introImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} className="w-48 h-auto object-cover rounded-md border border-gray-200" />
          ))}
        </div>
      </div>
      {/* Video */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center mb-1"><Video size={16} className="mr-1" /> Video</label>
        {product.introVideoSrc ? (
          <video controls src={product.introVideoSrc} className="w-full sm:w-2/3 h-auto rounded-md border border-gray-200 mt-2"></video>
        ) : (
          <p className="text-sm text-gray-500 italic mt-2">Không có video giới thiệu.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-grow bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Chi tiết sản phẩm</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 cursor-pointer py-3 px-6 text-center text-sm font-medium transition duration-200 ease-in-out border-b-2
              ${activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            HỒ SƠ
          </button>
          <button
            onClick={() => setActiveTab('introduction')}
            className={`flex-1 cursor-pointer py-3 px-6 text-center text-sm font-medium transition duration-200 ease-in-out border-b-2
              ${activeTab === 'introduction'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            GIỚI THIỆU
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' ? renderProfileTab() : renderIntroductionTab()}

      </div>

      {/* Fixed Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg p-4 flex justify-end space-x-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center cursor-pointer px-4 py-2 sm:px-6 sm:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ChevronLeft size={20} className="mr-2" />
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default DetailProductPage;
