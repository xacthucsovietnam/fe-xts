// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang chính
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import RoleSelectionPage from '../pages/RoleSelectionPage'; // No longer needed as PersonalSpacePage replaces it
import PersonalSpacePage from '../pages/PersonalSpacePage'; // Updated path for PersonalSpacePage

// import Profile from '../features/user/Profile'; // Import Profile page
// import EditProfile from '../features/user/EditProfile'; // Import EditProfile page


// Import các layout
import AuthLayout from '../layouts/AuthLayout';
// import MainLayout from '../layouts/MainLayout'; // Uncomment if needed
// import AdminLayout from '../layouts/AdminLayout'; // Uncomment if needed
import ProductionEntityLayout from '../layouts/ProductionEntityLayout';
// import CertificationManagementLayout from '../layouts/CertificationManagementLayout'; // Uncomment if needed
// import StateManagementLayout from '../layouts/StateManagementLayout'; // Uncomment if needed
// import InspectionEntityLayout from '../layouts/InspectionEntityLayout'; // Uncomment if needed
// import ConsumerLayout from '../layouts/ConsumerLayout'; // Uncomment if needed

// Import các trang của từng vai trò (ví dụ)
// Admin
// import AdminDashboardPage from '../features/admin/pages/DashboardPage'; // Uncomment if needed
// import UserManagementPage from '../features/admin/pages/UserManagementPage'; // Uncomment if needed
// import SystemSettingsPage from '../features/admin/pages/SystemSettingsPage'; // Uncomment if needed

// Production Entity
import ProductionEntityDashboardPage from '../features/production-entity/pages/DashboardPage'; // Updated path
import CurrentServicesPage from '../features/production-entity/pages/CurrentServicesPage'; // Updated path
import SystemServicesPage from '../features/production-entity/pages/SystemServicesPage'; // Updated path


// Certification Management
// import CertificateManagementPage from '../features/certification-management/pages/CertificateManagementPage'; // Uncomment if needed
// import AuditLogPage from '../features/certification-management/pages/AuditLogPage'; // Uncomment if needed

// State Management
// import ComplianceMonitoringPage from '../features/state-management/pages/ComplianceMonitoringPage'; // Uncomment if needed
// import ReportGenerationPage from '../features/state-management/pages/ReportGenerationPage'; // Uncomment if needed

// Inspection Entity
// import InspectionRequestPage from '../features/inspection-entity/pages/InspectionRequestPage'; // Uncomment if needed
// import ResultSubmissionPage from '../features/inspection-entity/pages/ResultSubmissionPage'; // Uncomment if needed

// Consumer
// import ProductLookupPage from '../features/consumer/pages/ProductLookupPage'; // Uncomment if needed
// import FeedbackPage from '../features/consumer/pages/FeedbackPage'; // Uncomment if needed

// Giả định các vai trò người dùng (Vẫn giữ lại nếu có thể được sử dụng ở nơi khác)
export const USER_ROLES = {
  ADMIN: 'admin',
  PRODUCTION_ENTITY: 'production-entity',
  CERTIFICATION_MANAGEMENT: 'certification-management',
  STATE_MANAGEMENT: 'state-management',
  INSPECTION_ENTITY: 'inspection-entity',
  CONSUMER: 'consumer',
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Các tuyến đường công khai (không yêu cầu đăng nhập) */}
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Tuyến đường Không gian cá nhân (không còn bảo vệ bởi ProtectedRoute) */}
        <Route path="/personal-space" element={<PersonalSpacePage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />

        {/* User Profile Routes */}
        <Route path="/user">
        </Route>

        {/* Các tuyến đường của Chủ thể sản xuất (không còn bảo vệ bởi ProtectedRoute) */}
        <Route path="/production-entity" element={<ProductionEntityLayout />}>
          <Route index element={<ProductionEntityDashboardPage />} />
          <Route path="dashboard" element={<ProductionEntityDashboardPage />} />
          <Route path="current-services" element={<CurrentServicesPage />} />
          <Route path="system-services" element={<SystemServicesPage />} />
          {/* Thêm các tuyến đường con khác của chủ thể sản xuất tại đây */}
        </Route>

        {/* Các tuyến đường khác (nếu có, bạn sẽ cần bỏ comment và điều chỉnh tương tự) */}
        {/* Quản trị viên */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings" element={<SystemSettingsPage />} />
        </Route> */}

        {/* Chủ thể quản lý sản phẩm chứng chỉ chứng nhận */}
        {/* <Route path="/certification-management" element={<CertificationManagementLayout />}>
          <Route index element={<CertificateManagementPage />} />
          <Route path="certificates" element={<CertificateManagementPage />} />
          <Route path="audit-log" element={<AuditLogPage />} />
        </Route> */}

        {/* Chủ thể quản lý nhà nước */}
        {/* <Route path="/state-management" element={<StateManagementLayout />}>
          <Route index element={<ComplianceMonitoringPage />} />
          <Route path="compliance" element={<ComplianceMonitoringPage />} />
          <Route path="reports" element={<ReportGenerationPage />} />
        </Route> */}

        {/* Chủ thể kiểm nghiệm */}
        {/* <Route path="/inspection-entity" element={<InspectionEntityLayout />}>
          <Route index element={<InspectionRequestPage />} />
          <Route path="requests" element={<InspectionRequestPage />} />
          <Route path="results" element={<ResultSubmissionPage />} />
        </Route> */}

        {/* Người tiêu dùng */}
        {/* <Route path="/consumer" element={<ConsumerLayout />}>
          <Route index element={<ProductLookupPage />} />
          <Route path="lookup" element={<ProductLookupPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route> */}

        {/* Xử lý các tuyến đường không tìm thấy */}
        <Route path="*" element={<div>404 - Trang không tìm thấy</div>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
