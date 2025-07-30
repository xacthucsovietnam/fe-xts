// src/pages/Auth/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * RegisterPage Component
 *
 * This component provides a user interface for registering a new account.
 * It includes input fields for email, password, and password confirmation.
 * The form uses Tailwind CSS for styling and includes basic client-side validation.
 * A loading state is added to show feedback during form submission.
 */
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const navigate = useNavigate();

  /**
   * Handles the form submission for registration.
   * In a real application, this would involve sending user data to a backend API.
   * For this frontend-only project, it simulates a successful registration
   * and navigates to the login page.
   * @param e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    if (!email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      setLoading(false); // Stop loading if validation fails
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      setLoading(false); // Stop loading if validation fails
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      setLoading(false); // Stop loading if validation fails
      return;
    }

    // Simulate registration logic (replace with actual API call in a real project)
    console.log('Đăng ký với:', { email, password });

    // Simulate successful registration
    setTimeout(() => {
      setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      setLoading(false); // Stop loading
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Redirect to login after 1 second
    }, 1500); // Simulate network delay
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Đăng ký tài khoản mới</h2>
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
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Disable input when loading
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
            Xác nhận mật khẩu
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Xác nhận mật khẩu của bạn"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading} // Disable input when loading
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Đăng ký'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        Bạn đã có tài khoản?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
