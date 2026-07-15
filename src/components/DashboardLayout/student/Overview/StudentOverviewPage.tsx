import StudentStatsGrid from "./StudentStatsGrid";
import ContinueLearningCard from "./ContinueLearningCard";
import RecentActivity from "./RecentActivity";
import StudentProfileCard from "./StudentProfileCard";
import LearningSummary from "./LearningSummary";

const StudentOverviewPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <StudentStatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-8 min-w-0">
          <ContinueLearningCard />
          <RecentActivity />
        </div>

        <div className="flex flex-col gap-8">
          <StudentProfileCard />
          <LearningSummary />
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewPage;
