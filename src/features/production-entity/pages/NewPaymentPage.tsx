import React, { useState, useMemo } from 'react';
import { PlusCircle, Save, Trash2, ArrowLeft, Package, Tag, HardDrive, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmOrderModal from '../components/ConfirmOrderModal';
import PaymentModal from '../components/PaymentModal';

// Define types for new service packages
interface BasePackage {
    id: string;
    name: string;
    price: string;
    icon: React.ElementType;
}

interface MainServicePackage extends BasePackage {
    period: string;
    features: string[];
    isPopular?: boolean;
}

interface PartnerSupportPackage extends BasePackage {
    description: string;
}

interface AddonPackage extends BasePackage {
    description: string;
}

// Unified type for selected packages in the order list
interface SelectedPackage {
    id: string;
    name: string;
    type: 'Gói chính' | 'Gói bổ sung' | 'Gói hỗ trợ';
    description?: string | string[];
    price: number; // Stored as number for calculation
}

// Function to parse formatted price string to number
const parsePrice = (priceString: string): number => {
    if (!priceString) return 0;
    const cleanPrice = priceString.replace(/[^0-9]/g, '');
    return parseInt(cleanPrice, 10);
};

// Function to format price number to string
const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
};

// Mock data for packages
const mainServicePackages: MainServicePackage[] = [
    {
        id: 'goi-phat-trien',
        name: 'Gói Truyền thông cơ bản',
        price: '1.800.000 VNĐ',
        period: '/năm',
        features: ['10 mã truyền thông'],
        icon: Package,
    },
    {
        id: 'goi-chuyen-nghiep',
        name: 'Gói Mã biến đổi cơ bản',
        price: '2.000.000 VNĐ',
        period: '/năm',
        features: ['1000000 mã biến đổi'],
        isPopular: true,
        icon: Tag,
    },
    {
        id: 'goi-doanh-nghiep',
        name: 'Gói Mã biến đổi nâng cao',
        price: '3.800.000 VNĐ',
        period: '/năm',
        features: ['2000000 mã biến đổi'],
        icon: HardDrive,
    },
    {
        id: 'goi-nang-cao',
        name: 'Gói Truyền thông Nâng cao',
        price: '3.000.000 VNĐ',
        period: '/năm',
        features: ['20 Mã truyền thông'],
        icon: Users,
    },
];

const partnerSupportPackages: PartnerSupportPackage[] = [
    {
        id: 'cau-hinh-thong-tin',
        name: 'Cấu hình thông tin',
        description: 'Hỗ trợ cấu hình thông tin chi tiết cho chủ thể.',
        price: '1.000.000 VNĐ',
        icon: HardDrive,
    },
    {
        id: 'dao-tao',
        name: 'Đào tạo',
        description: 'Đào tạo sử dụng hệ thống, cài đặt và cấu hình máy in.',
        price: '1.000.000 VNĐ',
        icon: Users,
    },
    {
        id: 'ho-tro',
        name: 'Hỗ trợ',
        description: 'Thời gian hỗ trợ xuyên suốt sự kiện dịch vụ, hỗ trợ cài đặt máy in nếu gặp sự cố.',
        price: '300.000 VNĐ',
        icon: Package,
    },
];

