import React, { useState } from 'react';
import { CreditCard, Eye, Edit2, Search, ChevronLeft, ChevronRight, ChevronDown, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu mock để minh họa
const payments = [
  {
    id: 1,
    orderCode: 'DH-12345',
    amount: '500.000 VNĐ',
    createdAt: '2023-10-27 10:00',
    paidAt: null,
    creator: 'Nguyễn Văn A',
    status: 'Chờ thanh toán',
  },
  {
    id: 2,
    orderCode: 'DH-12346',
    amount: '1.200.000 VNĐ',
    createdAt: '2023-10-26 15:30',
    paidAt: '2023-10-26 16:00',
    creator: 'Trần Thị B',
    status: 'Đồng ý',
  },
  {
    id: 3,
    orderCode: 'DH-12347',
    amount: '750.000 VNĐ',
    createdAt: '2023-10-25 09:15',
    paidAt: null,
    creator: 'Phạm Văn C',
    status: 'Từ chối',
  },
  {
    id: 4,
    orderCode: 'DH-12348',
    amount: '2.500.000 VNĐ',
    createdAt: '2023-10-24 11:45',
    paidAt: null,
    creator: 'Lê Thị D',
    status: 'Chờ duyệt',
  },
  {
    id: 5,
    orderCode: 'DH-12349',
    amount: '1.500.000 VNĐ',
    createdAt: '2023-10-23 14:20',
    paidAt: '2023-10-23 15:00',
    creator: 'Nguyễn Văn E',
    status: 'Đồng ý',
  },
  {
    id: 6,
    orderCode: 'DH-12350',
    amount: '300.000 VNĐ',
    createdAt: '2023-10-22 18:00',
    paidAt: null,
    creator: 'Trần Thị F',
    status: 'Chờ thanh toán',
  },
  {
    id: 7,
    orderCode: 'DH-12351',
    amount: '900.000 VNĐ',
    createdAt: '2023-10-21 08:00',
    paidAt: null,
    creator: 'Phạm Văn G',
    status: 'Chờ duyệt',
  },
  {
    id: 8,
    orderCode: 'DH-12352',
    amount: '1.800.000 VNĐ',
    createdAt: '2023-10-20 12:00',
    paidAt: '2023-10-20 12:30',
    creator: 'Lê Thị H',
    status: 'Đồng ý',
  },
];

const itemsPerPage = 5;

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Hàm để lấy lớp CSS cho trạng thái
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Chờ thanh toán':
        return 'bg-yellow-100 text-yellow-800';
      case 'Chờ duyệt':
        return 'bg-blue-100 text-blue-800';
      case 'Đồng ý':
        return 'bg-green-100 text-green-800';
      case 'Từ chối':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Hàm xử lý khi nhấp vào nút "Đơn hàng mới"
  const handleNewOrder = () => {
    // Điều hướng đến trang tạo đơn hàng mới
    navigate('/production-entity/payment/new');
  };

  const handleViewDetails = (id: number) => {
    navigate(`/production-entity/payment/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/production-entity/payment/edit/${id}`);
  };

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Tiêu đề trang và nút Đơn hàng mới */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CreditCard size={24} className="mr-2 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Danh sách thanh toán</h1>
        </div>
        <button
          onClick={handleNewOrder}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          <PlusCircle size={16} />
          Đơn hàng mới
        </button>
      </div>

      {/* Bộ lọc và Tìm kiếm */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Tìm kiếm mã đơn hàng..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <select
              className="appearance-none cursor-pointer w-full sm:w-auto px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Chờ thanh toán">Chờ thanh toán</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Đồng ý">Đồng ý</option>
              <option value="Từ chối">Từ chối</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input
              type="date"
              className="w-full cursor-pointer sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bảng danh sách thanh toán */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                STT
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Số tiền
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                Thời gian tạo
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                Thời gian thanh toán
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                Người tạo
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="py-3 px-2 sm:px-4 border-b-2 border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm">{indexOfFirstItem + index + 1}</td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm font-medium text-gray-900">{payment.orderCode}</td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm text-gray-700">{payment.amount}</td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm text-gray-500 hidden md:table-cell">{payment.createdAt}</td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm text-gray-500 hidden lg:table-cell">{payment.paidAt || 'N/A'}</td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm text-gray-700 hidden sm:table-cell">{payment.creator}</td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm">
                  <span className={`py-1 px-2 sm:px-3 rounded-full text-xs font-semibold ${getStatusClasses(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-200 text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Nút xem chi tiết - hiển thị mọi lúc */}
                    <button
                      onClick={() => handleViewDetails(payment.id)}
                      className="p-1 cursor-pointer sm:p-2 text-blue-600 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      aria-label="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    {/* Nút sửa - chỉ hiển thị khi trạng thái là "Chờ thanh toán" */}
                    {payment.status === 'Chờ thanh toán' && (
                      <button
                        onClick={() => handleEdit(payment.id)}
                        className="p-1 cursor-pointer sm:p-2 text-green-600 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        aria-label="Sửa"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, payments.length)} trên {payments.length} kết quả
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 cursor-pointer border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Trang trước"
          >
            <ChevronLeft size={16} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`p-2 border cursor-pointer rounded-lg text-sm transition-colors ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 cursor-pointer border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Trang tiếp"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
