import AdminStatCard from "./AdminStatCard";
import { adminStatsData } from "./admin-overview-data";

const AdminStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {adminStatsData.map((stat) => (
        <AdminStatCard key={stat.title} stat={stat} />
      ))}
    </div>
  );
};

export default AdminStatsGrid;
