import StatCard from "./StatCard";
import { statsData } from "./overview-data";

const StatsGrid = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default StatsGrid;
