// src/features/user/pages/PersonalSpacePage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Briefcase, // Basic Info
  Users, Lock, // Login Methods
  Building, Factory, UserCheck, // Entities: Building for Organization, Factory for Production, UserCheck for Individual
  MailCheck, Calendar, // Invitations
  Edit, Eye, EyeOff, // Password visibility, Edit, View Profile
  CheckCircle, XCircle, // Status and action icons
  ArrowRight, // Navigate icon
  Info, // General info icon
  // For navigation in modals
  LinkIcon
} from 'lucide-react';

// Import Profile and EditProfile components
import Profile from '../features/user/Profile'; // Corrected path assuming Profile.tsx is in src/features/user/
import EditProfile from '../features/user/EditProfile'; // Corrected path assuming EditProfile.tsx is in src/features/user/

// Import UserProfileData interface
// Import UserProfileData interface
import type { UserProfileData } from '../types/user'; // Path from src/features/user/pages to src/types
 // Path from src/features/user/pages to src/types

// Constants for fallback image URLs
const FALLBACK_AVATAR_URL = 'https://placehold.co/64x64/cccccc/333333?text=User';
const FALLBACK_ENTITY_LOGO_URL = 'https://placehold.co/40x40/cccccc/333333?text=L';

// Social Media Icon URLs
const ZALO_ICON_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Logo_Zalo.png/640px-Logo_Zalo.png';
const FACEBOOK_ICON_URL = 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg';
const GOOGLE_ICON_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/IOS_Google_icon.png/640px-IOS_Google_icon.png';

/**
 * Handles image loading errors by setting a fallback source.
 * @param e - The synthetic event from the image element.
 * @param fallbackSrc - The URL of the fallback image.
 */
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
  e.currentTarget.src = fallbackSrc;
};

// Mock User Data for the Personal Space Page and Profile/EditProfile
const initialUserData: UserProfileData = { // Use the imported interface here
  avatar: 'https://placehold.co/100x100/A78BFA/FFFFFF?text=JD', // Placeholder for user avatar
  fullName: 'Nguyễn Văn A',
  gender: 'Nam',
  dateOfBirth: '1990-05-15', // YYYY-MM-DD for date input
  phone: '0987654321',
  email: 'nguyenvana@example.com',
  cccd: '012345678901',
  issueDate: '2020-01-01', // YYYY-MM-DD for date input
  issuePlace: 'Cục Cảnh sát QLHC về TTXH',
  address: {
    street: 'Số 123, Đường ABC',
    ward: 'Phường X',
    district: 'Quận Y',
    city: 'Thành phố Hà Nội',
  },
  // Derived properties, will be calculated from linked/owned entities
  linkedEntitiesCount: 0,
  ownedEntitiesCount: 0,
  userRoleEntitiesCount: 0,
};

const loginMethods = [
  { name: 'Google', icon: <img src={GOOGLE_ICON_URL} alt="Google" className="h-5 w-5" onError={(e) => handleImageError(e, 'https://placehold.co/20x20')} />, linked: true },
  { name: 'Facebook', icon: <img src={FACEBOOK_ICON_URL} alt="Facebook" className="h-5 w-5" onError={(e) => handleImageError(e, 'https://placehold.co/20x20')} />, linked: false },
  { name: 'Zalo', icon: <img src={ZALO_ICON_URL} alt="Zalo" className="h-5 w-5" onError={(e) => handleImageError(e, 'https://placehold.co/20x20')} />, linked: true },
  { name: 'Tài khoản - Mật khẩu', icon: <Lock size={20} />, linked: false, hasPassword: false }, // Added hasPassword
];