const addonPackages: AddonPackage[] = [
    {
        id: 'ma-bien-doi-10k',
        name: 'Gói 10.000 mã biến đổi',
        description: 'Thêm 10.000 mã định danh để sử dụng cho sản phẩm.',
        price: '200.000 VNĐ',
        icon: Tag,
    },
    {
        id: 'ma-truyen-thong-20',
        name: 'Gói 20 mã truyền thông',
        description: 'Thêm 20 mã truyền thông để quảng bá sản phẩm.',
        price: '400.000 VNĐ',
        icon: Package,
    },
    {
        id: 'dung-luong-1000mb',
        name: 'Gói 1000MB Dung lượng',
        description: 'Bổ sung 1000MB dung lượng lưu trữ cho dữ liệu của bạn.',
        price: '2.000.000 VNĐ',
        icon: HardDrive,
    },
    {
        id: 'luot-kich-hoat-5k',
        name: 'Gói 5.000 lượt kích hoạt',
        description: 'Thêm 5.000 lượt kích hoạt tem cho sản phẩm của bạn.',
        price: '500.000 VNĐ',
        icon: Users,
    },
    {
        id: 'ma-bien-doi-20k',
        name: 'Gói 20.000 mã biến đổi',
        description: 'Thêm 20.000 mã định danh để sử dụng cho sản phẩm.',
        price: '350.000 VNĐ',
        icon: Tag,
    },
];


