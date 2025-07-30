import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * RoleSelectionPage Component
 *
 * This page allows a logged-in user to select their role within the system.
 * Based on the selected role, the user will be redirected to the corresponding
 * dashboard or main page for that role.
 * It also includes a logout option.
 */
const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  // Define user roles and their corresponding paths
  // These should match the USER_ROLES constants in src/routes/AppRouter.tsx
  const roles = [
    { name: 'Quản trị viên hệ thống', path: '/admin', role: 'admin', description: 'Quản lý người dùng, cài đặt hệ thống.' },
    { name: 'Chủ thể sản xuất', path: '/production-entity', role: 'production-entity', description: 'Quản lý thông tin sản phẩm, lô hàng.' },
    { name: 'Chủ thể quản lý sản phẩm chứng chỉ chứng nhận', path: '/certification-management', role: 'certification-management', description: 'Quản lý chứng chỉ, quy trình kiểm định.' },
    { name: 'Chủ thể quản lý nhà nước', path: '/state-management', role: 'state-management', description: 'Giám sát tuân thủ, báo cáo.' },
    { name: 'Chủ thể kiểm nghiệm', path: '/inspection-entity', role: 'inspection-entity', description: 'Xử lý yêu cầu kiểm nghiệm, gửi kết quả.' },
    { name: 'Người tiêu dùng', path: '/consumer', role: 'consumer', description: 'Tra cứu sản phẩm, gửi phản hồi.' },
  ];

  /**
   * Handles role selection.
   * Stores the selected role in localStorage and navigates to the role-specific path.
   * @param roleName - The internal role string (e.g., 'admin').
   * @param path - The path to navigate to.
   */
  const handleRoleSelect = (roleName: string, path: string) => {
    localStorage.setItem('userRole', roleName); // Update the user's role in local storage
    navigate(path);
  };

  /**
   * Handles the logout action.
   * Clears authentication status from localStorage and redirects to the login page.
   */
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 hover:scale-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Chọn vai trò của bạn</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <button
              key={role.role}
              onClick={() => handleRoleSelect(role.role, role.path)}
              className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="text-4xl mb-3 text-blue-600">
                {/* Placeholder for icons - replace with actual icons if available */}
                {role.role === 'admin' && '⚙️'}
                {role.role === 'production-entity' && '�'}
                {role.role === 'certification-management' && '📜'}
                {role.role === 'state-management' && '🏛️'}
                {role.role === 'inspection-entity' && '🔬'}
                {role.role === 'consumer' && '🛍️'}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{role.name}</h3>
              <p className="text-sm text-gray-600 text-center">{role.description}</p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleLogout}
            className="py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;