import Image from "next/image";
import { BadgeCheck, BookOpen, Users, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { instructorProfile } from "./overview-data";

const InstructorProfileCard = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="h-20 bg-gradient-to-r from-primary via-primary-hover to-primary-dark" />

      <div className="px-6 pb-6 -mt-10 relative">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full ring-4 ring-white dark:ring-[#1e293b] overflow-hidden relative">
            <Image
              src={instructorProfile.image}
              alt={instructorProfile.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-primary rounded-full">
            <BadgeCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-heading font-bold text-text-primary dark:text-surface">
              {instructorProfile.name}
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full uppercase tracking-wider">
              Verified
            </span>
          </div>
          <p className="text-sm font-body text-text-secondary mt-0.5">
            {instructorProfile.email}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full">
            {instructorProfile.role}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-border dark:border-secondary">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <BookOpen className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {instructorProfile.coursesPublished}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Courses Published
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <Users className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {instructorProfile.studentsTaught.toLocaleString()}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Students Taught
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <Calendar className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {instructorProfile.memberSince}
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Member Since
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-light dark:bg-primary-dark/20">
              <Award className="w-4 h-4 text-primary-dark dark:text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading text-text-primary dark:text-surface">
                {instructorProfile.completionScore}%
              </p>
              <p className="text-[11px] font-body text-text-secondary">
                Completion Score
              </p>
            </div>
          </div>
        </div>

        <button
          className={cn(
            "w-full mt-5 px-5 py-3 rounded-2xl text-sm font-semibold font-body",
            "bg-primary hover:bg-primary-hover text-white",
            "transition-all duration-200 cursor-pointer"
          )}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default InstructorProfileCard;
