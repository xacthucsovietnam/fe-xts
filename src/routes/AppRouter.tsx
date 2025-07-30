// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang chính
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import RoleSelectionPage from '../pages/RoleSelectionPage';

// // Import các layout
import AuthLayout from '../layouts/AuthLayout';
// import MainLayout from '../layouts/MainLayout';
// import AdminLayout from '../layouts/AdminLayout';
import ProductionEntityLayout from '../layouts/ProductionEntityLayout';
// import CertificationManagementLayout from '../layouts/CertificationManagementLayout';
// import StateManagementLayout from '../layouts/StateManagementLayout';
// import InspectionEntityLayout from '../layouts/InspectionEntityLayout';
// import ConsumerLayout from '../layouts/ConsumerLayout';

// // Import ProtectedRoute
import ProtectedRoute from './ProtectedRoute';

// // Import các trang của từng vai trò (ví dụ)
// // Admin
// import AdminDashboardPage from '../features/admin/pages/DashboardPage';
// import UserManagementPage from '../features/admin/pages/UserManagementPage';
// import SystemSettingsPage from '../features/admin/pages/SystemSettingsPage';

// // Production Entity
import ProductionEntityDashboardPage from '../features/production-entity/pages/DashboardPage';
// import BatchManagementPage from '../features/production-entity/pages/BatchManagementPage';

// // Certification Management
// import CertificateManagementPage from '../features/certification-management/pages/CertificateManagementPage';
// import AuditLogPage from '../features/certification-management/pages/AuditLogPage';

// // State Management
// import ComplianceMonitoringPage from '../features/state-management/pages/ComplianceMonitoringPage';
// import ReportGenerationPage from '../features/state-management/pages/ReportGenerationPage';

// // Inspection Entity
// import InspectionRequestPage from '../features/inspection-entity/pages/InspectionRequestPage';
// import ResultSubmissionPage from '../features/inspection-entity/pages/ResultSubmissionPage';

// // Consumer
// import ProductLookupPage from '../features/consumer/pages/ProductLookupPage';
// import FeedbackPage from '../features/consumer/pages/FeedbackPage';

// Giả định các vai trò người dùng
// Bạn có thể định nghĩa các hằng số này trong src/utils/constants.ts
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

        {/* Tuyến đường yêu cầu đăng nhập và chọn vai trò */}
        <Route
          path="/select-role"
          element={
            <ProtectedRoute allowedRoles={Object.values(USER_ROLES)}>
              <RoleSelectionPage />
            </ProtectedRoute>
          }
        />

        {/* Tuyến đường được bảo vệ theo vai trò */}

        {/* Quản trị viên */}
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} /> 
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings" element={<SystemSettingsPage />} />
        </Route> */}

        {/* Chủ thể sản xuất */}
        <Route
          path="/production-entity"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.PRODUCTION_ENTITY]}>
              <ProductionEntityLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProductionEntityDashboardPage />} />
          <Route path="product-entry" element={<ProductionEntityDashboardPage />} />
          {/* <Route path="batch-management" element={<BatchManagementPage />} /> */}
        </Route>

        {/* Chủ thể quản lý sản phẩm chứng chỉ chứng nhận */}
        {/* <Route
          path="/certification-management"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.CERTIFICATION_MANAGEMENT]}>
              <CertificationManagementLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CertificateManagementPage />} />
          <Route path="certificates" element={<CertificateManagementPage />} />
          <Route path="audit-log" element={<AuditLogPage />} />
        </Route> */}

        {/* Chủ thể quản lý nhà nước */}
        {/* <Route
          path="/state-management"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.STATE_MANAGEMENT]}>
              <StateManagementLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ComplianceMonitoringPage />} />
          <Route path="compliance" element={<ComplianceMonitoringPage />} />
          <Route path="reports" element={<ReportGenerationPage />} />
        </Route> */}

        {/* Chủ thể kiểm nghiệm */}
        {/* <Route
          path="/inspection-entity"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.INSPECTION_ENTITY]}>
              <InspectionEntityLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InspectionRequestPage />} />
          <Route path="requests" element={<InspectionRequestPage />} />
          <Route path="results" element={<ResultSubmissionPage />} />
        </Route> */}

        {/* Người tiêu dùng */}
        {/* <Route
          path="/consumer"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.CONSUMER]}>
              <ConsumerLayout />
            </ProtectedRoute>
          }
        >
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
