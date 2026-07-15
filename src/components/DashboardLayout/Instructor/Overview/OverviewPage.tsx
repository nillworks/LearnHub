import StatsGrid from "./StatsGrid";
import RecentEnrollments from "./RecentEnrollments";
import TopPerformingCourse from "./TopPerformingCourse";
import PendingQuestions from "./PendingQuestions";
import InstructorProfileCard from "./InstructorProfileCard";

const OverviewPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-8 min-w-0">
          <RecentEnrollments />
          <TopPerformingCourse />
        </div>

        <div className="flex flex-col gap-8">
          <PendingQuestions />
          <InstructorProfileCard />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
