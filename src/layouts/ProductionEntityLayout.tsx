// src/layouts/ProductionEntityLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

/**
 * ProductionEntityLayout Component
 *
 * This layout is specifically designed for the "Chủ thể sản xuất" (Production Entity) role.
 * It features a responsive design with a sidebar for navigation and a top header for global actions.
 * Includes placeholders for language switching, messages, notifications, settings, and user menu.
 * The sidebar dynamically renders menu groups and their sub-menus.
 */
const ProductionEntityLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Define the menu structure for Production Entity
  const menuItems = [
    {
      name: 'Tổng quan',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      path: '/production-entity/dashboard', // Example dashboard path
      subMenus: [],
    },
    {
      name: 'Truy xuất',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H3a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2h-3V6a4 4 0 00-4-4zm-4 4a2 2 0 012-2h4a2 2 0 012 2v2H6V6zm-3 6a1 1 0 00-1 1v3a1 1 0 001 1h14a1 1 0 001-1v-3a1 1 0 00-1-1H3z" clipRule="evenodd" />
        </svg>
      ),
      subMenus: [
        { name: 'Sản phẩm', path: '/production-entity/products' },
        { name: 'Mẫu tem', path: '/production-entity/label-templates' },
        { name: 'In tem', path: '/production-entity/print-labels' },
        { name: 'Kích hoạt', path: '/production-entity/activate' },
        { name: 'Bán', path: '/production-entity/sell' },
        { name: 'Hủy', path: '/production-entity/cancel' },
        { name: 'Tra cứu', path: '/production-entity/lookup' },
      ],
    },
    {
      name: 'Dịch vụ',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      ),
      subMenus: [
        { name: 'Dịch vụ hiện tại', path: '/production-entity/current-services' },
        { name: 'Dịch vụ hệ thống', path: '/production-entity/system-services' },
        { name: 'Thanh toán', path: '/production-entity/payment' },
      ],
    },
    {
      name: 'Nhật ký',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      subMenus: [
        { name: 'Nhật ký', path: '/production-entity/logs' },
        { name: 'Vùng trồng', path: '/production-entity/growing-areas' },
        { name: 'Quy trình', path: '/production-entity/processes' },
      ],
    },
    {
      name: 'Quản trị',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.3-.837-2.918.668-2.188 1.949a1.532 1.532 0 01-.582 2.286c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.582 2.286c-.73.831.88 2.438 2.188 1.949a1.532 1.532 0 012.286.948c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.3.837 2.918-.668 2.188-1.949a1.532 1.532 0 01.582-2.286c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.582-2.286c.73-.831-.88-2.438-2.188-1.949a1.532 1.532 0 01-2.286-.948zM10 11a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      subMenus: [
        { name: 'Điểm bán', path: '/production-entity/sales-points' },
        { name: 'Đối tác', path: '/production-entity/partners' },
        { name: 'Mời người dùng', path: '/production-entity/invite-users' },
        { name: 'Nhân sự', path: '/production-entity/personnel' },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const toggleSubMenu = (menuName: string) => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col rounded-r-xl shadow-lg`}
      >
        <div className="p-6 flex items-center justify-center border-b border-gray-700">
          <Link to="/production-entity/dashboard" className="text-2xl font-bold text-blue-400">
            Truy Xuất Nguồn Gốc
          </Link>
        </div>

        <nav className="flex-grow p-4 overflow-y-auto">
          <ul>
            {menuItems.map((menu) => (
              <li key={menu.name} className="mb-2">
                {menu.subMenus.length === 0 ? (
                  <Link
                    to={menu.path || '#'}
                    className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on click for mobile
                  >
                    {menu.icon && <span className="mr-3">{menu.icon}</span>}
                    {menu.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleSubMenu(menu.name)}
                      className="flex items-center justify-between w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out focus:outline-none"
                    >
                      <span className="flex items-center">
                        {menu.icon && <span className="mr-3">{menu.icon}</span>}
                        {menu.name}
                      </span>
                      <svg
                        className={`h-5 w-5 transform ${
                          activeSubMenu === menu.name ? 'rotate-90' : 'rotate-0'
                        } transition-transform duration-200`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {activeSubMenu === menu.name && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {menu.subMenus.map((subMenu) => (
                          <li key={subMenu.name}>
                            <Link
                              to={subMenu.path}
                              className="block p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out text-sm"
                              onClick={() => setIsSidebarOpen(false)} // Close sidebar on click for mobile
                            >
                              {subMenu.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile/Logout at bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-red-700 hover:text-white transition duration-200 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-bl-xl rounded-br-xl">
          <div className="flex items-center">
            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Current Entity Display (Placeholder) */}
            <div className="flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414l2.586 2.586A2 2 0 0116 8v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm4.5 1.5a1.5 1.5 0 00-3 0V12a1.5 1.5 0 003 0V5.5z" clipRule="evenodd" />
              </svg>
              Chủ thể hiện tại: Công ty ABC (ID: PE001)
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher (Placeholder) */}
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="text-sm font-medium">VI</span> / <span className="text-sm text-gray-500">EN</span>
            </button>

            {/* Messages (Placeholder) */}
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
            </button>

            {/* Notifications (Placeholder) */}
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6.002 6.002 0 00-4 2.68V21l-2 1v-2.32a6.002 6.002 0 00-4-2.68h8z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">5</span>
            </button>

            {/* Settings (Placeholder) */}
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.827 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.827 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.827-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.827-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User Menu (Placeholder) */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://placehold.co/32x32/cccccc/333333?text=User"
                  alt="User Avatar"
                />
                <span className="font-medium text-gray-800 hidden sm:block">John Doe</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {/* Dropdown menu can be implemented here */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Renders the content of the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default ProductionEntityLayout;
