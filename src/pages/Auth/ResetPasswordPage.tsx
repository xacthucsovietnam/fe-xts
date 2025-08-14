import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react'; // Import CheckCircle icon

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false); // State để hiển thị thông báo thành công

  // Giả định rằng token đặt lại mật khẩu sẽ được lấy từ query params (ví dụ: /reset-password?token=YOUR_TOKEN)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      setError('Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
      // Có thể chuyển hướng về trang quên mật khẩu nếu không có token
      // navigate('/forgot-password');
    } else {
      console.log('Token đặt lại mật khẩu:', token);
      // Ở đây bạn có thể gọi API để xác thực token trước khi cho phép người dùng đặt lại mật khẩu
    }
  }, [location.search, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset lỗi
    setMessage(''); // Reset thông báo

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    console.log('Đặt lại mật khẩu với mật khẩu mới:', password);
    // Gọi API để đặt lại mật khẩu với token và mật khẩu mới
    // Ví dụ: yourApi.resetPassword(token, password)
    // Sau khi thành công:
    setResetSuccess(true);
    setMessage('Mật khẩu của bạn đã được đặt lại thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.');
    setTimeout(() => {
      navigate('/'); // Chuyển về trang đăng nhập sau khi đặt lại thành công
    }, 3000); // Chuyển hướng sau 3 giây
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg max-h-[95vh] overflow-y-auto">
        
        {/* Tiêu đề trang */}
        <h1 className="text-xl font-bold text-gray-800 text-center mb-6">Đặt Lại Mật Khẩu</h1>

        {resetSuccess ? (
          <div className="flex flex-col items-center justify-center text-center">
            <CheckCircle size={64} className="text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-700 mb-2">Đặt lại mật khẩu thành công!</p>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-sm text-red-600 text-center mb-4">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    required
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu mới"
                    required
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!password || !confirmPassword || password !== confirmPassword}
                className={`w-full px-4 py-2 rounded-lg ${
                  password && confirmPassword && password === confirmPassword ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                } text-white transition-colors duration-200`}
              >
                Đặt lại mật khẩu
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
