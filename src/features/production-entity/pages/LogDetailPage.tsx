import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Pencil, Plus } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho nhật ký
interface Logbook {
  id: string;
  name: string;
  producer: string;
  productionArea: string;
  productionProcess: string;
  startDate: string;
  endDate: string | null;
  plannedOutput: number | null;
  actualOutput: number | null;
  estimatedCost: number | null;
  actualCost: number | null;
  status: 'Mới tạo' | 'Đang hoạt động' | 'Khóa' | 'Hoàn thành' | 'Kết thúc';
  createdAt: string;
  creator: string;
}

// Định nghĩa kiểu dữ liệu cho hoạt động
interface Activity {
  id: string;
  icon: string;
  name: string;
  time: string;
  timestamp: number;
  description: string | null;
  hours: number | null;
  yield: number | null;
  supply: string | null;
  quantity: number | null;
}

// Định nghĩa kiểu dữ liệu cho workProcess để tránh lỗi indexing
interface WorkProcess {
  [key: string]: {
    icon: string;
    tasks: string[];
  };
}

// Giả lập dữ liệu và logic
const workProcess: WorkProcess = {
  'Sử dụng vật tư': { icon: '📦', tasks: ['Bón phân', 'Phun thuốc BVTV'] },
  'Giai đoạn Chăm sóc': { icon: '💧', tasks: ['Tưới nước', 'Làm cỏ'] },
  'Giai đoạn Thu hoạch': { icon: '🧺', tasks: ['Thu hoạch sản phẩm'] },
  'Công việc khác': { icon: '📝', tasks: ['Ghi chép tự do'] },
};

const supplies = {
  'Phân NPK Đầu Trâu': { unit: 'kg', price: 25000 },
  'Thuốc trừ sâu Radiant': { unit: 'gói', price: 15000 },
};

// Dữ liệu nhật ký giả lập
const mockLogbook: Logbook = {
  id: '1',
  name: 'Vụ Bưởi Diễn Tết 2026',
  producer: 'Nông hộ Nguyễn Văn A',
  productionArea: 'Vườn Cam Đồi A',
  productionProcess: 'Cây Ăn Quả / Cây Công nghiệp',
  startDate: '15/02/2025',
  endDate: null,
  plannedOutput: 1500,
  actualOutput: 1200,
  estimatedCost: null,
  actualCost: null,
  status: 'Đang hoạt động',
  createdAt: '18/05/2025',
  creator: 'Nguyễn Văn A',
};

// Dữ liệu hoạt động giả lập
const mockActivities: Activity[] = [
  {
    id: 'a1',
    icon: '💧',
    name: 'Tưới nước định kỳ',
    time: '10/08/2025 10:00',
    timestamp: 1723258800000,
    description: 'Tưới 2 tiếng',
    hours: 2,
    yield: null,
    supply: null,
    quantity: null,
  },
  {
    id: 'a2',
    icon: '📦',
    name: 'Bón phân',
    time: '08/08/2025 08:30',
    timestamp: 1723075800000,
    description: null,
    hours: 1,
    yield: null,
    supply: 'Phân NPK Đầu Trâu',
    quantity: 15,
  },
  {
    id: 'a3',
    icon: '🧺',
    name: 'Thu hoạch sản phẩm',
    time: '12/08/2025 09:00',
    timestamp: 1723438800000,
    description: null,
    hours: 3,
    yield: 150,
    supply: null,
    quantity: null,
  },
];

// Hàm helper để lấy tên nhóm công việc từ tên công việc
// Đã di chuyển hàm này ra ngoài component để tránh lỗi "before initialization"
const getGroupNameByTask = (taskName: string): string => {
  for (const group in workProcess) {
    if (workProcess[group].tasks.includes(taskName)) {
      return group;
    }
  }
  return 'Công việc khác';
};


// --- (Modal Components) ---

interface WorkGroupSelectionModalProps {
  onClose: () => void;
  onSelectGroup: (groupName: string) => void;
}

