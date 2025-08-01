// src/features/user/EditProfile.tsx
import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Calendar, IdCard, MapPin, Building, // Basic info icons
  Save, XCircle, // Save, Cancel icons
  UploadCloud, // Avatar upload icon
} from 'lucide-react';

// Import UserProfileData and AddressData interfaces
// Import UserProfileData and AddressData interfaces
import type { UserProfileData, AddressData } from '../../types/user'; // Path from src/features/user to src/types
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

// Mock data for select boxes (replace with actual API data)
const mockCities = [
  { id: 'hn', name: 'Thành phố Hà Nội' },
  { id: 'hcm', name: 'Thành phố Hồ Chí Minh' },
  { id: 'dn', name: 'Thành phố Đà Nẵng' },
];

const mockDistricts = {
  hn: [{ id: 'hd', name: 'Quận Hoàn Kiếm' }, { id: 'bd', name: 'Quận Ba Đình' }],
  hcm: [{ id: 'q1', name: 'Quận 1' }, { id: 'tb', name: 'Quận Tân Bình' }],
  dn: [{ id: 'hc', name: 'Quận Hải Châu' }, { id: 'st', name: 'Quận Sơn Trà' }],
};

const mockWards = {
  hd: [{ id: 'cld', name: 'Phường Cửa Lô' }, { id: 'trh', name: 'Phường Tràng Tiền' }],
  q1: [{ id: 'bng', name: 'Phường Bến Nghé' }, { id: 'cl', name: 'Phường Cầu Ông Lãnh' }],
};


// Define props for the EditProfile component
interface EditProfileProps {
  userProfile: UserProfileData;
  onClose: () => void; // Callback to close the modal
  onSave: (updatedProfile: UserProfileData) => void; // Callback to save and update parent state
}

/**
 * EditProfile Component
 *
 * This component allows the user to edit their profile information.
 * It is designed to be used as content within a modal.
 * It features editable fields for avatar, full name, date of birth, gender,
 * CCCD details, and a structured address input with select boxes for city/province and ward/district.
 * Non-editable fields are displayed as read-only.
 */