const mockLinkedEntities = [
  { id: 'pe1', name: 'Công ty ABC (Sản xuất)', type: 'production-entity', subType: 'tổ chức', logo: 'https://placehold.co/40x40/0000FF/FFFFFF?text=ABC', taxCode: '0100000001', phone: '0241234567', address: 'Số 1, Đường ABC, Hà Nội' },
  { id: 'ce1', name: 'Tổ chức Chứng nhận (CM)', type: 'certification-management', subType: 'tổ chức', logo: 'https://placehold.co/40x40/FF00FF/FFFFFF?text=CM', taxCode: '0100000004', phone: '0901122334', address: 'Số 4, Đường CM, Cần Thơ' },
  { id: 'se1', name: 'Sở NN & PTNT (QLNN)', type: 'state-management', subType: 'tổ chức', logo: 'https://placehold.co/40x40/00FFFF/000000?text=SN', taxCode: '0100000005', phone: '0912345678', address: 'Số 5, Đường QLNN, Hải Phòng' },
  { id: 'ie1', name: 'Trung tâm Kiểm nghiệm (KN)', type: 'inspection-entity', subType: 'tổ chức', logo: 'https://placehold.co/40x40/FFFF00/000000?text=KN', taxCode: '0100000006', phone: '0978123456', address: 'Số 6, Đường KN, Huế' },
];

const mockOwnedEntities = [
  { id: 'pe2', name: 'Công ty TNHH Mới (Sản xuất)', type: 'production-entity', subType: 'tổ chức', logo: 'https://placehold.co/40x40/FFD700/000000?text=NEW', taxCode: '0100000007', phone: '0249876543', address: 'Số 7, Đường Mới, Hà Nội' },
  { id: 'pe3', name: 'Nông trại Xanh (Sản xuất Cá thể)', type: 'production-entity', subType: 'cá thể', logo: 'https://placehold.co/40x40/ADFF2F/000000?text=NX', taxCode: '0100000008', phone: '0381234567', address: 'Số 8, Đường Xanh, Lâm Đồng' },
];

const mockInvitationRequests = [
  { id: 'inv1', entityName: 'Công ty GHI (Phân phối)', inviter: 'Jane Doe', date: '2025-07-20', logo: 'https://placehold.co/40x40/A020F0/FFFFFF?text=GHI', taxCode: '0100000009', phone: '0912121212', address: 'Số 9, Đường GHI, Cần Thơ' },
  { id: 'inv2', entityName: 'Farm HJK (Sản xuất)', inviter: 'John Smith', date: '2025-07-18', logo: 'https://placehold.co/40x40/00BFFF/FFFFFF?text=HJK', taxCode: '0100000010', phone: '0987878787', address: 'Số 10, Đường HJK, Đà Lạt' },
];

/**
 * Helper function to get the appropriate icon for an entity type.
 */
const getEntityIcon = (type: string, subType?: string) => {
  switch (type) {
    case 'admin':
      return <User size={20} className="text-gray-600" />;
    case 'production-entity':
      return subType === 'cá thể' ? <UserCheck size={20} className="text-green-600" /> : <Factory size={20} className="text-green-600" />;
    case 'certification-management':
      return <CheckCircle size={20} className="text-purple-600" />;
    case 'state-management':
      return <Building size={20} className="text-red-600" />;
    case 'inspection-entity':
      return <Eye size={20} className="text-orange-600" />;
    default:
      return <Building size={20} className="text-gray-600" />;
  }
};

/**
 * Helper function to get the display name for an entity type.
 */
const getEntityTypeDisplayName = (type: string, subType?: string) => {
  switch (type) {
    case 'admin':
      return 'Quản trị viên';
    case 'production-entity':
      return subType === 'cá thể' ? 'Sản xuất (Cá thể)' : 'Sản xuất (Tổ chức)';
    case 'certification-management':
      return 'Quản lý sản phẩm chứng chỉ chứng nhận';
    case 'state-management':
      return 'Quản lý nhà nước';
    case 'inspection-entity':
      return 'Kiểm nghiệm';
    // Explicitly not displaying these as per user request
    case 'distribution-entity':
    case 'retail-entity':
      return '';
    default:
      return '';
  }
};

/**
 * Helper function to get the dashboard path based on entity type.
 * In a real application, this would likely be more sophisticated or come from a configuration.
 */
