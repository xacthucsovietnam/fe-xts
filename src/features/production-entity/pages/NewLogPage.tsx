import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PlusCircle } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho form
interface NewLogbookForm {
  seasonName: string;
  producer: string;
  productionArea: string;
  productionProcess: string;
  startDate: string;
  plannedOutput: number | null;
  estimatedCost: number | null;
}

// Dữ liệu giả lập cho các SelectBox
const mockProducers = ['Nông hộ Nguyễn Văn A', 'Công ty Cổ phần Nông nghiệp Xanh', 'Hợp tác xã Nông sản An Toàn'];
const mockProductionAreas = ['Vườn Cam Đồi A (2.5 ha)', 'Khu nuôi tôm B (1 ha)', 'Trang trại bò sữa C (10 ha)'];
const mockProductionProcesses = ['Cây Ăn Quả / Cây Công nghiệp', 'Chăn nuôi', 'Nuôi trồng Thủy sản'];

const NewLogPage: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<NewLogbookForm>({
    seasonName: '',
    producer: '',
    productionArea: '',
    productionProcess: '',
    startDate: '',
    plannedOutput: null,
    estimatedCost: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'plannedOutput' || name === 'estimatedCost' ? (value ? Number(value) : null) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Thông tin nhật ký mới:', formState);
    alert('Đã gửi thông tin nhật ký mới thành công!');
    // Thêm logic để gửi dữ liệu lên server tại đây
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md w-full mx-auto">
        {/* Header cho mobile/tablet */}
        <div className="lg:hidden flex items-center p-4 border-b border-gray-200">
          <button onClick={handleBack} className="p-2 mr-2 text-gray-600 rounded-full hover:bg-gray-100 transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Tạo Mùa vụ mới</h1>
        </div>

        {/* Header cho desktop */}
        <div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Tạo Mùa vụ mới</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleBack}
              className="flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Quay lại
            </button>
          </div>
        </div>
      
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {/* Tên Mùa vụ */}
            <div className="md:col-span-2">
              <label htmlFor="seasonName" className="block text-sm font-medium text-gray-700">Tên Mùa vụ</label>
              <input
                type="text"
                id="seasonName"
                name="seasonName"
                value={formState.seasonName}
                onChange={handleChange}
                placeholder="Ví dụ: Vụ Cam sành Thu Đông 2025"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Chọn Người sản xuất */}
            <div>
              <label htmlFor="producer" className="block text-sm font-medium text-gray-700">Chọn Người sản xuất</label>
              <select
                id="producer"
                name="producer"
                value={formState.producer}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Chọn người sản xuất...</option>
                {mockProducers.map(producer => (
                  <option key={producer} value={producer}>{producer}</option>
                ))}
              </select>
            </div>

            {/* Chọn Vùng sản xuất */}
            <div>
              <label htmlFor="productionArea" className="block text-sm font-medium text-gray-700">Chọn Vùng sản xuất</label>
              <select
                id="productionArea"
                name="productionArea"
                value={formState.productionArea}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Chọn vùng sản xuất...</option>
                {mockProductionAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Chọn Quy trình Sản xuất */}
            <div>
              <label htmlFor="productionProcess" className="block text-sm font-medium text-gray-700">Chọn Quy trình Sản xuất</label>
              <select
                id="productionProcess"
                name="productionProcess"
                value={formState.productionProcess}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Chọn quy trình...</option>
                {mockProductionProcesses.map(process => (
                  <option key={process} value={process}>{process}</option>
                ))}
              </select>
            </div>
            
            {/* Ngày bắt đầu */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formState.startDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Sản lượng Kế hoạch */}
            <div>
              <label htmlFor="plannedOutput" className="block text-sm font-medium text-gray-700">Sản lượng Kế hoạch (tùy chọn)</label>
              <input
                type="number"
                id="plannedOutput"
                name="plannedOutput"
                value={formState.plannedOutput ?? ''}
                onChange={handleChange}
                placeholder="Ví dụ: 1500 (kg)"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Chi phí ước tính mỗi giờ công */}
            <div>
              <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700">Chi phí ước tính mỗi giờ công (VNĐ/h)</label>
              <input
                type="number"
                id="estimatedCost"
                name="estimatedCost"
                value={formState.estimatedCost ?? ''}
                onChange={handleChange}
                placeholder="Ví dụ: 30000"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Nút "Bắt đầu mùa vụ" cho mobile/tablet và desktop */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full cursor-pointer lg:w-auto ml-auto flex items-center justify-center py-3 px-6 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <PlusCircle size={24} className="mr-2 hidden lg:block" />
              Bắt đầu Mùa vụ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLogPage;