const EditProfile: React.FC<EditProfileProps> = ({ userProfile, onClose, onSave }) => {
  const [editableUserProfile, setEditableUserProfile] = useState<UserProfileData>(userProfile);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWardId, setSelectedWardId] = useState('');

  // Effect to set initial district/ward based on full address when component mounts or userProfile changes
  useEffect(() => {
    const initialCity = mockCities.find(c => c.name === editableUserProfile.address.city);
    if (initialCity) {
      setSelectedCityId(initialCity.id);
      const districtsForCity = mockDistricts[initialCity.id as keyof typeof mockDistricts];
      const initialDistrict = districtsForCity?.find(d => d.name === editableUserProfile.address.district);
      if (initialDistrict) {
        setSelectedDistrictId(initialDistrict.id);
        const wardsForDistrict = mockWards[initialDistrict.id as keyof typeof mockWards];
        const initialWard = wardsForDistrict?.find(w => w.name === editableUserProfile.address.ward);
        if (initialWard) {
          setSelectedWardId(initialWard.id);
        }
      }
    }
  }, [editableUserProfile]); // Re-run if userProfile changes (e.g., after a save and re-opening modal)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setEditableUserProfile(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setEditableUserProfile(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    setSelectedDistrictId(''); // Reset district when city changes
    setSelectedWardId('');     // Reset ward when city changes
    const cityName = mockCities.find(c => c.id === cityId)?.name || '';
    setEditableUserProfile(prev => ({
      ...prev,
      address: { ...prev.address, city: cityName, district: '', ward: '' },
    }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrictId(districtId);
    setSelectedWardId(''); // Reset ward when district changes
    const districtName = (mockDistricts[selectedCityId as keyof typeof mockDistricts] || []).find(d => d.id === districtId)?.name || '';
    setEditableUserProfile(prev => ({
      ...prev,
      address: { ...prev.address, district: districtName, ward: '' },
    }));
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardId = e.target.value;
    setSelectedWardId(wardId);
    const wardName = (mockWards[selectedDistrictId as keyof typeof mockWards] || []).find(w => w.id === wardId)?.name || '';
    setEditableUserProfile(prev => ({
      ...prev,
      address: { ...prev.address, ward: wardName },
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditableUserProfile(prev => ({ ...prev, avatar: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log('Saving profile:', editableUserProfile);
    onSave(editableUserProfile); // Call parent's onSave with updated data
  };

  const handleCancel = () => {
    onClose(); // Call parent's onClose to close the modal
  };

  return (
    <div className="p-4 sm:p-6"> {/* Adjusted padding for modal content */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <section className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Avatar */}
          <div className="md:col-span-2 flex flex-col items-center mb-4">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={editableUserProfile.avatar}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-blue-300 shadow-md"
                onError={(e) => handleImageError(e, FALLBACK_AVATAR_URL)}
              />
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition duration-200 shadow-lg">
                <UploadCloud size={20} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <p className="text-gray-700 font-semibold text-lg">{editableUserProfile.fullName}</p>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Tên người dùng:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={editableUserProfile.fullName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Zalo Phone (Non-editable) */}
          <div>
            <label htmlFor="zaloPhone" className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại Zalo:</label>
            <input
              type="text"
              id="zaloPhone"
              name="zaloPhone"
              value={editableUserProfile.phone}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email (Non-editable) */}
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editableUserProfile.email}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Ngày sinh:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={editableUserProfile.dateOfBirth}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Giới tính:</label>
            <select
              id="gender"
              name="gender"
              value={editableUserProfile.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* CCCD */}
          <div>
            <label htmlFor="cccd" className="block text-gray-700 text-sm font-bold mb-2">Số CCCD:</label>
            <input
              type="text"
              id="cccd"
              name="cccd"
              value={editableUserProfile.cccd}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label htmlFor="issueDate" className="block text-gray-700 text-sm font-bold mb-2">Ngày cấp:</label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={editableUserProfile.issueDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Issue Place */}
          <div>
            <label htmlFor="issuePlace" className="block text-gray-700 text-sm font-bold mb-2">Nơi cấp:</label>
            <input
              type="text"
              id="issuePlace"
              name="issuePlace"
              value={editableUserProfile.issuePlace}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address Fields */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Địa chỉ</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tỉnh/Thành phố */}
              <div>
                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">Tỉnh/Thành phố:</label>
                <select
                  id="city"
                  name="address.city"
                  value={selectedCityId}
                  onChange={handleCityChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {mockCities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Quận/Huyện */}
              <div>
                <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">Quận/Huyện:</label>
                <select
                  id="district"
                  name="address.district"
                  value={selectedDistrictId}
                  onChange={handleDistrictChange}
                  disabled={!selectedCityId}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {selectedCityId && mockDistricts[selectedCityId as keyof typeof mockDistricts]?.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>

              {/* Xã/Phường */}
              <div>
                <label htmlFor="ward" className="block text-gray-700 text-sm font-bold mb-2">Xã/Phường:</label>
                <select
                  id="ward"
                  name="address.ward"
                  value={selectedWardId}
                  onChange={handleWardChange}
                  disabled={!selectedDistrictId}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  <option value="">Chọn Xã/Phường</option>
                  {selectedDistrictId && mockWards[selectedDistrictId as keyof typeof mockWards]?.map(ward => (
                    <option key={ward.id} value={ward.id}>{ward.name}</option>
                  ))}
                </select>
              </div>

              {/* Số nhà, đường phố */}
              <div>
                <label htmlFor="street" className="block text-gray-700 text-sm font-bold mb-2">Số nhà, đường phố:</label>
                <input
                  type="text"
                  id="street"
                  name="address.street"
                  value={editableUserProfile.address.street}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end mt-8 space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 text-base font-semibold flex items-center cursor-pointer"
          >
            <XCircle size={20} className="mr-2" /> Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 text-base font-semibold flex items-center cursor-pointer"
          >
            <Save size={20} className="mr-2" /> Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
