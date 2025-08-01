// src/types/user.d.ts

// Định nghĩa kiểu dữ liệu cho thông tin địa chỉ
export interface AddressData {
    street: string;
    ward: string;
    district: string;
    city: string;
  }
  
  // Định nghĩa kiểu dữ liệu cho hồ sơ người dùng
  export interface UserProfileData {
    avatar: string;
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    cccd: string;
    issueDate: string;
    issuePlace: string;
    address: AddressData;
    linkedEntitiesCount: number;
    ownedEntitiesCount: number;
    userRoleEntitiesCount: number;
  }
  