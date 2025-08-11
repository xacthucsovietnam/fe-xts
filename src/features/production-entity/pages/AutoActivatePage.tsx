import React, { useState, useMemo } from 'react';
import { PlusCircle, Eye, Pencil, Search, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho một mục kích hoạt tự động
interface AutoActivateItem {
  id: string;
  productCode: string;
  productName: string;
  activationType: 'Tương lai' | 'Quá khứ';
  activationTransferTime: number; // Thời điểm chuyển kích hoạt (giờ)
  semiAutoTransferTime: number; // Chuyển bán tự động (giờ)
  status: 'Đang hoạt động' | 'Khóa';
}

// Dữ liệu giả lập
const mockData: AutoActivateItem[] = [
  {
    id: '1',
    productCode: 'SP001',
    productName: 'Sản phẩm 1',
    activationType: 'Tương lai',
    activationTransferTime: 24,
    semiAutoTransferTime: 12,
    status: 'Đang hoạt động',
  },
  {
    id: '2',
    productCode: 'SP002',
    productName: 'Sản phẩm 2',
    activationType: 'Quá khứ',
    activationTransferTime: 48,
    semiAutoTransferTime: 24,
    status: 'Khóa',
  },
  {
    id: '3',
    productCode: 'SP003',
    productName: 'Sản phẩm 3',
    activationType: 'Tương lai',
    activationTransferTime: 72,
    semiAutoTransferTime: 36,
    status: 'Đang hoạt động',
  },
  {
    id: '4',
    productCode: 'SP004',
    productName: 'Sản phẩm 4',
    activationType: 'Quá khứ',
    activationTransferTime: 12,
    semiAutoTransferTime: 6,
    status: 'Đang hoạt động',
  },
  {
    id: '5',
    productCode: 'SP005',
    productName: 'Sản phẩm 5',
    activationType: 'Tương lai',
    activationTransferTime: 24,
    semiAutoTransferTime: 12,
    status: 'Khóa',
  },
  {
    id: '6',
    productCode: 'SP006',
    productName: 'Sản phẩm 6',
    activationType: 'Tương lai',
    activationTransferTime: 30,
    semiAutoTransferTime: 15,
    status: 'Đang hoạt động',
  },
  {
    id: '7',
    productCode: 'SP007',
    productName: 'Sản phẩm 7',
    activationType: 'Quá khứ',
    activationTransferTime: 60,
    semiAutoTransferTime: 30,
    status: 'Đang hoạt động',
  },
  {
    id: '8',
    productCode: 'SP008',
    productName: 'Sản phẩm 8',
    activationType: 'Tương lai',
    activationTransferTime: 18,
    semiAutoTransferTime: 9,
    status: 'Khóa',
  },
  {
    id: '9',
    productCode: 'SP009',
    productName: 'Sản phẩm 9',
    activationType: 'Tương lai',
    activationTransferTime: 96,
    semiAutoTransferTime: 48,
    status: 'Đang hoạt động',
  },
  {
    id: '10',
    productCode: 'SP010',
    productName: 'Sản phẩm 10',
    activationType: 'Quá khứ',
    activationTransferTime: 12,
    semiAutoTransferTime: 6,
    status: 'Đang hoạt động',
  },
];

const itemsPerPage = 5;

const AutoActivatePage: React.FC = () => {
  // State cho bộ lọc và phân trang
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu dựa trên searchTerm
  const filteredData = useMemo(() => {
    return mockData.filter(item =>
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Tính toán dữ liệu cho trang hiện tại
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ClipboardList size={28} className="mr-2 text-blue-600" />
          Danh sách Kích hoạt tự động
        </h1>
        <Link
          to="/production-entity/auto-activate/new" // Example new product route
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          <PlusCircle size={20} className="mr-2" />
          Thêm mới
        </Link>
      </div>

      {/* Bộ lọc tìm kiếm */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã hoặc tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Mã sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Kích hoạt tự động
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Thời điểm chuyển kích hoạt (h)
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Chuyển bán tự động (h)
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.productCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${item.activationType === 'Tương lai' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.activationType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.activationTransferTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.semiAutoTransferTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${item.status === 'Đang hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link to={`#`} title="Xem chi tiết" className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors">
                        <Eye size={18} />
                      </Link>
                      <Link to={`#`} title="Sửa" className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50 transition-colors">
                        <Pencil size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy kích hoạt tự động nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, filteredData.length)} trên tổng số {filteredData.length} mục
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 cursor-pointer rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 cursor-pointer py-2 rounded-md font-medium text-sm
                ${currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoActivatePage;
