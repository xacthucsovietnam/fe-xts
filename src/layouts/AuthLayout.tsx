// src/layouts/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * AuthLayout Component
 *
 * This layout is used for authentication-related pages like Login, Register, and Forgot Password.
 * It provides a consistent visual wrapper for these pages, typically centering the content
 * and applying a background or basic styling.
 */
const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl w-full max-w-md">
        <Outlet /> {/* Renders the child route components (Login, Register, ForgotPassword) */}
      </div>
    </div>
  );
};

export default AuthLayout;
