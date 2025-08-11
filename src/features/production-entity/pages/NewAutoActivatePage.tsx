import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, PlusCircle, CheckCircle, X, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: string;
  code: string;
  name: string;
  status: 'active' | 'locked';
}

// Dữ liệu sản phẩm giả lập
const mockProducts: Product[] = [
  { id: '1', code: 'SP001', name: 'Gạo ST25', status: 'active' },
  { id: '2', code: 'SP002', name: 'Cà phê rang xay', status: 'active' },
  { id: '3', code: 'SP003', name: 'Trà xanh hữu cơ', status: 'locked' },
  { id: '4', code: 'SP004', name: 'Mật ong nguyên chất', status: 'active' },
  { id: '5', code: 'SP005', name: 'Hạt điều rang muối', status: 'active' },
  { id: '6', code: 'SP006', name: 'Sữa tươi thanh trùng', status: 'locked' },
  { id: '7', code: 'SP007', name: 'Bánh gạo lứt', status: 'active' },
];

const NewAutoActivatePage: React.FC = () => {
  const navigate = useNavigate();

  // State for form fields
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [activationType, setActivationType] = useState<'Tương lai' | 'Quá khứ'>('Tương lai');
  const [activationTransferTime, setActivationTransferTime] = useState<string>('');
  const [semiAutoTransferTime, setSemiAutoTransferTime] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Filter products to show only 'active' ones
  const activeProducts = useMemo(() => {
    return mockProducts.filter(p => p.status === 'active');
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.getElementById('product-dropdown-button');
      const dropdownContentElement = document.getElementById('product-dropdown-content');
      
      if (dropdownElement && !dropdownElement.contains(event.target as Node) &&
          dropdownContentElement && !dropdownContentElement.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    let hasError = false;

    // Validation
    if (!selectedProduct) {
      newErrors.product = 'Vui lòng chọn sản phẩm';
      hasError = true;
    }

    const activationTimeValue = parseInt(activationTransferTime);
    if (isNaN(activationTimeValue) || activationTimeValue < 0 || activationTimeValue > 24) {
      newErrors.activationTime = 'Giá trị phải từ 0 đến 24';
      hasError = true;
    }

    const semiAutoTimeValue = parseInt(semiAutoTransferTime);
    if (isNaN(semiAutoTimeValue) || semiAutoTimeValue < 0 || semiAutoTimeValue > 24) {
      newErrors.semiAutoTime = 'Giá trị phải từ 0 đến 24';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setShowConfirmModal(true);
    }
  };
  
  // Handle confirmation
  const handleConfirm = () => {
    setShowConfirmModal(false);
    console.log('Form submitted:', {
        selectedProduct,
        activationType,
        activationTransferTime: activationType === 'Tương lai' ? `+${activationTransferTime}` : `-${activationTransferTime}`,
        semiAutoTransferTime: `+${semiAutoTransferTime}`,
      });
    // Simulate API call success
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/production-entity/auto-activate');
    }, 2000); // Hide toast and navigate after 2 seconds
  };
  
  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
  };

  return (
    // Updated container to match main content width
    <div className="p-8 bg-gray-100 min-h-screen font-sans flex flex-col">
      <div className="bg-white rounded-xl shadow-lg p-6 flex-grow">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <PlusCircle size={32} className="mr-3 text-blue-600" />
            Thêm mới Kích hoạt tự động
          </h1>
        </div>

        {/* Form - Vertical layout */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SelectBox chọn sản phẩm */}
          <div className="flex flex-col">
            <label htmlFor="product" className="mb-2 font-medium text-gray-700">
              Sản phẩm
            </label>
            <div className="relative">
              <button
                id="product-dropdown-button"
                type="button"
                className={`flex justify-between items-center w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.product ? 'border-red-500' : ''
                }`}
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              >
                <span className={`${selectedProduct ? 'text-gray-900' : 'text-gray-500'}`}>
                  {selectedProduct ? `${selectedProduct.name} (${selectedProduct.code})` : 'Chọn sản phẩm'}
                </span>
                <ChevronDown size={20} className={`text-gray-500 transform transition-transform ${isProductDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {isProductDropdownOpen && (
                <div id="product-dropdown-content" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                  {activeProducts.map((product) => (
                    <div
                      key={product.id}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsProductDropdownOpen(false);
                        setErrors(prev => ({...prev, product: ''}));
                      }}
                    >
                      {product.name} ({product.code})
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.product && <p className="mt-2 text-sm text-red-500">{errors.product}</p>}
          </div>

          {/* Thời điểm chuyển kích hoạt */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Thời điểm chuyển kích hoạt (h)
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600 h-4 w-4"
                  name="activationType"
                  value="Tương lai"
                  checked={activationType === 'Tương lai'}
                  onChange={() => setActivationType('Tương lai')}
                />
                <span className="ml-2 text-gray-700">Tương lai</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600 h-4 w-4"
                  name="activationType"
                  value="Quá khứ"
                  checked={activationType === 'Quá khứ'}
                  onChange={() => setActivationType('Quá khứ')}
                />
                <span className="ml-2 text-gray-700">Quá khứ</span>
              </label>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500 font-bold">
                {activationType === 'Tương lai' ? '+' : '-'}
              </span>
              <input
                type="number"
                value={activationTransferTime}
                onChange={(e) => setActivationTransferTime(e.target.value)}
                className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.activationTime ? 'border-red-500' : ''
                }`}
                min="0"
                max="24"
                placeholder="Nhập giá trị từ 0 đến 24"
              />
            </div>
            {errors.activationTime && <p className="mt-2 text-sm text-red-500">{errors.activationTime}</p>}
          </div>

          {/* Chuyển bán tự động */}
          <div className="flex flex-col">
            <label htmlFor="semiAutoTransferTime" className="mb-2 font-medium text-gray-700">
              Chuyển bán tự động (h)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500 font-bold">+</span>
              <input
                type="number"
                id="semiAutoTransferTime"
                value={semiAutoTransferTime}
                onChange={(e) => setSemiAutoTransferTime(e.target.value)}
                className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.semiAutoTime ? 'border-red-500' : ''
                }`}
                min="0"
                max="24"
                placeholder="Nhập giá trị từ 0 đến 24"
              />
            </div>
            {errors.semiAutoTime && <p className="mt-2 text-sm text-red-500">{errors.semiAutoTime}</p>}
          </div>
        </form>
      </div>

      {/* Footer bar for navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 flex justify-end space-x-4">
        <Link
          to="/production-entity/auto-activate"
          className="flex items-center px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} className="mr-2" />
          Quay lại
        </Link>
        <button
          type="submit"
          onClick={handleSubmit} // Use onClick to trigger form submission and validation
          className="flex items-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <CheckCircle size={20} className="mr-2" />
          Xác nhận
        </button>
      </div>

      {/* Modal xác nhận */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-8 border w-96 shadow-lg rounded-xl bg-white transform transition-transform duration-300 ease-in-out scale-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận thêm mới</h3>
            <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn thêm mới kích hoạt tự động này?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelConfirm}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast thông báo */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center p-4 bg-green-500 text-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out scale-100">
          <CheckCircle size={24} className="mr-2" />
          <p className="text-sm font-medium">Thêm mới thành công!</p>
          <button onClick={() => setShowToast(false)} className="ml-4 text-white hover:opacity-75">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewAutoActivatePage;
