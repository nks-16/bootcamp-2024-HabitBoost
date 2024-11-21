import Calendar from './components/Calendar';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="calendar-section">
        <Calendar />
      </div>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
