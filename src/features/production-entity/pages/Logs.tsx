import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả cho danh sách mùa vụ
const fakeSeasons = [
  {
    id: 'season-01',
    icon: '🍊',
    name: 'Vụ Bưởi Diễn Tết 2026',
    startDate: '15/02/2025',
  },
  {
    id: 'season-02',
    icon: '🐔',
    name: 'Lứa Gà ri tháng 8',
    startDate: '01/08/2025',
  },
];

const Seasons: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateSeason = () => {
    navigate('/create-season');
  };

  const handleViewSeasonDetail = (seasonId: string) => {
    navigate(`/season-detail/${seasonId}`);
  };

  return (
    <div id="page-seasons" className="page active">
      <header className="header">
        <h1>Nhật ký Sản xuất</h1>
      </header>
      <div className="main-content">
        <div className="main-action-card" onClick={handleCreateSeason}>
          <div className="icon">➕</div>
          <div className="text">Tạo Mùa vụ mới</div>
        </div>
        <div className="section-title">Các mùa vụ đang diễn ra</div>
        <ul className="item-list">
          {fakeSeasons.map((season) => (
            <li
              key={season.id}
              className="list-item"
              onClick={() => handleViewSeasonDetail(season.id)}
            >
              <div className="icon">{season.icon}</div>
              <div className="details">
                <div className="name">{season.name}</div>
                <div className="time">Bắt đầu {season.startDate}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Seasons;