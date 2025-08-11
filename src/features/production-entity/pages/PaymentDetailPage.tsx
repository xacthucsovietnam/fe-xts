import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, CreditCard, FileText, XCircle, CheckCircle, X } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

// Định nghĩa kiểu dữ liệu cho thanh toán và dịch vụ
interface Service {
  id: number;
  name: string;
  type: string;
  params: string;
  quantity: number;
  price: string;
}

interface Payment {
  id: number;
  orderCode: string;
  amount: string;
  createdAt: string;
  paidAt: string | null;
  creator: string;
  status: 'Chờ thanh toán' | 'Chờ duyệt' | 'Đồng ý' | 'Từ chối';
  note: string;
  cancellationReason: string | null;
  services: Service[];
}

// Dữ liệu mock để minh họa
const mockPayments: Payment[] = [
  {
    id: 1,
    orderCode: 'DH-12345',
    amount: '500.000 VNĐ',
    createdAt: '2023-10-27 10:00',
    paidAt: null,
    creator: 'Nguyễn Văn A',
    status: 'Chờ thanh toán',
    note: 'Đơn hàng mua 1 gói dịch vụ cơ bản.',
    cancellationReason: null,
    services: [
      { id: 101, name: 'Gói cơ bản', type: 'Dịch vụ hệ thống', params: '1 năm', quantity: 1, price: '500000' },
    ],
  },
  {
    id: 2,
    orderCode: 'DH-12346',
    amount: '1.200.000 VNĐ',
    createdAt: '2023-10-26 15:30',
    paidAt: '2023-10-26 16:00',
    creator: 'Trần Thị B',
    status: 'Đồng ý',
    note: 'Đơn hàng thanh toán 2 gói dịch vụ.',
    cancellationReason: null,
    services: [
      { id: 102, name: 'Gói nâng cao', type: 'Dịch vụ hệ thống', params: '1 năm', quantity: 1, price: '800000' },
      { id: 103, name: 'Gói mở rộng', type: 'Dịch vụ hệ thống', params: '3 tháng', quantity: 1, price: '400000' },
    ],
  },
  {
    id: 3,
    orderCode: 'DH-12347',
    amount: '750.000 VNĐ',
    createdAt: '2023-10-25 09:15',
    paidAt: null,
    creator: 'Phạm Văn C',
    status: 'Từ chối',
    note: 'Thanh toán không thành công, chờ xử lý.',
    cancellationReason: 'Thông tin thanh toán không hợp lệ.',
    services: [
      { id: 104, name: 'Gói tiêu chuẩn', type: 'Dịch vụ hệ thống', params: '6 tháng', quantity: 1, price: '750000' },
    ],
  },
  {
    id: 4,
    orderCode: 'DH-12348',
    amount: '2.500.000 VNĐ',
    createdAt: '2023-10-24 11:45',
    paidAt: null,
    creator: 'Lê Thị D',
    status: 'Chờ duyệt',
    note: 'Đang chờ duyệt thanh toán từ ban quản lý.',
    cancellationReason: null,
    services: [
      { id: 105, name: 'Gói cao cấp', type: 'Dịch vụ hệ thống', params: '2 năm', quantity: 1, price: '2500000' },
    ],
  },
];

// Helper function để parse giá tiền từ string "500000" sang number
const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/\D/g, ''), 10) || 0;
};

// Component để xem trước hóa đơn
const InvoicePreviewModal: React.FC<{ onClose: () => void; invoiceUrl: string }> = ({ onClose, invoiceUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-lg p-2 w-full max-w-5xl h-5/6">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-xl font-semibold text-gray-800">Xem trước hóa đơn</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="w-full h-full p-2">
          <iframe
            src={invoiceUrl}
            title="Invoice Preview"
            className="w-full h-full rounded-lg border border-gray-300"
          >
            Trình duyệt của bạn không hỗ trợ iframe.
          </iframe>
        </div>
      </div>
    </div>
  );
};

const PaymentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoicePreviewOpen, setIsInvoicePreviewOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'Chờ thanh toán' | 'Chờ duyệt' | 'Đồng ý' | 'Từ chối'>('Chờ thanh toán');

  useEffect(() => {
    const foundPayment = mockPayments.find(p => p.id === parseInt(id || '0'));
    if (foundPayment) {
      setPayment(foundPayment);
      setCurrentStatus(foundPayment.status);
    } else {
      setPayment(null);
    }
  }, [id]);

  if (!payment) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Không tìm thấy thông tin thanh toán.
      </div>
    );
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Chờ thanh toán':
      case 'Chờ duyệt':
        return <XCircle size={20} className="text-yellow-500" />;
      case 'Đồng ý':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'Từ chối':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/production-entity/payment/edit/${payment.id}`);
  };

  const handlePay = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    console.log("Thanh toán thành công. Cập nhật trạng thái.");
    setCurrentStatus('Chờ duyệt');
    setIsPaymentModalOpen(false);
  };

  const handleViewInvoice = () => {
    setIsInvoicePreviewOpen(true);
  };

  const totalAmount = payment.services.reduce((sum, service) => {
    const priceAsNumber = parsePrice(service.price);
    return sum + priceAsNumber * service.quantity;
  }, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="ml-2 font-medium">Quay lại</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b pb-6 mb-6">
            <div className="flex items-center mb-4 lg:mb-0">
              {getStatusIcon(currentStatus)}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 ml-3">
                Chi tiết thanh toán
              </h1>
              <span className={`ml-4 py-1 px-3 rounded-full text-sm font-semibold ${getStatusClasses(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {currentStatus === 'Chờ thanh toán' && (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center cursor-pointer justify-center px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors shadow-sm"
                  >
                    <Edit2 size={18} className="mr-2" />
                    Sửa
                  </button>
                  <button
                    onClick={handlePay}
                    className="flex items-center cursor-pointer justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <CreditCard size={18} className="mr-2" />
                    Thanh toán
                  </button>
                </>
              )}
              {currentStatus === 'Đồng ý' && (
                <button
                  onClick={handleViewInvoice}
                  className="flex items-center cursor-pointer justify-center px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-lg"
                >
                  <FileText size={18} className="mr-2" />
                  Xem hóa đơn
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Thông tin đơn hàng</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Mã đơn hàng:</span>
                    <span className="font-bold text-gray-900">{payment.orderCode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Thời gian tạo:</span>
                    <span className="font-medium text-gray-900">{payment.createdAt}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Người tạo:</span>
                    <span className="font-medium text-gray-900">{payment.creator}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Thời gian thanh toán:</span>
                    <span className="font-medium text-gray-900">{payment.paidAt || 'Chưa thanh toán'}</span>
                  </div>
                  {payment.cancellationReason && (
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-1">Lý do hủy:</span>
                      <span className="font-medium text-red-600">{payment.cancellationReason}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-inner">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Danh sách dịch vụ</h2>
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                          Tên gói
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Loại gói
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Tham số
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                          Giá tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payment.services.map((service) => (
                        <tr key={service.id}>
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">{service.type}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{service.params}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">{service.quantity}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold text-blue-600">{formatPrice(parsePrice(service.price))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-blue-600 text-white rounded-xl p-6 shadow-xl flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium opacity-80">Tổng số tiền</p>
                <p className="text-5xl font-bold mt-2">{formatPrice(totalAmount)}</p>
                <p className="text-sm mt-4 text-center opacity-70">
                  Vui lòng thanh toán để đơn hàng được xử lý.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPaymentModalOpen && payment && (
        <PaymentModal
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          orderCode={payment.orderCode}
          totalAmount={totalAmount}
        />
      )}

      {isInvoicePreviewOpen && (
        <InvoicePreviewModal
          onClose={() => setIsInvoicePreviewOpen(false)}
          invoiceUrl={"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"} // URL demo cho file PDF
        />
      )}
    </div>
  );
};

export default PaymentDetailPage;

