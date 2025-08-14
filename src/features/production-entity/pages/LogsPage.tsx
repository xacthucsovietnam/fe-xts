import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  Eye,
  Pencil,
  FileText,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho nhật ký
interface Logbook {
  id: string;
  name: string;
  product: string;
  createdAt: string;
  creator: string;
  status: 'Mới tạo' | 'Đang hoạt động' | 'Khóa' | 'Hoàn thành' | 'Kết thúc';
}

// Dữ liệu nhật ký giả lập
const mockLogbooks: Logbook[] = [
  { id: '1', name: 'Nhật ký trồng lúa', product: 'Gạo ST25', createdAt: '10/08/2025', creator: 'Nguyễn Văn A', status: 'Đang hoạt động' },
  { id: '2', name: 'Nhật ký nuôi gà', product: 'Thịt gà ta', createdAt: '01/08/2025', creator: 'Trần Thị B', status: 'Hoàn thành' },
  { id: '3', name: 'Nhật ký nuôi cá', product: 'Cá tra', createdAt: '15/07/2025', creator: 'Lê Văn C', status: 'Mới tạo' },
  { id: '4', name: 'Nhật ký trồng cà phê', product: 'Cà phê rang xay', createdAt: '20/07/2025', creator: 'Nguyễn Văn A', status: 'Khóa' },
  { id: '5', name: 'Nhật ký chăm sóc vườn cây', product: 'Vải thiều', createdAt: '05/08/2025', creator: 'Trần Thị B', status: 'Kết thúc' },
  { id: '6', name: 'Nhật ký sản xuất sữa', product: 'Sữa tươi', createdAt: '08/08/2025', creator: 'Phạm Văn D', status: 'Đang hoạt động' },
  { id: '7', name: 'Nhật ký sản xuất sữa', product: 'Sữa tươi', createdAt: '08/08/2025', creator: 'Phạm Văn D', status: 'Đang hoạt động' },
  { id: '8', name: 'Nhật ký sản xuất sữa', product: 'Sữa tươi', createdAt: '08/08/2025', creator: 'Phạm Văn D', status: 'Đang hoạt động' },
  { id: '9', name: 'Nhật ký sản xuất sữa', product: 'Sữa tươi', createdAt: '08/08/2025', creator: 'Phạm Văn D', status: 'Đang hoạt động' },
  { id: '10', name: 'Nhật ký sản xuất sữa', product: 'Sữa tươi', createdAt: '08/08/2025', creator: 'Phạm Văn D', status: 'Đang hoạt động' },
  { id: '11', name: 'Nhật ký sản xuất sữa', product: 'Sữa tươi', createdAt: '08/08/2025', creator: 'Phạm Văn D', status: 'Đang hoạt động' },
];

const LogsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const filteredLogbooks = mockLogbooks.filter(logbook =>
    logbook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    logbook.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    logbook.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogbooks.length / itemsPerPage);
  const currentLogbooks = filteredLogbooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClasses = (status: Logbook['status']) => {
    switch (status) {
      case 'Mới tạo':
        return 'bg-blue-100 text-blue-800';
      case 'Đang hoạt động':
        return 'bg-green-100 text-green-800';
      case 'Khóa':
        return 'bg-red-100 text-red-800';
      case 'Hoàn thành':
        return 'bg-purple-100 text-purple-800';
      case 'Kết thúc':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header and filters for desktop */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ClipboardList size={28} className="mr-2 text-blue-600" />
          Danh sách nhật ký điện tử
        </h1>
        <Link
          to="/production-entity/logs/new"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          <PlusCircle size={20} className="mr-2" />
          Thêm mới
        </Link>
      </div>

      {/* Search filter for desktop */}
      <div className="hidden lg:block mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên nhật ký, sản phẩm hoặc người tạo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Header and New button for mobile/tablet */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <ClipboardList size={24} className="mr-2 text-blue-600" />
          Nhật ký điện tử
        </h1>
        <Link
          to="/production-entity/logs/new"
          className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          <PlusCircle size={18} className="mr-1" />
          Thêm mới
        </Link>
      </div>

      {/* Mobile search bar */}
      <div className="lg:hidden mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tên nhật ký
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Thời gian tạo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Người tạo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentLogbooks.length > 0 ? (
              currentLogbooks.map((logbook, index) => (
                <tr key={logbook.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {logbook.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {logbook.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {logbook.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {logbook.creator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(logbook.status)}`}>
                      {logbook.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* Đã sửa đường dẫn */}
                      <Link to={`/production-entity/logs/${logbook.id}/view`} title="Xem chi tiết" className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </Link>
                      <Link to={`/production-entity/logs/${logbook.id}/edit`} title="Sửa" className="text-yellow-600 hover:text-yellow-900">
                        <Pencil size={18} />
                      </Link>
                      <Link to={`/production-entity/logs/${logbook.id}/notes`} title="Ghi chép nhật ký" className="text-purple-600 hover:text-purple-900">
                        <FileText size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy nhật ký nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentLogbooks.length > 0 ? (
          currentLogbooks.map((logbook) => (
            <Link key={logbook.id} to={`/production-entity/logs/${logbook.id}/view`} className="block">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {logbook.name}
                  </span>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(logbook.status)}`}>
                    {logbook.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Sản phẩm:</strong> {logbook.product}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            Không tìm thấy nhật ký nào.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, filteredLogbooks.length)} trên tổng số {filteredLogbooks.length} mục
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

export default LogsPage;