const WorkGroupSelectionModal: React.FC<WorkGroupSelectionModalProps> = ({
  onClose,
  onSelectGroup,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-500/75">
      <div className="bg-white rounded-t-3xl w-full max-w-md shadow-lg transform transition-transform duration-300 ease-out translate-y-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-center">
            Chọn Nhóm công việc
          </h2>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {Object.keys(workProcess).map((groupName) => (
            <button
              key={groupName}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => onSelectGroup(groupName)}
            >
              <span className="flex items-center text-lg font-medium text-gray-800">
                <span className="mr-3 text-2xl">
                  {workProcess[groupName].icon}
                </span>
                {groupName}
              </span>
              <span className="text-gray-400">&gt;</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

interface WorkTaskSelectionModalProps {
  onBack: () => void;
  onSelectTask: (taskName: string) => void;
  groupName: string;
}

const WorkTaskSelectionModal: React.FC<WorkTaskSelectionModalProps> = ({
  onBack,
  onSelectTask,
  groupName,
}) => {
  const tasks = workProcess[groupName]?.tasks || [];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-500/75">
      <div className="bg-white rounded-t-3xl w-full max-w-md shadow-lg transform transition-transform duration-300 ease-out translate-y-0">
        <div className="flex items-center p-6 border-b border-gray-200">
          <button onClick={onBack} className="text-gray-500 mr-4">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-center flex-1">
            Chọn Công việc
          </h2>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {tasks.map((taskName: string) => (
            <button
              key={taskName}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => onSelectTask(taskName)}
            >
              <span className="text-lg font-medium text-gray-800">
                {taskName}
              </span>
              <span className="text-gray-400">&gt;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface WorkLogFormModalProps {
  onClose: () => void;
  onBack: () => void;
  onSave: (formData: FormData) => void;
  onEdit: (activityId: string) => void;
  taskName: string;
  groupName: string;
  initialData: Activity | null;
  isEditing: boolean;
}

interface FormData {
  workName: string;
  time: string;
  description: string;
  hours: string;
  yield: string;
  supply: string;
  quantity: string;
}

const WorkLogFormModal: React.FC<WorkLogFormModalProps> = ({
  onClose,
  onBack,
  onSave,
  onEdit,
  taskName,
  groupName,
  initialData,
  isEditing,
}) => {
  const [formData, setFormData] = useState<FormData>({
    workName: taskName,
    time: initialData?.time || new Date().toISOString().slice(0, 16),
    description: initialData?.description || '',
    hours: initialData?.hours?.toString() || '',
    yield: initialData?.yield?.toString() || '',
    supply: initialData?.supply || '',
    quantity: initialData?.quantity?.toString() || '',
  });

  const isSupplyTask = groupName === 'Sử dụng vật tư';
  const isHarvesting = taskName === 'Thu hoạch sản phẩm';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) {
      if (initialData) {
        onEdit(initialData.id); // Assuming onEdit now handles deletion
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-500/75">
      <div className="bg-white rounded-t-3xl w-full max-w-md shadow-lg transform transition-transform duration-300 ease-out translate-y-0">
        <div className="flex items-center p-6 border-b border-gray-200">
          <button onClick={onBack} className="text-gray-500 mr-4">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-center flex-1">
            {isEditing ? 'Sửa' : 'Ghi chép'}: {taskName}
          </h2>
        </div>
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-1">
            <label className="block text-sm text-gray-500">Tên công việc</label>
            <input
              type="text"
              id="workName"
              value={formData.workName}
              disabled
              className="w-full p-3 border rounded-xl bg-gray-100 text-gray-800"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm text-gray-500">Thời gian</label>
            <input
              type="datetime-local"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-50"
            />
          </div>

          {isSupplyTask && (
            <>
              <div className="space-y-1">
                <label className="block text-sm text-gray-500">
                  Chọn vật tư
                </label>
                <select
                  id="supply"
                  value={formData.supply}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                >
                  <option value="">Chọn vật tư</option>
                  {Object.keys(supplies).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm text-gray-500">
                  Số lượng đã dùng
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Ví dụ: 2.5"
                  className="w-full p-3 border rounded-xl bg-gray-50"
                />
              </div>
            </>
          )}

          {isHarvesting && (
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">
                Sản lượng thu hoạch (kg)
              </label>
              <input
                type="number"
                id="yield"
                value={formData.yield}
                onChange={handleChange}
                placeholder="Ví dụ: 150.5"
                className="w-full p-3 border rounded-xl bg-gray-50"
              />
            </div>
          )}

          {!isSupplyTask && !isHarvesting && (
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">
                Mô tả công việc
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ghi chú thêm nếu cần..."
                className="w-full p-3 border rounded-xl bg-gray-50"
              ></textarea>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm text-gray-500">
              Số giờ công (tùy chọn)
            </label>
            <input
              type="number"
              id="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Ví dụ: 2.5"
              className="w-full p-3 border rounded-xl bg-gray-50"
            />
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex space-x-2">
          {isEditing && (
            <button
              className="px-4 py-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
              onClick={handleDelete}
            >
              Xóa
            </button>
          )}
          <button
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700"
            onClick={handleSave}
          >
            Lưu lại
          </button>
        </div>
      </div>
    </div>
  );
};

// --- (Main Component - LogDetailPage) ---

const LogDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'logbook' | 'report' | 'harvest'>('logbook');
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'group' | 'task' | 'form'>('group');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<Activity | null>(null);

  // Lọc danh sách thu hoạch từ các hoạt động
  const harvests = activities.filter(
    (activity) => getGroupNameByTask(activity.name) === 'Giai đoạn Thu hoạch',
  );

  const logbook = mockLogbook;

  const plannedOutputTons = logbook.plannedOutput ? logbook.plannedOutput / 1000 : 0;
  const actualOutputTons = logbook.actualOutput ? logbook.actualOutput / 1000 : 0;
  const completionRate = plannedOutputTons > 0 ? (actualOutputTons / plannedOutputTons) * 100 : 0;

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenWorkGroupSelection = () => {
    setInitialData(null);
    setIsEditing(false);
    setModalStep('group');
    setShowModal(true);
  };

  const handleSelectGroup = (groupName: string) => {
    setSelectedGroup(groupName);
    setModalStep('task');
  };

  const handleSelectTask = (taskName: string) => {
    setSelectedTask(taskName);
    setModalStep('form');
  };


  const handleSaveLog = (formData: FormData) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      icon: workProcess[selectedGroup]?.icon || '📝',
      name: formData.workName,
      time: new Date(formData.time).toLocaleString('vi-VN'),
      timestamp: new Date(formData.time).getTime(),
      description: formData.description,
      hours: formData.hours ? parseFloat(formData.hours) : null,
      yield: formData.yield ? parseFloat(formData.yield) : null,
      supply: formData.supply || null,
      quantity: formData.quantity ? parseFloat(formData.quantity) : null,
    };

    setActivities((prev) => [newActivity, ...prev]);
    setShowModal(false);
  };

  const handleEditLog = (activityId: string) => {
    const activityToEdit = activities.find((act) => act.id === activityId);
    if (!activityToEdit) return;

    const now = new Date().getTime();
    const ageInHours = (now - activityToEdit.timestamp) / (3600 * 1000);
    if (ageInHours > 24) {
      alert('Bản ghi này đã quá 24 giờ và đã được khoá. Bạn không thể sửa hoặc xoá.');
      return;
    }

    setInitialData(activityToEdit);
    setIsEditing(true);
    setSelectedGroup(getGroupNameByTask(activityToEdit.name));
    setSelectedTask(activityToEdit.name);
    setModalStep('form');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackToGroup = () => {
    setModalStep('group');
  };

  const handleBackToTask = () => {
    setModalStep('task');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header Mobile */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-500 cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {logbook.name}
            </h1>
            <p className="text-sm text-gray-500">
              Bắt đầu ngày {logbook.startDate}
            </p>
          </div>
          <div className="w-6" /> {/* Placeholder for alignment */}
        </div>
        <div className="mt-4 flex rounded-lg overflow-hidden bg-gray-200 p-1">
          <button
            className={`flex-1 cursor-pointer text-center py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'logbook'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('logbook')}
          >
            Nhật ký
          </button>
          <button
            className={`flex-1 cursor-pointer text-center py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'harvest'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('harvest')}
          >
            Thu hoạch
          </button>
          <button
            className={`flex-1 cursor-pointer text-center py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'report'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('report')}
          >
            Báo cáo
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Nhật ký Tab */}
        {activeTab === 'logbook' && (
          <div>
            <div
              className="bg-green-500 rounded-xl p-6 text-white text-center shadow-md cursor-pointer"
              onClick={handleOpenWorkGroupSelection}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <Plus size={36} />
                <span className="font-semibold text-lg">Ghi chép Công việc</span>
              </div>
            </div>
            {/* Hoạt động gần đây */}
            <div className="mt-6">
              <h2 className="text-gray-600 text-lg font-semibold">
                Hoạt động gần đây
              </h2>
              {/* Vùng hiển thị các hoạt động */}
              {activities.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl">{activity.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-medium">
                            {activity.name}
                          </span>
                          <span className="text-gray-500 text-sm mt-1">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <button
                        className="text-gray-400 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleEditLog(activity.id)}
                      >
                        <Pencil size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-gray-500 text-center">
                  Chưa có hoạt động nào được ghi nhận.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Thu hoạch Tab */}
        {activeTab === 'harvest' && (
          <div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Các lần thu hoạch
              </h2>
              {harvests.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {harvests.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl">{activity.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-medium">
                            {activity.name}
                          </span>
                          <span className="text-gray-500 text-sm mt-1">
                            {activity.time}
                          </span>
                          {activity.yield && (
                            <span className="text-green-600 font-bold mt-1">
                              Sản lượng: {activity.yield} kg
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        className="text-gray-400 hover:text-blue-500 cursor-pointer"
                        onClick={() => handleEditLog(activity.id)}
                      >
                        <Pencil size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-gray-500 text-center">
                  Chưa có lần thu hoạch nào được ghi nhận.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Báo cáo Tab */}
        {activeTab === 'report' && (
          <div>
            {/* Thông tin Định danh */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Thông tin Định danh
              </h2>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <label className="block text-sm text-gray-500">
                    Người sản xuất
                  </label>
                  <p className="mt-1 text-gray-800 font-medium">
                    {logbook.producer}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Vùng sản xuất
                  </label>
                  <p className="mt-1 text-gray-800 font-medium">
                    {logbook.productionArea}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-500">
                    Diện tích
                  </label>
                  <p className="mt-1 text-gray-800 font-medium">2.5 ha</p>
                </div>
              </div>
            </div>

            {/* So sánh Kế hoạch & Thực tế */}
            <div className="bg-white p-4 rounded-xl shadow-md mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                So sánh Kế hoạch & Thực tế
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500">Kế hoạch</p>
                  <p className="font-bold text-xl mt-1 text-gray-900">
                    {plannedOutputTons} tấn
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500">Thực tế</p>
                  <p className="font-bold text-xl mt-1 text-gray-900">
                    {actualOutputTons} tấn
                  </p>
                </div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg mt-4 text-center">
                <p className="text-green-800 font-bold text-xl">
                  Tỷ lệ Hoàn thành Kế hoạch
                </p>
                <p className="text-green-800 font-bold text-3xl mt-2">
                  {completionRate.toFixed(0)} %
                </p>
              </div>
            </div>

            {/* Thống kê Chi phí & Hoạt động */}
            <div className="bg-white p-4 rounded-xl shadow-md mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Thống kê Chi phí & Hoạt động
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500">Chi phí vật tư</p>
                  <p className="font-bold text-xl mt-1 text-gray-900">8.2 tr</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500">Chi phí nhân công</p>
                  <p className="font-bold text-xl mt-1 text-gray-900">4.5 tr</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && modalStep === 'group' && (
        <WorkGroupSelectionModal
          onClose={handleCloseModal}
          onSelectGroup={handleSelectGroup}
        />
      )}
      {showModal && modalStep === 'task' && (
        <WorkTaskSelectionModal
          onBack={handleBackToGroup}
          onSelectTask={handleSelectTask}
          groupName={selectedGroup}
        />
      )}
      {showModal && modalStep === 'form' && (
        <WorkLogFormModal
          onClose={handleCloseModal}
          onBack={handleBackToTask}
          onSave={handleSaveLog}
          onEdit={handleEditLog}
          taskName={selectedTask}
          groupName={selectedGroup}
          initialData={initialData}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default LogDetailPage;
