// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // Import useLocation

// Giả định một hook để lấy thông tin xác thực và vai trò của người dùng
// Trong dự án thực tế, bạn sẽ có một context hoặc hook quản lý trạng thái đăng nhập
// và vai trò từ Firebase Auth.
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  isLoading: boolean; // Thêm trạng thái loading để tránh chuyển hướng sớm
}

// Đây là một giả lập của useAuth hook.
// Trong thực tế, bạn sẽ thay thế nó bằng logic xác thực Firebase của mình.
const useAuth = (): AuthContextType => {
  // Giả lập trạng thái đăng nhập và vai trò
  // Bạn có thể lưu trạng thái này trong localStorage hoặc context
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true); // Bắt đầu với loading

  React.useEffect(() => {
    // Giả lập quá trình kiểm tra xác thực (ví dụ: kiểm tra token trong localStorage)
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedRole = localStorage.getItem('userRole');
      if (storedAuth === 'true') { // Only check if authenticated
        setIsAuthenticated(true);
        setUserRole(storedRole || 'none'); // Default to 'none' if role not set
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
      setIsLoading(false); // Kết thúc loading sau khi kiểm tra
    };

    checkAuth();

    // Bạn có thể thêm listener cho Firebase Auth state changes ở đây
    // Ví dụ: onAuthStateChanged(auth, (user) => { ... })
  }, []);

  return { isAuthenticated, userRole, isLoading };
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Các vai trò được phép truy cập (optional)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  // Hiển thị spinner hoặc thông báo loading trong khi kiểm tra xác thực
  if (isLoading) {
    return <div>Đang tải...</div>; // Hoặc một component LoadingSpinner đẹp hơn
  }

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Xử lý đặc biệt cho trang chọn vai trò
  // Nếu người dùng đã đăng nhập, cho phép truy cập trang chọn vai trò bất kể vai trò hiện tại là gì.
  if (location.pathname === '/personal-space') {
    return <>{children || <Outlet />}</>;
  }

  // Đối với tất cả các tuyến đường được bảo vệ khác, kiểm tra vai trò
  if (allowedRoles && allowedRoles.length > 0) {
    // Nếu người dùng chưa có vai trò cụ thể ('none')
    // và đang cố gắng truy cập một trang yêu cầu vai trò cụ thể (không phải trang chọn vai trò)
    if (userRole === null || userRole === 'none') {
      return <Navigate to="/personal-space" replace />;
    }

    // Nếu người dùng có vai trò nhưng vai trò đó không nằm trong danh sách được phép
    if (userRole && !allowedRoles.includes(userRole)) {
      // Chuyển hướng đến một trang không có quyền truy cập hoặc hiển thị thông báo
      return <div>Bạn không có quyền truy cập trang này.</div>;
    }
  }

  // Nếu tất cả các kiểm tra đều hợp lệ, render children (layout hoặc trang)
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
