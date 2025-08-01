// src/features/user/Profile.tsx
import React from 'react';
import {
  User, Mail, Phone, Calendar, IdCard, MapPin, Building, // Basic info icons
  Edit, // Edit button icon
  XCircle // Close button icon for modal
} from 'lucide-react';

// Import UserProfileData interface
// Import UserProfileData interface
import type { UserProfileData } from '../../types/user'; // Path from src/features/user to src/types
 // Path from src/features/user to src/types

// Constants for fallback image URLs
const FALLBACK_AVATAR_URL = 'https://placehold.co/100x100/cccccc/333333?text=User';

/**
 * Handles image loading errors by setting a fallback source.
 * @param e - The synthetic event from the image element.
 * @param fallbackSrc - The URL of the fallback image.
 */
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
  e.currentTarget.src = fallbackSrc;
};

// Define props for the Profile component
interface ProfileProps {
  userProfile: UserProfileData;
  onClose: () => void; // Callback to close the modal
  onEditRequest: () => void; // Callback to request opening the edit modal
}

/**
 * Profile Component
 *
 * This component displays the detailed profile information of the user in a read-only format.
 * It is designed to be used as content within a modal.
 * It includes personal details, contact information, identification, and full address.
 * A button is provided to trigger the profile editing modal.
 */
const Profile: React.FC<ProfileProps> = ({ userProfile, onClose, onEditRequest }) => {

  return (
    <div className="p-4 sm:p-6"> {/* Adjusted padding for modal content */}
      <section className="mb-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0 text-center p-4"> {/* Added padding */}
          <img
            src={userProfile.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md mx-auto"
            onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)}
          />
          <h3 className="text-xl font-bold text-gray-900 mt-4">{userProfile.fullName}</h3>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-base p-4"> {/* Added padding */}
          {/* Basic Info */}
          <div className="flex items-center">
            <User size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Giới tính</p>
              <p className="font-medium">{userProfile.gender}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Ngày sinh</p>
              <p className="font-medium">{userProfile.dateOfBirth}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center">
            <Phone size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Số điện thoại Zalo</p>
              <p className="font-medium">{userProfile.phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userProfile.email}</p>
            </div>
          </div>

          {/* Identification Info */}
          <div className="flex items-center">
            <IdCard size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Số CCCD</p>
              <p className="font-medium">{userProfile.cccd}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Ngày cấp</p>
              <p className="font-medium">{userProfile.issueDate}</p>
            </div>
          </div>
          <div className="flex items-center sm:col-span-2">
            <Building size={20} className="mr-3 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Nơi cấp</p>
              <p className="font-medium">{userProfile.issuePlace}</p>
            </div>
          </div>

          {/* Full Address */}
          <div className="flex items-start sm:col-span-2">
            <MapPin size={20} className="mr-3 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Địa chỉ</p>
              <p className="font-medium">
                {userProfile.address.street}, {userProfile.address.ward}, {userProfile.address.district}, {userProfile.address.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end mt-6">
        <button
          onClick={onEditRequest}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-base font-semibold flex items-center cursor-pointer"
        >
          <Edit size={20} className="mr-2" /> Chỉnh sửa hồ sơ
        </button>
      </div>
    </div>
  );
};

export default Profile;
