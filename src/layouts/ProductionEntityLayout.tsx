// src/layouts/ProductionEntityLayout.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Activity,
  Tag,
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  BookText,
  Building,
  PlusCircle,
  RefreshCcw, // Icon for Change Entity
  Palette, // Icon for Theme settings
  Menu, // Hamburger icon
  X, // Close icon
  ShoppingCart // New: Shopping Cart icon
} from 'lucide-react';

/**
 * ProductionEntityLayout Component
 *
 * This layout is specifically designed for the "Chủ thể sản xuất" (Production Entity) role.
 * It features a responsive design with a sidebar for navigation and a top header for global actions.
 * Includes placeholders for language switching, messages, notifications, settings, and user menu.
 * The sidebar dynamically renders menu groups and their sub-menus.
 * Updated for desktop view with header menus, company logo/name, and enhanced dropdowns/modals.
 * Adjusted for tablet/mobile view with hidden sidebar and bottom navigation bar, and moved certain header elements to sidebar on mobile.
 */
const ProductionEntityLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeHeaderMenu, setActiveHeaderMenu] = useState<string>('Tổng quan'); // State for active header menu

  // States for dropdowns/popups
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showUserMenuDropdown, setShowUserMenuDropdown] = useState(false);
  const [showChangeEntityDropdown, setShowChangeEntityDropdown] = useState(false);

  // Refs for click outside detection
  const sidebarRef = useRef<HTMLElement>(null); // Ref for sidebar
  const languageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const changeEntityRef = useRef<HTMLDivElement>(null);


  // Constants for fallback image URLs
  const FALLBACK_LOGO_URL = 'https://placehold.co/64x64/cccccc/333333?text=Logo';
  const FALLBACK_FLAG_URL = 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'; // Default to Vietnam flag
  const FALLBACK_AVATAR_URL = 'https://placehold.co/32x32/cccccc/333333?text=User';
  const FALLBACK_ENTITY_LOGO_URL = 'https://placehold.co/32x32/cccccc/333333?text=L';

  /**
   * Handles image loading errors by setting a fallback source.
   * @param e - The synthetic event from the image element.
   * @param fallbackSrc - The URL of the fallback image.
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    e.currentTarget.src = fallbackSrc;
  };

  // Mock Data for Company and Linked Entities
  const currentCompany = {
    logo: 'https://placehold.co/40x40/0000FF/FFFFFF?text=ABC', // Placeholder logo
    name: 'Công ty TNHH Sản xuất và Thương mại ABC Việt Nam',
    id: 'PE001',
  };

  const linkedEntities = [
    { logo: 'https://placehold.co/30x30/FF0000/FFFFFF?text=XYZ', name: 'Công ty XYZ', id: 'PE002' },
    { logo: 'https://placehold.co/30x30/00FF00/FFFFFF?text=DEF', name: 'Công ty DEF', id: 'PE003' },
    { logo: 'https://placehold.co/30x30/FFFF00/000000?text=GHI', name: 'Công ty GHI', id: 'PE004' },
  ];

  // Mock Data for Languages - Using image URLs for flags
  const languages = [
    { name: 'Tiếng Việt', code: 'vi', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg' },
    { name: 'English', code: 'en', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg' },
    { name: '日本語', code: 'jp', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg' },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  // Define the full menu structure
  const fullMenuItems = [
    {
      name: 'Tổng quan',
      icon: <LayoutDashboard size={20} />,
      path: '/production-entity/dashboard',
      subMenus: [], // No sub-menus for Overview
    },
    {
      name: 'Truy xuất',
      icon: <ClipboardList size={20} />,
      subMenus: [
        { name: 'Sản phẩm', path: '/production-entity/products' },
        { name: 'Kích hoạt tự động', path: '/production-entity/auto-activate' },
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
      icon: <CreditCard size={20} />,
      subMenus: [
        { name: 'Dịch vụ hiện tại', path: '/production-entity/current-services' },
        { name: 'Dịch vụ hệ thống', path: '/production-entity/system-services' },
        { name: 'Thanh toán', path: '/production-entity/payment' },
      ],
    },
    {
      name: 'Nhật ký',
      icon: <BookText size={20} />,
      subMenus: [
        { name: 'Nhật ký', path: '/production-entity/logs' },
        { name: 'Vùng trồng', path: '/production-entity/growing-areas' },
        { name: 'Quy trình', path: '/production-entity/processes' },
      ],
    },
    {
      name: 'Quản trị',
      icon: <Settings size={20} />,
      subMenus: [
        { name: 'Điểm bán', path: '/production-entity/sales-points' },
        { name: 'Đối tác', path: '/production-entity/partners' },
        { name: 'Mời người dùng', path: '/production-entity/invite-users' },
        { name: 'Nhân sự', path: '/production-entity/personnel' },
      ],
    },
  ];

  // Filter sidebar items based on the active header menu
  const getSidebarMenuItems = () => {
    const selectedHeaderMenu = fullMenuItems.find(menu => menu.name === activeHeaderMenu);
    if (selectedHeaderMenu) {
      // If it's "Tổng quan" or a menu group with sub-menus, return its sub-menus (or itself if no sub-menus)
      return selectedHeaderMenu.subMenus.length > 0 ? selectedHeaderMenu.subMenus : [selectedHeaderMenu];
    }
    return []; // Should not happen if activeHeaderMenu is always valid
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // const toggleSubMenu = (menuName: string) => {
  //   setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  // };

  const handleSelectLanguage = (lang: typeof languages[0]) => {
    setSelectedLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const handleChangeEntity = (entityId: string) => {
    console.log(`Đổi chủ thể sang: ${entityId}`);
    // In a real app, you would update the current entity context/state here
    setShowChangeEntityDropdown(false);
    // Optionally, navigate to dashboard or refresh data
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close sidebar if click is outside sidebar and it's open
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
      // Close other dropdowns
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setShowMessageDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenuDropdown(false);
      }
      if (changeEntityRef.current && !changeEntityRef.current.contains(event.target as Node)) {
        setShowChangeEntityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]); // Depend on isSidebarOpen to re-attach listener when it changes


  return (
    <div className="flex h-screen bg-gray-100 font-inter overflow-x-hidden"> {/* Added overflow-x-hidden to prevent horizontal scrollbar */}
      {/* Sidebar */}
      <aside
        ref={sidebarRef} // Attach ref to sidebar
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col rounded-r-xl shadow-lg`}
      >
        <div className="p-6 flex flex-col items-center justify-center border-b border-gray-700">
          {/* Logo */}
          <img
            src={currentCompany.logo}
            alt="Company Logo"
            className="h-16 w-16 mb-2 rounded-full object-cover"
            onError={(e) => handleImageError(e, FALLBACK_LOGO_URL)}
          />
          {/* Company Name */}
          <h3 className="text-xl font-bold text-blue-400 text-center leading-tight line-clamp-2">
            {currentCompany.name}
          </h3>
          {/* Change Entity Button */}
          <div className="relative mt-3" ref={changeEntityRef}>
            <button
              onClick={() => setShowChangeEntityDropdown(!showChangeEntityDropdown)}
              className="text-sm text-gray-300 hover:text-white flex items-center bg-gray-700 px-3 py-1 rounded-md transition duration-200 ease-in-out cursor-pointer"
            >
              <RefreshCcw size={16} className="mr-1" /> Đổi chủ thể
            </button>
            {/* Adjusted positioning for sidebar dropdowns to be within sidebar bounds on mobile */}
            {showChangeEntityDropdown && (
              <div className="absolute top-0 left-full ml-2 w-72 bg-white rounded-xl shadow-lg py-2 z-40 border border-gray-200 lg:left-full lg:ml-2 lg:w-72 md:left-auto md:right-0 md:ml-0 md:w-64 sm:left-auto sm:right-0 sm:ml-0 sm:w-60">
                <h4 className="text-gray-800 font-semibold px-4 py-2 border-b border-gray-100">Chủ thể liên kết</h4>
                <div className="max-h-60 overflow-y-auto">
                  {linkedEntities.map((entity) => (
                    <div key={entity.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <img
                          src={entity.logo}
                          alt={`${entity.name} Logo`}
                          className="h-8 w-8 rounded-full object-cover"
                          onError={(e) => handleImageError(e, FALLBACK_ENTITY_LOGO_URL)}
                        />
                        <span className="font-medium text-gray-800">{entity.name}</span>
                      </div>
                      <button
                        onClick={() => handleChangeEntity(entity.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-xs cursor-pointer"
                      >
                        Đổi
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 my-2"></div>
                <button
                  onClick={() => { console.log('Liên kết chủ thể'); setShowChangeEntityDropdown(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-b-md cursor-pointer"
                >
                  <Link to="/link-entity" className="flex items-center w-full"> {/* Example path */}
                    <PlusCircle size={16} className="mr-2" /> Liên kết chủ thể
                  </Link>
                </button>
                <button
                  onClick={() => { console.log('Đăng ký chủ thể'); setShowChangeEntityDropdown(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-b-md cursor-pointer"
                >
                  <Link to="/register-entity" className="flex items-center w-full"> {/* Example path */}
                    <Building size={16} className="mr-2" /> Đăng ký chủ thể
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-grow p-4 overflow-y-auto">
          {getSidebarMenuItems().length > 0 ? (
            <ul>
              {getSidebarMenuItems().map((menu) => (
                <li key={menu.name} className="mb-2">
                  <Link
                    to={menu.path || '#'}
                    className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on click for mobile
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 text-center py-4">
              Chọn một nhóm menu từ header để xem các tùy chọn.
            </div>
          )}
        </nav>

        {/* Mobile-specific options moved to bottom of sidebar */}
        {/* Adjusted spacing and added logout button */}
        <div className="lg:hidden p-4 border-t border-gray-700 mt-auto pb-4"> {/* Added pb-4 to push content up */}
          {/* Language Switcher for Mobile */}
          <div className="relative mb-2" ref={languageRef}> {/* Added mb-2 for spacing */}
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center w-full p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <img
                src={selectedLanguage.flagUrl}
                alt={`${selectedLanguage.name} flag`}
                className="h-5 w-5 mr-2 object-cover rounded-sm"
                onError={(e) => handleImageError(e, FALLBACK_FLAG_URL)}
              />
              <span className="text-sm font-medium">{selectedLanguage.name}</span>
              <ChevronDown size={16} className={`ml-auto transition-transform ${showLanguageDropdown ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {showLanguageDropdown && (
              <div className="absolute top-0 right-0 mt-2 w-full max-w-xs bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 sm:max-w-40"> {/* Adjusted responsive width/position */}
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    <img
                      src={lang.flagUrl}
                      alt={`${lang.name} flag`}
                      className="h-5 w-5 mr-2 object-cover rounded-sm"
                      onError={(e) => handleImageError(e, FALLBACK_FLAG_URL)}
                    />
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings for Mobile */}
          <div className="relative mb-4" ref={settingsRef}> {/* Added mb-4 for spacing */}
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="flex items-center w-full p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <Settings size={24} className="mr-2" />
              <span className="text-sm font-medium">Cài đặt</span>
              <ChevronDown size={16} className={`ml-auto transition-transform ${showSettingsDropdown ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {showSettingsDropdown && (
              <div className="absolute top-0 right-0 mt-2 w-full max-w-xs bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 sm:max-w-40"> {/* Adjusted responsive width/position */}
                <button
                  onClick={() => { console.log('Theme settings'); setShowSettingsDropdown(false); }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                >
                  <Palette size={16} className="mr-2" /> Theme
                </button>
              </div>
            )}
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded-lg text-red-400 hover:bg-red-700 hover:text-white transition duration-200 ease-in-out cursor-pointer"
          >
            <LogOut size={20} className="mr-2" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content area */}
      {/* Adjusted pb- for mobile/tablet to ensure content is not hidden by bottom nav, removed on desktop */}
      <div className="flex-1 flex flex-col lg:ml-64 pb-20 md:pb-24 lg:pb-0"> {/* Changed pb- values */}
        {/* Header */}
        <header className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-bl-xl rounded-br-xl">
          {/* Hamburger menu for mobile/tablet */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4 cursor-pointer"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" /> // Close icon when sidebar is open
            ) : (
              <Menu className="h-6 w-6" /> // Hamburger icon when sidebar is closed
            )}
          </button>

          {/* Header Menus (Desktop only) */}
          <nav className="hidden lg:flex items-center space-x-2 ml-3">
            {fullMenuItems.map((menu) => (
              <button
                key={menu.name}
                onClick={() => {
                  setActiveHeaderMenu(menu.name);
                  // Optionally navigate to the first sub-menu path if available
                  if (menu.subMenus.length > 0) {
                    navigate(menu.subMenus[0].path);
                  } else if (menu.path) {
                    navigate(menu.path);
                  }
                }}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out cursor-pointer
                  ${activeHeaderMenu === menu.name
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
              >
                {menu.icon && <span className="mr-2">{menu.icon}</span>}
                {menu.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Switcher (Desktop only) */}
            <div className="relative hidden lg:block" ref={languageRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <img
                  src={selectedLanguage.flagUrl}
                  alt={`${selectedLanguage.name} flag`}
                  className="h-5 w-5 mr-2 object-cover rounded-sm"
                  onError={(e) => handleImageError(e, FALLBACK_FLAG_URL)}
                />
                <span className="text-sm font-medium">{selectedLanguage.name}</span>
                <ChevronDown size={16} className={`ml-1 transition-transform ${showLanguageDropdown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      <img
                        src={lang.flagUrl}
                        alt={`${lang.name} flag`}
                        className="h-5 w-5 mr-2 object-cover rounded-sm"
                        onError={(e) => handleImageError(e, FALLBACK_FLAG_URL)}
                      />
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="relative" ref={messagesRef}>
              <button
                onClick={() => setShowMessageDropdown(!showMessageDropdown)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative cursor-pointer"
              >
                <MessageSquare size={24} />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
              </button>
              {showMessageDropdown && (
                <div className="absolute right-0 mt-2 w-full max-w-xs bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200 sm:max-w-sm"> {/* Adjusted responsive width */}
                  <h4 className="text-gray-800 font-semibold px-4 py-2 border-b border-gray-100">Tin nhắn</h4>
                  <div className="max-h-72 overflow-y-auto">
                    {/* Example Message Item */}
                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <img src="https://placehold.co/40x40/FFD700/000000?text=A" alt="Avatar" className="w-10 h-10 rounded-full object-cover" onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)} />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 flex justify-between items-center">
                          <span>Người gửi A</span>
                          <span className="text-xs text-gray-500">10:30 AM</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">Chào bạn, chúng ta có cuộc họp vào ngày mai nhé, đừng quên!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <img src="https://placehold.co/40x40/ADFF2F/000000?text=B" alt="Avatar" className="w-10 h-10 rounded-full object-cover" onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)} />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 flex justify-between items-center">
                          <span>Người gửi B</span>
                          <span className="text-xs text-gray-500">Hôm qua</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">Dự án X đã hoàn thành, bạn kiểm tra và phản hồi nhé. Cảm ơn!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <img src="https://placehold.co/40x40/87CEEB/000000?text=C" alt="Avatar" className="w-10 h-10 rounded-full object-cover" onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)} />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 flex justify-between items-center">
                          <span>Người gửi C</span>
                          <span className="text-xs text-gray-500">2 ngày trước</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">Bạn có thể gửi báo cáo tài chính tháng này không?</p>
                      </div>
                    </div>
                    {/* More message items can be added here */}
                    <div className="text-center text-gray-500 py-4 text-sm">Không có tin nhắn mới hơn.</div>
                  </div>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={() => { console.log('Xem tất cả tin nhắn'); setShowMessageDropdown(false); }}
                    className="block w-full text-center py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-b-xl cursor-pointer"
                  >
                    Xem tất cả tin nhắn
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative cursor-pointer"
              >
                <Bell size={24} />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">5</span>
              </button>
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-full max-w-xs bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200 sm:max-w-sm"> {/* Adjusted responsive width */}
                  <h4 className="text-gray-800 font-semibold px-4 py-2 border-b border-gray-100">Thông báo</h4>
                  <div className="max-h-72 overflow-y-auto">
                    {/* Example Notification Item */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-start space-x-3 mb-2">
                      <Bell size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Hệ thống: <span className="font-normal">Bạn có 5 tem mới cần kích hoạt.</span></p>
                        <span className="text-xs text-gray-500">2 phút trước</span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-start space-x-3 mb-2">
                      <Activity size={20} className="text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Sản phẩm: <span className="font-normal">Sản phẩm "Gạo ST25" đã được cập nhật.</span></p>
                        <span className="text-xs text-gray-500">1 giờ trước</span>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-start space-x-3 mb-2">
                      <Tag size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Tem: <span className="font-normal">Đã có 100 tem mới được in.</span></p>
                        <span className="text-xs text-gray-500">Hôm qua</span>
                      </div>
                    </div>
                    {/* More notification items can be added here */}
                    <div className="text-center text-gray-500 py-4 text-sm">Không có thông báo mới hơn.</div>
                  </div>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={() => { console.log('Xem tất cả thông báo'); setShowNotificationDropdown(false); }}
                    className="block w-full text-center py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-b-xl cursor-pointer"
                  >
                    Xem tất cả thông báo
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart (New) */}
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative cursor-pointer">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">2</span> {/* Example count */}
            </button>


            {/* Settings (Desktop only) */}
            <div className="relative hidden lg:block" ref={settingsRef}>
              <button
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <Settings size={24} />
                <ChevronDown size={16} className={`ml-1 transition-transform ${showSettingsDropdown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    onClick={() => { console.log('Theme settings'); setShowSettingsDropdown(false); }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    <Palette size={16} className="mr-2" /> Theme
                  </button>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenuDropdown(!showUserMenuDropdown)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://placehold.co/32x32/cccccc/333333?text=User"
                  alt="User Avatar"
                  onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)}
                />
                <span className="font-medium text-gray-800 hidden sm:block">John Doe</span>
                <ChevronDown size={16} className={`ml-1 transition-transform ${showUserMenuDropdown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {showUserMenuDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    onClick={() => { console.log('Hồ sơ người dùng'); setShowUserMenuDropdown(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    Hồ sơ người dùng
                  </button>
                  <button
                    onClick={() => { console.log('Cài đặt tài khoản'); setShowUserMenuDropdown(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    Cài đặt tài khoản
                  </button>
                  <button
                    onClick={() => { setShowChangeEntityDropdown(true); setShowUserMenuDropdown(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    Đổi chủ thể
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left cursor-pointer"
                  >
                    <LogOut size={16} className="inline-block mr-2" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        {/* Added overflow-x-hidden to prevent horizontal scrollbar from content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet /> {/* Renders the content of the nested routes */}
        </main>
      </div>

      {/* Bottom Navigation Bar for Tablet/Mobile */}
      {/* This bar is visible on screens smaller than 'lg' (i.e., md and sm) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg lg:hidden flex justify-around items-center p-2 border-t border-gray-200">
        {fullMenuItems.map((menu) => (
          <button
            key={menu.name}
            onClick={() => {
              setActiveHeaderMenu(menu.name);
              // Optionally navigate to the first sub-menu path if available
              if (menu.subMenus.length > 0) {
                navigate(menu.subMenus[0].path);
              } else if (menu.path) {
                navigate(menu.path);
              }
              setIsSidebarOpen(false); // Close sidebar when a bottom menu item is clicked
            }}
            className={`flex flex-col items-center p-2 rounded-lg text-xs font-medium transition duration-200 ease-in-out cursor-pointer
              ${activeHeaderMenu === menu.name
                ? 'text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
              }`}
          >
            {menu.icon && <span className="mb-1">{React.cloneElement(menu.icon, { size: 20 })}</span>} {/* Adjust icon size for bottom bar */}
            {menu.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductionEntityLayout;