const NewPaymentPage: React.FC = () => {
    const navigate = useNavigate();

    // State to hold the list of selected packages
    const [services, setServices] = useState<SelectedPackage[]>([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [orderCode, setOrderCode] = useState('');

    // Combine all packages into a single object for easy lookup
    const allPackages = useMemo(() => {
        const packagesMap = new Map<string, SelectedPackage>();

        mainServicePackages.forEach(pkg => packagesMap.set(pkg.id, {
            id: pkg.id,
            name: pkg.name,
            type: 'Gói chính',
            description: pkg.features,
            price: parsePrice(pkg.price),
        }));

        partnerSupportPackages.forEach(pkg => packagesMap.set(pkg.id, {
            id: pkg.id,
            name: pkg.name,
            type: 'Gói hỗ trợ',
            description: pkg.description,
            price: parsePrice(pkg.price),
        }));

        addonPackages.forEach(pkg => packagesMap.set(pkg.id, {
            id: pkg.id,
            name: pkg.name,
            type: 'Gói bổ sung',
            description: pkg.description,
            price: parsePrice(pkg.price),
        }));

        return packagesMap;
    }, []);

    // Handle package change from dropdown
    const handlePackageChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPackageId = e.target.value;
        const selectedPackage = allPackages.get(selectedPackageId);

        if (selectedPackage) {
            setServices(prev => {
                const newServices = [...prev];

                // Check for the "only one main package" rule
                if (selectedPackage.type === 'Gói chính' && newServices.some((s, i) => s.type === 'Gói chính' && i !== index)) {
                    // If a main package already exists and this is a new main package,
                    // find the old main package and replace it.
                    const oldMainIndex = newServices.findIndex(s => s.type === 'Gói chính');
                    if (oldMainIndex > -1) {
                        newServices.splice(oldMainIndex, 1);
                    }
                }

                // Update or add the new package
                newServices[index] = selectedPackage;
                return newServices;
            });
        }
    };


    // Add a new package row
    const handleAddPackage = () => {
        // Add a default AddonPackage when the button is clicked
        const defaultPackage = addonPackages[0];
        const newId = `new_addon_${Date.now()}`;

        setServices(prev => [
            ...prev,
            {
                id: newId,
                name: defaultPackage.name,
                type: 'Gói bổ sung',
                description: defaultPackage.description,
                price: parsePrice(defaultPackage.price),
            },
        ]);
    };

    // Delete a package row
    const handleDeletePackage = (id: string) => {
        setServices(prev => prev.filter(service => service.id !== id));
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return services.reduce((sum, service) => sum + service.price, 0);
    };

    // Handle form submission to open the confirmation modal
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (services.length > 0) {
            setIsConfirmModalOpen(true);
        }
    };

    // Handle confirmation from the modal, then open payment modal
    const handleConfirmAndPay = () => {
        setIsConfirmModalOpen(false);

        // Generate a mock order code
        const newOrderCode = `DH${Date.now()}`;
        setOrderCode(newOrderCode);

        setIsPaymentModalOpen(true);
    };

    // Handle payment success from the payment modal
    const handlePaymentSuccess = () => {
        setIsSubmitting(true);
        setMessage('');

        // Simulate API call to update payment status
        setTimeout(() => {
            setMessage('Đang xử lý thanh toán...');
            setTimeout(() => {
                setIsSubmitting(false);
                setMessage('Đơn hàng đã được thanh toán thành công và đang chờ duyệt!');
                setTimeout(() => {
                    navigate('/production-entity/payment');
                }, 1500);
            }, 2000);
        }, 1500);
    };

    // Navigate back
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
            <div className="flex items-center mb-6">
                <button
                    onClick={handleBack}
                    className="flex items-center cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft size={24} />
                    <span className="ml-2 font-medium">Quay lại</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6 pb-4">
                    <div className="flex items-center">
                        <PlusCircle size={24} className="mr-2 text-blue-600" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Tạo đơn hàng thanh toán mới</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Service list section */}
                    <div className="space-y-6 p-6 border rounded-xl bg-gray-50">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <h2 className="text-lg font-semibold text-gray-700">Danh sách gói dịch vụ</h2>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleAddPackage}
                                    className="flex items-center cursor-pointer gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <PlusCircle size={16} /> Thêm dịch vụ
                                </button>
                            </div>
                        </div>

                        {services.length === 0 ? (
                            <p className="text-center text-gray-500 italic">Chưa có gói dịch vụ nào được thêm vào.</p>
                        ) : (
                            <div className="overflow-x-auto -mx-6 sm:mx-0">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-white">
                                        <tr>
                                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">STT</th>
                                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gói dịch vụ</th>
                                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại gói</th>
                                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đặc điểm</th>
                                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá tiền</th>
                                            <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {services.map((service, index) => (
                                            <tr key={service.id}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                                    <select
                                                        value={service.id}
                                                        onChange={(e) => handlePackageChange(index, e)}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    >
                                                        <option value="" disabled>Chọn gói dịch vụ</option>
                                                        <optgroup label="Gói chính">
                                                            {mainServicePackages.map(pkg => (
                                                                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                                            ))}
                                                        </optgroup>
                                                        <optgroup label="Gói bổ sung">
                                                            {addonPackages.map(pkg => (
                                                                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                                            ))}
                                                        </optgroup>
                                                        <optgroup label="Gói hỗ trợ">
                                                            {partnerSupportPackages.map(pkg => (
                                                                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                                            ))}
                                                        </optgroup>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                                                        {service.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                                    {Array.isArray(service.description) ? service.description.join(', ') : service.description}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{formatPrice(service.price)}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeletePackage(service.id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <span className="text-lg font-semibold text-gray-800">Tổng tiền:</span>
                            <span className="text-xl font-bold text-blue-700">{formatPrice(calculateTotalPrice())}</span>
                        </div>
                    </div>

                    {/* Message display section */}
                    {message && (
                        <div className="mt-4 p-4 text-center text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                            {message}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 sm:flex-initial cursor-pointer py-3 px-6 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || services.length === 0}
                            className={`flex-1 cursor-pointer sm:flex-initial flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white transition-colors duration-200
                ${isSubmitting || services.length === 0
                                    ? 'bg-blue-300 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <Save size={16} />
                            {isSubmitting ? 'Đang lưu...' : 'Xác nhận'}
                        </button>
                    </div>
                </form>

                {isConfirmModalOpen && (
                    <ConfirmOrderModal
                        onClose={() => setIsConfirmModalOpen(false)}
                        onConfirmAndPay={handleConfirmAndPay}
                        totalAmount={calculateTotalPrice()}
                    />
                )}

                {isPaymentModalOpen && (
                    <PaymentModal
                        onClose={() => setIsPaymentModalOpen(false)}
                        onPaymentSuccess={handlePaymentSuccess}
                        orderCode={orderCode}
                        totalAmount={calculateTotalPrice()}
                    />
                )}
            </div>
        </div>
    );
};

export default NewPaymentPage;
