import StudentStatCard from "./StudentStatCard";
import { studentStats } from "./student-overview-data";

const StudentStatsGrid = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat) => (
          <StudentStatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default StudentStatsGrid;
