import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  PlusCircle,
  X,
  ChevronLeft,
  CheckCircle,
  Upload,
  Bold,
  Italic,
  List,
  ListOrdered,
  DollarSign,
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

const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form states for "HỒ SƠ" tab
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [expiryValue, setExpiryValue] = useState('');
  const [expiryUnit, setExpiryUnit] = useState('Ngày');
  const [gtin, setGtin] = useState('');
  const [profileImages, setProfileImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);

  // Form states for "GIỚI THIỆU" tab
  const [productDescription, setProductDescription] = useState('');
  const [introImages, setIntroImages] = useState<File[]>([]);
  const [introVideo, setIntroVideo] = useState<File | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // TipTap editor hook
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: productDescription,
    onUpdate: ({ editor }) => {
      // Update the state with the HTML content from the editor
      setProductDescription(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none p-4 min-h-[200px] border rounded-md border-gray-300',
      },
    },
  });

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

  // Handle "Quay lại" button click
  const handleGoBack = () => {
    // navigate to the previous screen, likely the product list
    navigate('/production-entity/products');
  };

  // Handle form submission
  const handleConfirm = () => {
    // Validate required fields only in "HỒ SƠ" tab
    if (!productName || profileImages.length === 0) {
      setToastMessage('Vui lòng điền đầy đủ các trường bắt buộc (*) ở tab HỒ SƠ.');
      setShowToast(true);
      return;
    }
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  // Final submission after modal confirmation
  const handleFinalSubmit = () => {
    // Logic to save the new product data
    console.log('Product Data:', {
      productName,
      price,
      expiry: `${expiryValue} ${expiryUnit}`,
      gtin,
      profileImages,
      description,
      productDescription,
      introImages,
      introVideo
    });

    // Close modal and show success toast
    setShowConfirmModal(false);
    setToastMessage('Thêm mới sản phẩm thành công!');
    setShowToast(true);

    // Redirect to product list page after a delay
    setTimeout(() => {
      navigate('/production-entity/products');
    }, 2000);
  };

  // Handle file uploads with size validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'profileImage' | 'introImage' | 'introVideo') => {
    if (!e.target.files) return;

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
      setProfileImages(prev => [...prev, ...validFiles]);
    } else if (fileType === 'introImage') {
      setIntroImages(prev => [...prev, ...validFiles]);
    } else if (fileType === 'introVideo') {
      // Only allow one video file
      setIntroVideo(validFiles[0]);
    }
  };

  const removeFile = (fileToRemove: File, fileType: 'profileImage' | 'introImage' | 'introVideo') => {
    if (fileType === 'profileImage') {
      setProfileImages(prev => prev.filter(file => file !== fileToRemove));
    } else if (fileType === 'introImage') {
      setIntroImages(prev => prev.filter(file => file !== fileToRemove));
    } else if (fileType === 'introVideo') {
      setIntroVideo(null);
    }
  };

  // Handle adding a new attribute row
  const addAttribute = () => {
    const newAttribute: ProductAttribute = {
      id: attributes.length + 1,
      name: '',
      unit: '',
      value: '',
      type: AttributeType.BASIC,
      required: true,
    };
    setAttributes([...attributes, newAttribute]);
  };

  // Handle updating an attribute field
  const updateAttribute = (id: number, field: keyof ProductAttribute, value: any) => {
    setAttributes(attributes.map(attr => {
      if (attr.id === id) {
        const newAttr = { ...attr, [field]: value };
        // Logic for required checkbox based on attribute type
        if (field === 'type') {
          newAttr.required = value === AttributeType.BASIC;
        }
        return newAttr;
      }
      return attr;
    }));
  };

  // Handle removing an attribute row
  const removeAttribute = (id: number) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };

  const MenuBar = () => {
    if (!editor) {
      return null;
    }
    return (
      <div className="flex items-center flex-wrap gap-2 p-2 border-b rounded-t-md border-gray-300 bg-gray-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-md ${editor.isActive('bold') ? 'bg-blue-200 text-blue-800' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md ${editor.isActive('italic') ? 'bg-blue-200 text-blue-800' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md ${editor.isActive('bulletList') ? 'bg-blue-200 text-blue-800' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md ${editor.isActive('orderedList') ? 'bg-blue-200 text-blue-800' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <ListOrdered size={16} />
        </button>
      </div>
    );
  };


  const renderProfileTab = () => (
    <div className="space-y-6 pb-24">
      {/* Tên sản phẩm */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="Nhập tên sản phẩm"
        />
      </div>

      {/* Giá bán & Hạn sử dụng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Giá bán</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full pl-10 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">VND</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hạn sử dụng</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              value={expiryValue}
              onChange={(e) => setExpiryValue(e.target.value)}
              className="block w-full flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Nhập số"
            />
            <select
              value={expiryUnit}
              onChange={(e) => setExpiryUnit(e.target.value)}
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
          value={gtin}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length <= 14) {
              setGtin(value);
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
        <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
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
          {profileImages.map((file, index) => (
            <div key={index} className="relative group">
              <img src={URL.createObjectURL(file)} alt={`profile-${index}`} className="w-24 h-24 object-cover rounded-md" />
              <button
                onClick={() => removeFile(file, 'profileImage')}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <div className="overflow-x-auto rounded-lg border border-gray-200">
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
              {attributes.map((attr, index) => (
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
                      onChange={(e) => updateAttribute(attr.id, 'type', e.target.value)}
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
      </div>
    </div>
  );

  const renderIntroductionTab = () => (
    <div className="space-y-6 pb-24">
      {/* Mô tả sản phẩm (Rich Text Editor with TipTap) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả sản phẩm</label>
        {editor && <MenuBar />}
        <EditorContent editor={editor} />
      </div>
      {/* Ảnh */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ảnh</label>
        <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
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
          {introImages.map((file, index) => (
            <div key={index} className="relative group">
              <img src={URL.createObjectURL(file)} alt={`intro-${index}`} className="w-24 h-24 object-cover rounded-md" />
              <button
                onClick={() => removeFile(file, 'introImage')}
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
        <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
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
        {introVideo && (
          <div className="mt-3 relative group">
            <video controls src={URL.createObjectURL(introVideo)} className="w-48 h-auto rounded-md"></video>
            <button
              onClick={() => removeFile(introVideo, 'introVideo')}
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
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-grow bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Thêm mới sản phẩm</h1>
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
          className="flex items-center cursor-pointer px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ChevronLeft size={20} className="mr-2" />
          Quay lại
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex cursor-pointer items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              <h3 className="text-lg font-medium text-gray-900">Xác nhận thêm mới</h3>
              <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Bạn có chắc chắn muốn thêm mới sản phẩm này không?
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

export default NewProductPage;

