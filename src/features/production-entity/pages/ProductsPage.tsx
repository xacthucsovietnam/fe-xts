import React, { useState } from 'react';
import {
  Search,
  PlusCircle,
  Eye,
  Pencil,
  Copy,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  RefreshCcw // Use a common icon for status change
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  createdBy: string;
  status: 'active' | 'locked';
}

const mockProducts: Product[] = [
  { id: '1', code: 'SP001', name: 'Gạo ST25', createdAt: '2023-01-15', createdBy: 'John Doe', status: 'active' },
  { id: '2', code: 'SP002', name: 'Cà phê rang xay', createdAt: '2023-02-20', createdBy: 'Jane Smith', status: 'active' },
  { id: '3', code: 'SP003', name: 'Trà xanh hữu cơ', createdAt: '2023-03-10', createdBy: 'John Doe', status: 'locked' },
  { id: '4', code: 'SP004', name: 'Mật ong nguyên chất', createdAt: '2023-04-05', createdBy: 'Peter Lee', status: 'active' },
  { id: '5', code: 'SP005', name: 'Hạt điều rang muối', createdAt: '2023-05-22', createdBy: 'Jane Smith', status: 'active' },
  { id: '6', code: 'SP006', name: 'Sữa tươi thanh trùng', createdAt: '2023-06-18', createdBy: 'John Doe', status: 'locked' },
  { id: '7', code: 'SP007', name: 'Bánh gạo lứt', createdAt: '2023-07-30', createdBy: 'Peter Lee', status: 'active' },
  { id: '8', code: 'SP008', name: 'Nước ép dứa', createdAt: '2023-08-11', createdBy: 'John Doe', status: 'active' },
  { id: '9', code: 'SP009', name: 'Thịt bò tươi', createdAt: '2023-09-02', createdBy: 'Jane Smith', status: 'active' },
  { id: '10', code: 'SP010', name: 'Cá hồi tươi', createdAt: '2023-10-10', createdBy: 'Peter Lee', status: 'locked' },
];

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = (productId: string) => {
    console.log(`Thay đổi trạng thái của sản phẩm: ${productId}`);
    // Logic cập nhật trạng thái sản phẩm
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Top section with heading and add new button, responsive for mobile */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        {/* The heading is hidden on mobile and visible on desktop */}
        <h1 className="hidden lg:flex text-2xl font-bold text-gray-800 items-center">
          <ClipboardList size={28} className="mr-2 text-blue-600" />
          Danh sách sản phẩm
        </h1>
        {/* The button is full width and has increased height on mobile */}
        <Link
          to="/production-entity/products/new"
          className="flex items-center justify-center w-full lg:w-auto px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out lg:mt-0"
        >
          <PlusCircle size={20} className="mr-2" />
          Thêm mới
        </Link>
      </div>

      {/* Search filter */}
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
      
      {/* Table for desktop screens */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STT</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mã sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời gian tạo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Người tạo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {product.status === 'active' ? 'Đang hoạt động' : 'Khóa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link to={`/production-entity/products/${product.id}`} title="Xem chi tiết" className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </Link>
                      <Link to={`/production-entity/products/${product.id}/edit`} title="Sửa" className="text-yellow-600 hover:text-yellow-900">
                        <Pencil size={18} />
                      </Link>
                      <button title="Sao chép" className="text-gray-600 cursor-pointer hover:text-gray-900">
                        <Copy size={18} />
                      </button>
                      <button
                        title="Thay đổi trạng thái"
                        onClick={() => handleStatusChange(product.id)}
                        className={`${product.status === 'active' ? 'text-red-600' : 'text-green-600'} hover:opacity-75 cursor-pointer`}
                      >
                        <RefreshCcw size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile and tablet screens */}
      <div className="lg:hidden">
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {currentProducts.map((product) => (
              <Link key={product.id} to={`/production-entity/products/${product.id}`} className="block p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{product.name}</p>
                    <p className="text-md text-gray-800">{product.code}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-lg">
            Không tìm thấy sản phẩm nào.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, filteredProducts.length)} trên tổng số {filteredProducts.length} mục
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

export default ProductsPage;
