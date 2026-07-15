import React from 'react';
import { CourseHero } from './CourseHero';
import { CourseTabsLayout } from './CourseTabsLayout';
import { CoursePurchaseCard } from './CoursePurchaseCard';
import { CourseMobileBottomBar } from './CourseMobileBottomBar';
import { RelatedCourses } from './RelatedCourses';

// Recursively converts any {value, label} object or array into plain strings/arrays
const deepNormalize = (val: any): any => {
  if (val === null || val === undefined) return val;
  if (Array.isArray(val)) return val.map(deepNormalize);
  if (typeof val === 'object' && !(val instanceof Date)) {
    // If it looks like a select option {value, label}, extract the string
    if ('value' in val && Object.keys(val).length <= 2) {
      return val.label ?? val.value ?? '';
    }
    // Otherwise recurse into the object
    const result: any = {};
    for (const key of Object.keys(val)) {
      result[key] = deepNormalize(val[key]);
    }
    return result;
  }
  return val;
};

const normalizeCourse = (course: any) => deepNormalize(course);

const CourseDetailsPage = ({ course, isEnrolled = false, isWishlisted = false }: { course: any; isEnrolled?: boolean; isWishlisted?: boolean }) => {
  const normalizedCourse = normalizeCourse(course);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Section 1: Hero */}
      <CourseHero course={normalizedCourse} />
      
      <div className="container mx-auto px-4 md:px-6 lg:max-w-7xl pt-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
          
          {/* Main Content Area (Left Column on Desktop) */}
          <div className="flex-1 w-full min-w-0">
            {/* Sections 2-6: Tabs and Content */}
            <CourseTabsLayout course={normalizedCourse} />
          </div>

          {/* Sticky Purchase Card (Right Column on Desktop) */}
          <div className="hidden md:block w-full lg:w-[380px] shrink-0 sticky top-24">
            <CoursePurchaseCard course={normalizedCourse} isEnrolled={isEnrolled} isWishlisted={isWishlisted} />
          </div>
          
        </div>

        {/* Section 9: Related Courses */}
        {/* <RelatedCourses course={normalizedCourse} /> */}
      </div>

      {/* Section 8: Mobile Bottom Bar */}
      <CourseMobileBottomBar course={normalizedCourse} isEnrolled={isEnrolled} />
    </div>
  );
};

export default CourseDetailsPage;
