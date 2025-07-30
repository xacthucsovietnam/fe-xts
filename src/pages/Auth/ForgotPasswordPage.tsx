// src/pages/Auth/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ForgotPasswordPage Component
 *
 * This component provides a user interface for recovering a forgotten password.
 * It now supports a multi-step process:
 * 1. Enter email to send a reset link/OTP.
 * 2. Enter the OTP received.
 * 3. Set a new password.
 * The form uses Tailwind CSS for styling and includes basic client-side validation.
 * A loading state is added to show feedback during form submission.
 */
const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const [step, setStep] = useState<'email' | 'otp' | 'reset_password'>('email'); // State to manage the current step

  /**
   * Handles the form submission for the current step.
   * Simulates API calls for sending OTP, verifying OTP, and resetting password.
   * @param e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    if (step === 'email') {
      if (!email) {
        setError('Vui lòng nhập địa chỉ email của bạn.');
        setLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Địa chỉ email không hợp lệ.');
        setLoading(false);
        return;
      }

      // Simulate sending OTP/reset link
      console.log('Yêu cầu gửi mã OTP/liên kết đặt lại mật khẩu đến:', email);
      setSuccess('Nếu email của bạn tồn tại trong hệ thống, một mã OTP đã được gửi đến bạn.');
      setTimeout(() => {
        setStep('otp'); // Move to OTP step after successful email submission
        setSuccess(''); // Clear success message for next step
        setLoading(false); // Stop loading
      }, 1500); // Simulate network delay
    } else if (step === 'otp') {
      if (!otp) {
        setError('Vui lòng nhập mã OTP.');
        setLoading(false);
        return;
      }
      if (otp.length !== 6 || !/^\d+$/.test(otp)) { // Basic OTP validation (6 digits)
        setError('Mã OTP không hợp lệ. Vui lòng nhập 6 chữ số.');
        setLoading(false);
        return;
      }

      // Simulate OTP verification
      console.log('Xác minh mã OTP:', otp);
      setSuccess('Mã OTP đã được xác minh thành công.');
      setTimeout(() => {
        setStep('reset_password'); // Move to reset password step after successful OTP verification
        setSuccess(''); // Clear success message for next step
        setLoading(false); // Stop loading
      }, 1500); // Simulate network delay
    } else if (step === 'reset_password') {
      if (!newPassword || !confirmNewPassword) {
        setError('Vui lòng nhập mật khẩu mới và xác nhận mật khẩu.');
        setLoading(false);
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError('Mật khẩu xác nhận không khớp.');
        setLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
        setLoading(false);
        return;
      }

      // Simulate password reset
      console.log('Đặt lại mật khẩu mới:', newPassword);
      setSuccess('Mật khẩu của bạn đã được đặt lại thành công! Bạn có thể đăng nhập ngay bây giờ.');
      setTimeout(() => {
        // Optionally redirect to login page
        // navigate('/login');
        setStep('email'); // Reset to email step for next time
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setSuccess('');
        setLoading(false); // Stop loading
      }, 2000); // Simulate network delay
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Quên mật khẩu</h2>
      {step === 'email' && (
        <>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Vui lòng nhập địa chỉ email đã đăng ký của bạn. Chúng tôi sẽ gửi cho bạn một mã OTP để đặt lại mật khẩu.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Nhập địa chỉ email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} // Disable input when loading
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Gửi mã OTP'
                )}
              </button>
            </div>
          </form>
        </>
      )}

      {step === 'otp' && (
        <>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Vui lòng nhập mã OTP gồm 6 chữ số đã được gửi đến email của bạn.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Mã OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Nhập mã OTP của bạn"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading} // Disable input when loading
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Xác minh OTP'
                )}
              </button>
            </div>
          </form>
        </>
      )}

      {step === 'reset_password' && (
        <>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Vui lòng nhập mật khẩu mới của bạn.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading} // Disable input when loading
              />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu mới
              </label>
              <input
                id="confirm-new-password"
                name="confirm-new-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Xác nhận mật khẩu mới của bạn"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={loading} // Disable input when loading
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Đặt lại mật khẩu'
                )}
              </button>
            </div>
          </form>
        </>
      )}

      <div className="mt-6 text-center text-sm">
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Quay lại trang đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