const getEntityDashboardPath = (type: string) => {
  switch (type) {
    case 'production-entity': return '/production-entity/dashboard';
    case 'distribution-entity': return '/distribution-entity/dashboard'; // Placeholder path
    case 'retail-entity': return '/retail-entity/dashboard'; // Placeholder path
    case 'certification-management': return '/certification-management/dashboard'; // Placeholder path
    case 'state-management': return '/state-management/dashboard'; // Placeholder path
    case 'inspection-entity': return '/inspection-entity/dashboard'; // Placeholder path
    default: return '/dashboard'; // Fallback
  }
};

const PersonalSpacePage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordMethod, setPasswordMethod] = useState(loginMethods.find(m => m.name === 'Tài khoản - Mật khẩu'));
  const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmCreatePasswordModal, setShowConfirmCreatePasswordModal] = useState(false);

  // States for Profile and EditProfile Modals
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userProfileData, setUserProfileData] = useState<UserProfileData>(initialUserData); // Use UserProfileData interface

  // State to manage the single default entity
  const [defaultEntityId, setDefaultEntityId] = useState<string | null>(mockLinkedEntities[0]?.id || null);

  // State for mobile tabs
  const [activeMobileTab, setActiveMobileTab] = useState<'info' | 'linked' | 'owned'>('info');

  // Calculate derived user data
  useEffect(() => {
    setUserProfileData(prev => ({
      ...prev,
      linkedEntitiesCount: mockLinkedEntities.length,
      ownedEntitiesCount: mockOwnedEntities.length,
      userRoleEntitiesCount: mockLinkedEntities.length, // Assuming all linked are user roles for mock
    }));
  }, []);

  // Refs for click outside modals
  const createPasswordModalRef = useRef<HTMLDivElement>(null);
  const invitationModalRef = useRef<HTMLDivElement>(null);
  const confirmCreatePasswordModalRef = useRef<HTMLDivElement>(null);
  const profileModalRef = useRef<HTMLDivElement>(null); // Ref for Profile modal
  const editProfileModalRef = useRef<HTMLDivElement>(null); // Ref for EditProfile modal


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCreatePasswordModal && createPasswordModalRef.current && !createPasswordModalRef.current.contains(event.target as Node)) {
        setShowCreatePasswordModal(false);
        setPasswordError('');
        setNewPassword('');
        setConfirmPassword('');
      }
      if (showInvitationModal && invitationModalRef.current && !invitationModalRef.current.contains(event.target as Node)) {
        setShowInvitationModal(false);
      }
      if (showConfirmCreatePasswordModal && confirmCreatePasswordModalRef.current && !confirmCreatePasswordModalRef.current.contains(event.target as Node)) {
        setShowConfirmCreatePasswordModal(false);
      }
      if (showProfileModal && profileModalRef.current && !profileModalRef.current.contains(event.target as Node)) {
        setShowProfileModal(false);
      }
      if (showEditProfileModal && editProfileModalRef.current && !editProfileModalRef.current.contains(event.target as Node)) {
        setShowEditProfileModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCreatePasswordModal, showInvitationModal, showConfirmCreatePasswordModal, showProfileModal, showEditProfileModal]);


  const handleCreatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu nhập lại không khớp.');
      return;
    }
    if (newPassword.length < 6) { // Example validation
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    setPasswordError('');
    setShowCreatePasswordModal(false);
    setShowConfirmCreatePasswordModal(true); // Show confirmation popup
  };

  const confirmPasswordCreation = () => {
    // Simulate API call for password creation
    console.log('Creating password...');
    // In a real app, this would be an async API call
    setTimeout(() => {
      setPasswordMethod(prev => prev ? { ...prev, hasPassword: true, linked: true } : prev);
      setShowConfirmCreatePasswordModal(false);
      alert('Tạo mật khẩu thành công!'); // Success notification
      setNewPassword('');
      setConfirmPassword('');
    }, 500);
  };

  const handleSelectEntity = (entityId: string, entityType: string) => {
    console.log(`Selecting entity: ${entityId} of type ${entityType}`);
    // In a real app, you would set this entity as the active context
    // and then navigate to its specific dashboard.
    const path = getEntityDashboardPath(entityType);
    navigate(path);
  };

  const handleToggleDefault = (entityId: string) => {
    setDefaultEntityId(defaultEntityId === entityId ? null : entityId);
  };

  const handleAcceptInvitation = (invitationId: string) => {
    console.log(`Accepting invitation: ${invitationId}`);
    // Implement API call to accept invitation
    alert(`Đã chấp nhận lời mời ${invitationId}.`);
    // Remove from mockInvitationRequests or update status
    setShowInvitationModal(false);
  };

  const handleDeclineInvitation = (invitationId: string) => {
    console.log(`Declining invitation: ${invitationId}`);
    // Implement API call to decline invitation
    alert(`Đã từ chối lời mời ${invitationId}.`);
    // Remove from mockInvitationRequests or update status
    setShowInvitationModal(false);
  };

  // Handlers for Profile and EditProfile modals
  const handleViewProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleEditProfileClick = () => {
    setShowEditProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  const handleSaveProfile = (updatedProfile: UserProfileData) => { // Use UserProfileData interface
    setUserProfileData(updatedProfile); // Update the main user data state
    setShowEditProfileModal(false); // Close the edit modal
    alert('Hồ sơ đã được lưu thành công!');
    // Optionally, show the updated profile in the view modal immediately
    // setShowProfileModal(true);
  };


  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)] pb-16 md:pb-20 lg:pb-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2">Không gian cá nhân</h2>

      {/* Main Content Sections - Conditional rendering for mobile tabs */}
      <div className="lg:block">
        {/* Basic Account Information */}
        {(activeMobileTab === 'info' || window.innerWidth >= 1024) && (
          <section className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 text-sm sm:text-base">
            <img
              src={userProfileData.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-md"
              onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)}
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{userProfileData.fullName}</h3>
              <div className="space-y-1 text-gray-700">
                <p className="flex items-center justify-center md:justify-start">
                  <User size={16} className="mr-2 text-blue-500" /> Giới tính: {userProfileData.gender}
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Calendar size={16} className="mr-2 text-blue-500" /> Ngày sinh: {userProfileData.dateOfBirth}
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Phone size={16} className="mr-2 text-blue-500" /> Số điện thoại: {userProfileData.phone}
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Mail size={16} className="mr-2 text-blue-500" /> Email: {userProfileData.email}
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <LinkIcon size={16} className="mr-2 text-blue-500" /> Đã liên kết với: {userProfileData.linkedEntitiesCount} chủ thể
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Briefcase size={16} className="mr-2 text-blue-500" /> Chủ sở hữu: {userProfileData.ownedEntitiesCount} chủ thể
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Users size={16} className="mr-2 text-blue-500" /> Người dùng: {userProfileData.userRoleEntitiesCount} chủ thể
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleViewProfileClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm flex items-center justify-center cursor-pointer"
              >
                <Eye size={16} className="mr-2" /> Xem hồ sơ
              </button>
              <button
                onClick={handleEditProfileClick}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 text-sm flex items-center justify-center cursor-pointer"
              >
                <Edit size={16} className="mr-2" /> Chỉnh sửa hồ sơ
              </button>
            </div>
          </section>
        )}

        {/* Linked Login Methods */}
        {(activeMobileTab === 'info' || window.innerWidth >= 1024) && (
          <section className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-sm sm:text-base">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Các phương thức đăng nhập đã liên kết</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loginMethods.map((method) => (
                <div key={method.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {method.icon}
                    <span className="font-medium text-gray-800">{method.name}</span>
                  </div>
                  {method.name === 'Tài khoản - Mật khẩu' ? (
                    passwordMethod?.hasPassword ? (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" /> Đã tạo
                      </span>
                    ) : (
                      <button
                        onClick={() => setShowCreatePasswordModal(true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-xs cursor-pointer"
                      >
                        Tạo mật khẩu
                      </button>
                    )
                  ) : (
                    method.linked ? (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" /> Đã liên kết
                      </span>
                    ) : (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-xs cursor-pointer">
                        Liên kết
                      </button>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* List of Linked Entities */}
      {(activeMobileTab === 'linked' || window.innerWidth >= 1024) && (
        <section className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-sm sm:text-base">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Danh sách chủ thể đã liên kết</h3>
          {mockLinkedEntities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLinkedEntities.map((entity) => {
                const displayName = getEntityTypeDisplayName(entity.type, entity.subType);
                if (!displayName) return null;
                return (
                  <div key={entity.id} className="flex flex-col p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3 mb-3">
                      {getEntityIcon(entity.type, entity.subType)}
                      <img
                        src={entity.logo}
                        alt={`${entity.name} Logo`}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        onError={(e) => handleImageError(e, FALLBACK_ENTITY_LOGO_URL)}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-1">{entity.name}</p>
                        <p className="text-sm text-gray-600">{displayName}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1 mb-4">
                      <p className="flex items-center"><Info size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Mã số thuế: {entity.taxCode}</p>
                      <p className="flex items-center"><Phone size={14} className="mr-2 text-gray-500 flex-shrink-0" /> SĐT: {entity.phone}</p>
                      <p className="flex items-center"><Building size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Địa chỉ: {entity.address}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={() => handleSelectEntity(entity.id, entity.type)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm flex items-center cursor-pointer"
                      >
                        Chọn làm việc <ArrowRight size={16} className="ml-2" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">Mặc định</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={defaultEntityId === entity.id}
                            onChange={() => handleToggleDefault(entity.id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">Bạn chưa liên kết với chủ thể nào.</p>
          )}
        </section>
      )}

      {/* List of Owned Entities */}
      {(activeMobileTab === 'owned' || window.innerWidth >= 1024) && (
        <section className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-sm sm:text-base">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Danh sách chủ thể bạn là chủ sở hữu</h3>
          {mockOwnedEntities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockOwnedEntities.map((entity) => {
                const displayName = getEntityTypeDisplayName(entity.type, entity.subType);
                if (!displayName) return null;
                return (
                  <div key={entity.id} className="flex flex-col p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3 mb-3">
                      {getEntityIcon(entity.type, entity.subType)}
                      <img
                        src={entity.logo}
                        alt={`${entity.name} Logo`}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        onError={(e) => handleImageError(e, FALLBACK_ENTITY_LOGO_URL)}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-1">{entity.name}</p>
                        <p className="text-sm text-gray-600">{displayName}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1 mb-4">
                      <p className="flex items-center"><Info size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Mã số thuế: {entity.taxCode}</p>
                      <p className="flex items-center"><Phone size={14} className="mr-2 text-gray-500 flex-shrink-0" /> SĐT: {entity.phone}</p>
                      <p className="flex items-center"><Building size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Địa chỉ: {entity.address}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={() => handleSelectEntity(entity.id, entity.type)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm flex items-center cursor-pointer"
                      >
                        Chọn làm việc <ArrowRight size={16} className="ml-2" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">Mặc định</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={defaultEntityId === entity.id}
                            onChange={() => handleToggleDefault(entity.id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">Bạn chưa sở hữu chủ thể nào.</p>
          )}
        </section>
      )}

      {/* Floating Invitation Button */}
      {mockInvitationRequests.length > 0 && (
        <button
          onClick={() => setShowInvitationModal(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2 text-sm font-semibold animate-bounce group cursor-pointer"
        >
          <MailCheck size={24} className="group-hover:scale-110 transition-transform duration-200" />
          <span className="hidden sm:block">Lời mời liên kết (<span className="text-red-300 font-bold group-hover:text-red-100 transition-colors duration-200">{mockInvitationRequests.length}</span>)</span>
          <span className="sm:hidden text-red-300 font-bold group-hover:text-red-100 transition-colors duration-200">{mockInvitationRequests.length}</span>
        </button>
      )}

      {/* Create Password Modal */}
      {showCreatePasswordModal && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div ref={createPasswordModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tạo mật khẩu tài khoản</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                value={userProfileData.email}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">Mật khẩu mới:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="new-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Nhập lại mật khẩu:</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-xs italic mt-2">{passwordError}</p>}
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={() => { setShowCreatePasswordModal(false); setPasswordError(''); setNewPassword(''); setConfirmPassword(''); }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2 transition duration-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleCreatePassword}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Create Password Modal */}
      {showConfirmCreatePasswordModal && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div ref={confirmCreatePasswordModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận tạo mật khẩu</h3>
            <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn tạo mật khẩu cho tài khoản này không?</p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setShowConfirmCreatePasswordModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2 transition duration-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmPasswordCreation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invitation List Modal */}
      {showInvitationModal && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div ref={invitationModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900">Danh sách lời mời liên kết</h3>
              <button onClick={() => setShowInvitationModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <XCircle size={24} />
              </button>
            </div>
            {mockInvitationRequests.length > 0 ? (
              <div className="space-y-4">
                {mockInvitationRequests.map((invite) => (
                  <div key={invite.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={invite.logo}
                          alt={`${invite.entityName} Logo`}
                          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                          onError={(e) => handleImageError(e, FALLBACK_ENTITY_LOGO_URL)}
                        />
                        <div>
                          <p className="font-medium text-gray-900 flex items-center">
                            <MailCheck size={18} className="mr-2 text-orange-500" />
                            Lời mời từ <span className="font-semibold ml-1">{invite.entityName}</span>
                          </p>
                          <p className="text-sm text-gray-600">Người gửi: {invite.inviter}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 space-y-1 ml-12">
                        <p className="flex items-center"><Calendar size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Thời gian gửi: {invite.date}</p>
                        <p className="flex items-center"><Info size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Mã số thuế: {invite.taxCode}</p>
                        <p className="flex items-center"><Phone size={14} className="mr-2 text-gray-500 flex-shrink-0" /> SĐT: {invite.phone}</p>
                        <p className="flex items-center"><Building size={14} className="mr-2 text-gray-500 flex-shrink-0" /> Địa chỉ: {invite.address}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3 sm:mt-0">
                      <button
                        onClick={() => handleAcceptInvitation(invite.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-sm flex items-center cursor-pointer"
                      >
                        <CheckCircle size={16} className="mr-1" /> Chấp nhận
                      </button>
                      <button
                        onClick={() => handleDeclineInvitation(invite.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm flex items-center cursor-pointer"
                      >
                        <XCircle size={16} className="mr-1" /> Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">Không có lời mời liên kết nào.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowInvitationModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile View Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div ref={profileModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900">Hồ sơ cá nhân</h3>
              <button onClick={handleCloseProfileModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <XCircle size={24} />
              </button>
            </div>
            <Profile
              userProfile={userProfileData}
              onClose={handleCloseProfileModal}
              onEditRequest={handleEditProfileClick}
            />
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div ref={editProfileModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900">Chỉnh sửa hồ sơ</h3>
              <button onClick={handleCloseEditProfileModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <XCircle size={24} />
              </button>
            </div>
            <EditProfile
              userProfile={userProfileData}
              onClose={handleCloseEditProfileModal}
              onSave={handleSaveProfile}
            />
          </div>
        </div>
      )}

      {/* Mobile-only Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 lg:hidden z-40">
        <button
          onClick={() => setActiveMobileTab('info')}
          className={`flex flex-col items-center cursor-pointer text-xs font-medium px-3 py-1 rounded-lg transition-colors duration-200 ${activeMobileTab === 'info' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
        >
          <User size={20} className="mb-1" />
          Thông tin
        </button>
        <button
          onClick={() => setActiveMobileTab('linked')}
          className={`flex flex-col items-center cursor-pointer text-xs font-medium px-3 py-1 rounded-lg transition-colors duration-200 ${activeMobileTab === 'linked' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
        >
          <LinkIcon size={20} className="mb-1" />
          Liên kết
        </button>
        <button
          onClick={() => setActiveMobileTab('owned')}
          className={`flex flex-col items-center cursor-pointer text-xs font-medium px-3 py-1 rounded-lg transition-colors duration-200 ${activeMobileTab === 'owned' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
        >
          <Briefcase size={20} className="mb-1" />
          Sở hữu
        </button>
      </div>
    </div>
  );
};

export default PersonalSpacePage;
