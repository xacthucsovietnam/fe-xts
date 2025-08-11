import { useState } from 'react';

/**
 * Component hiển thị form để tạo một mùa vụ mới.
 *
 * @param {object} props - Các props của component.
 * @param {() => void} props.onGoBack - Hàm được gọi khi nhấn nút quay lại.
 * @param {() => void} props.onSubmit - Hàm được gọi khi nhấn nút "Bắt đầu Mùa vụ".
 */
const CreateSeasonPage = ({ onGoBack, onSubmit }: { onGoBack: () => void; onSubmit: () => void; }) => {
    // Sử dụng useState để quản lý trạng thái của các trường input trong form
    const [seasonName, setSeasonName] = useState('');
    const [producer, setProducer] = useState('Nông hộ Nguyễn Văn A');
    const [farmArea, setFarmArea] = useState('Vườn Cam Đồi A (2.5 ha)');
    const [processTemplate, setProcessTemplate] = useState('Cây Ăn Quả / Cây Công nghiệp');
    const [startDate, setStartDate] = useState('');
    const [plannedYield, setPlannedYield] = useState('');
    const [laborCost, setLaborCost] = useState('');

    const handleFormSubmit = () => {
        // Đây là nơi bạn sẽ xử lý logic để lưu dữ liệu mùa vụ mới
        // và sau đó gọi hàm onSubmit để chuyển trang
        console.log({
            seasonName,
            producer,
            farmArea,
            processTemplate,
            startDate,
            plannedYield,
            laborCost
        });
        onSubmit();
    };

    return (
        <div id="page-create-season" className="page active">
            <header className="header">
                <button className="back-button-header" onClick={onGoBack}>‹</button>
                <h1>Tạo Mùa vụ mới</h1>
            </header>
            <div className="main-content">
                <div className="form-group">
                    <label htmlFor="season-name">Tên Mùa vụ</label>
                    <input 
                        type="text" 
                        id="season-name" 
                        placeholder="Ví dụ: Vụ Cam sành Thu Đông 2025" 
                        value={seasonName}
                        onChange={(e) => setSeasonName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="producer">Chọn Người sản xuất</label>
                    <select 
                        id="producer" 
                        value={producer}
                        onChange={(e) => setProducer(e.target.value)}
                    >
                        <option>Nông hộ Nguyễn Văn A</option>
                        <option>Tổ sản xuất số 2</option>
                        <option>+ Thêm nhà sản xuất mới</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="farm-area">Chọn Vùng sản xuất</label>
                    <select 
                        id="farm-area" 
                        value={farmArea}
                        onChange={(e) => setFarmArea(e.target.value)}
                    >
                        <option>Vườn Cam Đồi A (2.5 ha)</option>
                        <option>Ao nuôi số 2 (500 m2)</option>
                        <option>+ Tạo vùng sản xuất mới</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="process-template">Chọn Quy trình Sản xuất</label>
                    <select 
                        id="process-template" 
                        value={processTemplate}
                        onChange={(e) => setProcessTemplate(e.target.value)}
                    >
                        <option>Cây Ăn Quả / Cây Công nghiệp</option>
                        <option>Rau ăn lá / Rau ăn quả</option>
                        <option>Canh tác Lúa nước</option>
                        <option>Cây lấy củ</option>
                        <option>Chăn nuôi Gia cầm</option>
                        <option>Nuôi cá Nước ngọt</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="start-date">Ngày bắt đầu</label>
                    <input 
                        type="date" 
                        id="start-date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="planned-yield">Sản lượng Kế hoạch (tùy chọn)</label>
                    <input 
                        type="number" 
                        id="planned-yield" 
                        placeholder="Ví dụ: 1500 (kg)"
                        value={plannedYield}
                        onChange={(e) => setPlannedYield(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labor-cost">Chi phí ước tính mỗi giờ công (VNĐ/h)</label>
                    <input 
                        type="number" 
                        id="labor-cost" 
                        placeholder="Ví dụ: 30.000"
                        value={laborCost}
                        onChange={(e) => setLaborCost(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-footer">
                <button onClick={handleFormSubmit}>Bắt đầu Mùa vụ</button>
            </div>
        </div>
    );
};

export default CreateSeasonPage;
