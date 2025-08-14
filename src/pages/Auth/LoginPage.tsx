import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ZaloLogo from '../../assets/zalo-logo.png'; // Đảm bảo đường dẫn đúng
import Logo from '../../assets/logo.png'; // Đảm bảo đường dẫn đúng
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ title: string; content: string; type: 'success' | 'warning' | 'error' } | null>(null);

  // Dữ liệu cho toast message thành công
  const successToastTitle = 'Đã gửi đường dẫn!';
  const successToastContent = 'Vui lòng kiểm tra hộp thư để hoàn tất đăng nhập.';

  // Dữ liệu cho toast message cảnh báo
  const warningToastTitle = 'Cảnh báo';
  const warningToastContent = 'Bạn vui lòng đồng ý với điều khoản dịch vụ và chính sách bảo mật của hệ thống trước khi thực hiện đăng nhập';

  // Dữ liệu cho toast message lỗi
  const errorToastContent = 'Vui lòng nhập email.';

  const handleShowToast = (title: string, content: string, type: 'success' | 'warning' | 'error') => {
    setToast({ title, content, type });
    setTimeout(() => setToast(null), 5000);
  };

  /**
   * Xử lý sự kiện click cho nút đăng nhập Zalo.
   * Hiển thị cảnh báo nếu chưa đồng ý, ngược lại chuyển hướng.
   */
  const handleZaloLogin = () => {
    if (!agreed) {
      handleShowToast(warningToastTitle, warningToastContent, 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/personal-space');
    }, 1500);
  };

  /**
   * Xử lý sự kiện click cho nút "Gửi đường dẫn đăng nhập".
   * Hiển thị cảnh báo nếu chưa đồng ý hoặc email trống, sau đó mô phỏng gửi email.
   */
  const handleSendLoginLink = () => {
    if (!agreed) {
      handleShowToast(warningToastTitle, warningToastContent, 'warning');
      return;
    }
    if (!email) {
      // Thay đổi toast thành cảnh báo và sử dụng dữ liệu của warningToast
      handleShowToast(warningToastTitle, errorToastContent, 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleShowToast(successToastTitle, successToastContent, 'success');
      console.log(`Đường dẫn đăng nhập đã được gửi đến: ${email}`);
    }, 1500);
  };

  const getToastColor = (type: 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getToastIcon = (type: 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6" />;
      case 'error':
        return <X className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  return (
    <div className="flex items-center justify-center pb-24">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:max-w-sm flex items-start bg-white rounded-lg shadow-xl overflow-hidden">
          <div className={`flex items-center justify-center p-4 text-white rounded-l-lg ${getToastColor(toast.type)}`}>
            {getToastIcon(toast.type)}
          </div>
          <div className="p-4 flex-grow">
            <p className="font-bold text-lg text-gray-900">{toast.title}</p>
            <p className="text-sm text-gray-600">{toast.content}</p>
          </div>
          <button onClick={() => setToast(null)} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Container của form */}
      <div className="w-full max-w-sm bg-white rounded-lg overflow-y-auto max-h-[95vh]">

        {/* Tiêu đề trang */}
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-xl font-bold text-gray-800 text-center">Tạo / Đăng nhập</h1>
        </div>

        {/* Logo và Chào mừng */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-auto mb-4" />
          <p className="text-sm text-gray-500 text-center font-semibold mb-1">
            Điểm tựa niềm tin
          </p>
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Chào mừng đến với Xác Thực Số
          </h2>
        </div>
        <div className="mt-6 mb-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mt-1"
            />
            <label className="ml-2 block text-sm text-gray-600">
              Bằng việc tiếp tục, bạn đồng ý với <a href="#" className="text-blue-600 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a> của hệ thống.
            </label>
          </div>
        </div>


        {/* Nút Đăng nhập bằng Zalo */}
        <button
          onClick={handleZaloLogin}
          className={`flex items-center justify-center w-full px-4 py-2 mb-4 text-white rounded-lg transition-colors duration-200 ${agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
            }`}
          disabled={loading}
        >
          <img src={ZaloLogo} alt="Zalo Logo" className="h-6 w-6 mr-2" />
          <span className="text-base font-semibold">Tiếp tục với Zalo</span>
        </button>

        {/* Hoặc */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-black-400" />
          <span className="px-4 text-black-700">hoặc</span>
          <hr className="flex-grow border-t border-black-400" />
        </div>

        {/* Input Email và Nút "Gửi đường dẫn đăng nhập" */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email ..."
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <button
          onClick={handleSendLoginLink}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-200 ${agreed && email ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Gửi đường dẫn đăng nhập'
          )}
        </button>

        {/* Lưu ý và Checkbox */}
        <div className="mt-6 mb-4">
          <p className="text-sm text-red-600 mb-2">
            Vui lòng đồng ý với điều khoản và chính sách của chúng tôi để thực hiện đăng nhập
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
