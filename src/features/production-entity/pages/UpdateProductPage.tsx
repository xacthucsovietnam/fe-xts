import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  DollarSign,
  PlusCircle,
  X,
  CheckCircle,
  Upload,
  Trash2,
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

const UpdateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle outside click for modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowConfirmModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  // Simulate fetching product data
  useEffect(() => {
    const fetchProductData = () => {
      setIsLoading(true);
      // Mock data for a single product to be updated
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
        setProductData(mockProduct);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchProductData();
  }, []);

  // Handle "Quay lại" button click
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle form submission
  const handleConfirm = () => {
    if (!productData) return;
    // Validate required fields
    if (!productData.productName || productData.profileImages.length === 0) {
      setToastMessage('Vui lòng điền đầy đủ các trường bắt buộc (*) ở tab HỒ SƠ.');
      setShowToast(true);
      return;
    }
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  // Final submission after modal confirmation
  const handleFinalSubmit = () => {
    // Logic to save the updated product data
    console.log('Updated Product Data:', productData);

    // Close modal and show success toast
    setShowConfirmModal(false);
    setToastMessage('Cập nhật sản phẩm thành công!');
    setShowToast(true);

    // Redirect after a delay
    setTimeout(() => {
      navigate('/production-entity/products');
    }, 2000);
  };

  // Handle updates to form fields
  const handleUpdateField = (field: keyof ProductData, value: any) => {
    setProductData(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Handle file uploads (note: this is a simplified version for mock data)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'profileImage' | 'introImage' | 'introVideo') => {
    if (!e.target.files || !productData) return;

    const files = Array.from(e.target.files);
    const maxSizeMB = fileType === 'introVideo' ? 200 : 20;

    const validFiles = files.filter(file => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setToastMessage(`File "${file.name}" vượt quá dung lượng tối đa (${maxSizeMB}MB).`);
        setShowToast(true);
        return false;
      }
      return true;
    });

    if (fileType === 'profileImage') {
      const newImages = validFiles.map(file => ({ src: URL.createObjectURL(file), alt: file.name }));
      setProductData(prev => prev ? { ...prev, profileImages: [...prev.profileImages, ...newImages] } : null);
    } else if (fileType === 'introImage') {
      const newImages = validFiles.map(file => ({ src: URL.createObjectURL(file), alt: file.name }));
      setProductData(prev => prev ? { ...prev, introImages: [...prev.introImages, ...newImages] } : null);
    } else if (fileType === 'introVideo') {
      setProductData(prev => prev ? { ...prev, introVideoSrc: URL.createObjectURL(validFiles[0]) } : null);
    }
  };

  const removeFile = (fileSrc: string, fileType: 'profileImage' | 'introImage' | 'introVideo') => {
    if (!productData) return;
    if (fileType === 'profileImage') {
      setProductData(prev => prev ? { ...prev, profileImages: prev.profileImages.filter(file => file.src !== fileSrc) } : null);
    } else if (fileType === 'introImage') {
      setProductData(prev => prev ? { ...prev, introImages: prev.introImages.filter(file => file.src !== fileSrc) } : null);
    } else if (fileType === 'introVideo') {
      setProductData(prev => prev ? { ...prev, introVideoSrc: null } : null);
    }
  };

  // Handle adding a new attribute row
  const addAttribute = () => {
    if (!productData) return;
    const newAttribute: ProductAttribute = {
      id: productData.attributes.length + 1,
      name: '',
      unit: '',
      value: '',
      type: AttributeType.BASIC,
      required: true,
    };
    setProductData(prev => prev ? { ...prev, attributes: [...prev.attributes, newAttribute] } : null);
  };

  // Handle updating an attribute field
  const updateAttribute = (id: number, field: keyof ProductAttribute, value: any) => {
    if (!productData) return;
    setProductData(prev => prev ? {
      ...prev,
      attributes: prev.attributes.map(attr => {
        if (attr.id === id) {
          const newAttr = { ...attr, [field]: value };
          if (field === 'type') {
            newAttr.required = value === AttributeType.BASIC;
          }
          return newAttr;
        }
        return attr;
      })
    } : null);
  };

  // Handle removing an attribute row
  const removeAttribute = (id: number) => {
    if (!productData) return;
    setProductData(prev => prev ? { ...prev, attributes: prev.attributes.filter(attr => attr.id !== id) } : null);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-lg">Đang tải dữ liệu sản phẩm...</div>
      </div>
    );
  }

  if (!productData) {
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
        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={productData.productName}
          onChange={(e) => handleUpdateField('productName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="Nhập tên sản phẩm"
        />
      </div>

      {/* Giá bán & Hạn sử dụng */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700">Giá bán</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              value={productData.price}
              onChange={(e) => handleUpdateField('price', parseInt(e.target.value))}
              className="block w-full pl-10 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">VND</span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700">Hạn sử dụng</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              value={productData.expiryValue}
              onChange={(e) => handleUpdateField('expiryValue', e.target.value)}
              className="block w-full flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Nhập số"
            />
            <select
              value={productData.expiryUnit}
              onChange={(e) => handleUpdateField('expiryUnit', e.target.value)}
              className="rounded-r-md cursor-pointer border-l-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border bg-gray-50"
            >
              <option>Giờ</option>
              <option>Ngày</option>
              <option>Tuần</option>
              <option>Tháng</option>
              <option>Năm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mã GTIN */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Mã GTIN</label>
        <input
          type="text"
          value={productData.gtin}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length <= 14) {
              handleUpdateField('gtin', value);
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="Nhập mã GTIN (tối đa 14 ký tự số)"
          maxLength={14}
        />
      </div>

      {/* Ảnh */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ảnh <span className="text-red-500">*</span></label>
        <div className="mt-1 w-full sm:w-2/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
          <label htmlFor="profile-image-upload" className="cursor-pointer text-center">
            <Upload size={24} className="mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">Tải lên file</span>
              <span className="block">hoặc kéo và thả vào đây</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (tối đa 20MB/ ảnh)</p>
            <input
              id="profile-image-upload"
              name="profile-image-upload"
              type="file"
              className="sr-only"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'profileImage')}
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {productData.profileImages.map((image, index) => (
            <div key={index} className="relative group">
              <img src={image.src} alt={image.alt} className="w-24 h-24 object-cover rounded-md" />
              <button
                onClick={() => removeFile(image.src, 'profileImage')}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
        <textarea
          value={productData.description}
          onChange={(e) => handleUpdateField('description', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="Nhập mô tả sản phẩm"
        />
      </div>

      {/* Danh sách thuộc tính */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-800">Danh sách thuộc tính</h3>
          <button
            type="button"
            onClick={addAttribute}
            className="flex cursor-pointer items-center text-sm text-blue-600 hover:text-blue-800 transition duration-200"
          >
            <PlusCircle size={16} className="mr-1" />
            Thêm thuộc tính
          </button>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Loại thuộc tính</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bắt buộc</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productData.attributes.map((attr, index) => (
                <tr key={attr.id}>
                  <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={attr.name}
                      onChange={(e) => updateAttribute(attr.id, 'name', e.target.value)}
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={attr.unit}
                      onChange={(e) => updateAttribute(attr.id, 'unit', e.target.value)}
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={attr.value}
                      onChange={(e) => updateAttribute(attr.id, 'value', e.target.value)}
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={attr.type}
                      onChange={(e) => updateAttribute(attr.id, 'type', e.target.value as AttributeType)}
                      className="w-full cursor-pointer text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
                    >
                      <option>{AttributeType.BASIC}</option>
                      <option>{AttributeType.ACTIVE}</option>
                      <option>{AttributeType.BUSINESS}</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={attr.required}
                      onChange={(e) => updateAttribute(attr.id, 'required', e.target.checked)}
                      disabled={attr.type === AttributeType.BASIC}
                      className="rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => removeAttribute(attr.id)} className="text-red-500 cursor-pointer hover:text-red-700">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Card view for mobile/tablet screens */}
        <div className="block sm:hidden space-y-4">
          {productData.attributes.map((attr, index) => (
            <div key={attr.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-blue-600">Thuộc tính #{index + 1}</span>
                <button onClick={() => removeAttribute(attr.id)} className="text-gray-500 hover:text-red-600 transition duration-200">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="mt-3 space-y-4">
                {/* Tên thuộc tính */}
                <div>
                  <label className="block text-xs font-medium text-gray-500">Tên thuộc tính</label>
                  <input
                    type="text"
                    value={attr.name}
                    onChange={(e) => updateAttribute(attr.id, 'name', e.target.value)}
                    className="mt-1 w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    placeholder="Nhập tên thuộc tính"
                  />
                </div>
                {/* Đơn vị tính */}
                <div>
                  <label className="block text-xs font-medium text-gray-500">Đơn vị tính</label>
                  <input
                    type="text"
                    value={attr.unit}
                    onChange={(e) => updateAttribute(attr.id, 'unit', e.target.value)}
                    className="mt-1 w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    placeholder="Nhập đơn vị"
                  />
                </div>
                {/* Giá trị */}
                <div>
                  <label className="block text-xs font-medium text-gray-500">Giá trị</label>
                  <input
                    type="text"
                    value={attr.value}
                    onChange={(e) => updateAttribute(attr.id, 'value', e.target.value)}
                    className="mt-1 w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    placeholder="Nhập giá trị"
                  />
                </div>
                {/* Loại thuộc tính */}
                <div>
                  <label className="block text-xs font-medium text-gray-500">Loại thuộc tính</label>
                  <select
                    value={attr.type}
                    onChange={(e) => updateAttribute(attr.id, 'type', e.target.value as AttributeType)}
                    className="mt-1 w-full cursor-pointer text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  >
                    <option>{AttributeType.BASIC}</option>
                    <option>{AttributeType.ACTIVE}</option>
                    <option>{AttributeType.BUSINESS}</option>
                  </select>
                </div>
                {/* Bắt buộc */}
                <div className="flex items-center pt-2 border-t border-gray-100 mt-4">
                  <input
                    id={`required-${attr.id}`}
                    type="checkbox"
                    checked={attr.required}
                    onChange={(e) => updateAttribute(attr.id, 'required', e.target.checked)}
                    disabled={attr.type === AttributeType.BASIC}
                    className="rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <label htmlFor={`required-${attr.id}`} className="ml-2 block text-sm text-gray-900">Bắt buộc</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả sản phẩm</label>
        <textarea
          value={productData.productDescription}
          onChange={(e) => handleUpdateField('productDescription', e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="Nhập mô tả chi tiết sản phẩm"
        />
      </div>
      {/* Ảnh */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ảnh</label>
        <div className="mt-1 w-full sm:w-2/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
          <label htmlFor="intro-image-upload" className="cursor-pointer text-center">
            <Upload size={24} className="mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">Tải lên file</span>
              <span className="block">hoặc kéo và thả vào đây</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (tối đa 20MB/ ảnh)</p>
            <input
              id="intro-image-upload"
              name="intro-image-upload"
              type="file"
              className="sr-only"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'introImage')}
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {productData.introImages.map((image, index) => (
            <div key={index} className="relative group">
              <img src={image.src} alt={image.alt} className="w-24 h-24 object-cover rounded-md" />
              <button
                onClick={() => removeFile(image.src, 'introImage')}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Video */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Video</label>
        <div className="mt-1 w-full sm:w-2/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
          <label htmlFor="intro-video-upload" className="cursor-pointer text-center">
            <Upload size={24} className="mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">Tải lên file</span>
              <span className="block">hoặc kéo và thả vào đây</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">MP4, MOV (tối đa 200MB)</p>
            <input
              id="intro-video-upload"
              name="intro-video-upload"
              type="file"
              className="sr-only"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'introVideo')}
            />
          </label>
        </div>
        {productData.introVideoSrc && (
          <div className="mt-3 relative group">
            <video controls src={productData.introVideoSrc} className="w-48 h-auto rounded-md"></video>
            <button
              onClick={() => removeFile(productData.introVideoSrc!, 'introVideo')}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-grow bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Cập nhật sản phẩm</h1>
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
        <button
          type="button"
          onClick={handleConfirm}
          className="flex cursor-pointer items-center px-4 py-2 sm:px-6 sm:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <CheckCircle size={20} className="mr-2" />
          Xác nhận
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-600 bg-opacity-75 transition-opacity">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 transform transition-all">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Xác nhận cập nhật</h3>
              <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Bạn có chắc chắn muốn cập nhật sản phẩm này không?
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`flex items-center p-4 rounded-lg shadow-lg text-sm text-white
              ${toastMessage.includes('thành công') ? 'bg-green-500' : 'bg-red-500'}`}
          >
            <CheckCircle size={20} className="mr-2" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProductPage;
