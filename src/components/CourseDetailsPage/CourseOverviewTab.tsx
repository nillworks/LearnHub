import React from 'react';
import { Users, ChevronRight, Globe, BarChart, Tag, Clock, Calendar, Award, Smartphone } from 'lucide-react';

const getVal = (field: any, defaultVal: string) => {
  if (!field) return defaultVal;
  if (typeof field === 'string') return field;
  return field.label || field.value || defaultVal;
};

export const CourseOverviewTab = ({ course }: { course: any }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* About This Course Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm">
        <h3 className="text-xl font-heading font-bold text-secondary dark:text-surface mb-4">
          About This Course
        </h3>
        <p className="text-text-secondary font-body leading-relaxed">
          {course.fullDescription || "Soluta Nam perferend..."}
        </p>
      </div>

      {/* Who This Course Is For Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm">
        <h3 className="text-xl font-heading font-bold text-secondary dark:text-surface mb-4">
          Who This Course Is For
        </h3>
        <div className="flex gap-4 items-start">
          <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
            <Users className="size-5 text-primary" />
          </div>
          <p className="text-text-secondary font-body pt-1">
            {course.targetAudience || "Dicta eligendi liber"}
          </p>
        </div>
      </div>

      {/* Requirements Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm">
        <h3 className="text-xl font-heading font-bold text-secondary dark:text-surface mb-4">
          Requirements
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <ChevronRight className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary">{course.requirements?.[0] || "Officia eum aliquid"}</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary">Basic understanding of computer operations</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary">No prior experience in the field is necessary</span>
          </li>
        </ul>
      </div>

      {/* Course Details Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm">
        <h3 className="text-xl font-heading font-bold text-secondary dark:text-surface mb-6">
          Course Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <Globe className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Language</p>
              <p className="font-semibold text-secondary dark:text-surface">{getVal(course.language, "Spanish")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <BarChart className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Difficulty</p>
              <p className="font-semibold text-secondary dark:text-surface">{getVal(course.difficulty, "Intermediate")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <Tag className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Category</p>
              <p className="font-semibold text-secondary dark:text-surface">{getVal(course.category, "Digital Marketing")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Duration</p>
              <p className="font-semibold text-secondary dark:text-surface">{course.estimatedDuration || "Enim sit deserunt do"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <Calendar className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Created</p>
              <p className="font-semibold text-secondary dark:text-surface">{course.lastUpdated || "Jul 14, 2026"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <Award className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Certificate</p>
              <p className="font-semibold text-secondary dark:text-surface">Yes, on completion</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-light/50 p-3 rounded-xl shrink-0">
              <Smartphone className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-0.5">Access</p>
              <p className="font-semibold text-secondary dark:text-surface">Lifetime access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
