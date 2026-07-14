"use client"
import React, { useState } from 'react';
import { CourseOverviewTab } from './CourseOverviewTab';
import { CourseLearningTab } from './CourseLearningTab';
import { CourseInstructorTab } from './CourseInstructorTab';
import { CourseReviewsTab } from './CourseReviewsTab';

export const CourseTabsLayout = ({ course }: { course: any }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'learning', label: "What You'll Learn" },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="w-full">
      {/* Sticky Tab Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-[#0f172a] border-b border-secondary-lighter dark:border-secondary mb-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-4 font-heading font-semibold text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-primary hover:border-primary/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && <CourseOverviewTab course={course} />}
        {activeTab === 'learning' && <CourseLearningTab course={course} />}
        {activeTab === 'instructor' && <CourseInstructorTab course={course} />}
        {activeTab === 'reviews' && <CourseReviewsTab course={course} />}
      </div>
    </div>
  );
};
