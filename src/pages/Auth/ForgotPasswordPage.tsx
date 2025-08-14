import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Yêu cầu đặt lại mật khẩu cho email:', email);
    // Đây là nơi bạn sẽ gửi yêu cầu đặt lại mật khẩu đến API của bạn.
    // Sau khi gửi thành công, hiển thị thông báo cho người dùng.
    setMessage('Nếu email của bạn đã đăng ký, chúng tôi đã gửi một liên kết đặt lại mật khẩu đến địa chỉ email đó. Vui lòng kiểm tra hộp thư đến của bạn.');
    // Có thể thêm logic để disabled input sau khi gửi và hiển thị lại nút gửi sau một thời gian
  };

  const handleGoBack = () => {
    navigate('/'); // Quay về trang đăng nhập
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg max-h-[95vh] overflow-y-auto">
        
        {/* Tiêu đề trang với nút quay lại */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={handleGoBack}
            className="absolute left-0 p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center">Quên Mật Khẩu</h1>
        </div>

        <p className="text-sm text-gray-600 mb-6 text-center">
          Vui lòng nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={!email}
            className={`w-full px-4 py-2 mb-4 rounded-lg ${
              email ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            } text-white transition-colors duration-200`}
          >
            Gửi yêu cầu
          </button>
        </form>

        {message && (
          <p className="text-sm text-green-600 text-center mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
