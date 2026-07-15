import React from 'react';
import { Star, Users, PlayCircle, Award } from 'lucide-react';
import CourseCard from '@/components/shared/CourseCard';

export const CourseInstructorTab = ({ course }: { course: any }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-heading font-bold text-secondary dark:text-surface mb-6">
        Your Instructor
      </h2>
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm">
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {course.image ? (
            <img
              src={course.image}
              alt={course.instructorName || "Instructor"}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary-light/30 shrink-0"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary flex items-center justify-center text-white font-bold text-4xl border-4 border-primary-light/30 shrink-0">
              {course.instructorName ? course.instructorName.charAt(0).toUpperCase() : 'I'}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-heading font-bold text-secondary dark:text-surface mb-1">
              {course.instructorName || "Instructor Name"}
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Senior Digital Marketing Expert
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Star className="size-4 text-primary" />
                <span className="text-sm font-medium text-secondary dark:text-surface">4.8 Instructor Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span className="text-sm font-medium text-secondary dark:text-surface">32,400 Students</span>
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="size-4 text-primary" />
                <span className="text-sm font-medium text-secondary dark:text-surface">8 Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <span className="text-sm font-medium text-secondary dark:text-surface">5+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-heading font-bold text-secondary dark:text-surface mb-3">
            About
          </h4>
          <p className="text-text-secondary font-body leading-relaxed text-sm">
            I am a passionate digital marketing expert with over 5 years of experience helping brands grow their online presence. My courses are designed to be practical, hands-on, and focused on real-world skills that you can immediately apply to your career or business. Join me and thousands of other students on this learning journey!
          </p>
        </div>

        <div className="pt-8 border-t border-secondary-lighter dark:border-secondary">
          <h4 className="text-lg font-heading font-bold text-secondary dark:text-surface mb-6">
            Other Courses by This Instructor
          </h4>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {/* Using mock courses for the horizontal scrollable row */}
            <div className="min-w-[280px] max-w-[280px] snap-start">
              <CourseCard
                id="1"
                title="Advanced SEO Techniques"
                thumbnail={course?.thumbnailUrl || 'https://placehold.co/600x400?text=Course'}
                category={course?.category || 'Marketing'}
                difficulty={course?.difficulty || 'Beginner'}
                instructorName={course?.instructorName || 'Instructor'}
                instructorAvatar={course?.instructorAvatar || 'https://i.pravatar.cc/150?u=1'}
                price={course?.price || 0}
                discountPrice={course?.discountPrice}
                isFree={course?.isFree}
                studentsEnrolled={course?.studentsEnrolled ?? 0}
                estimatedDuration={course?.estimatedDuration}
                lessons={course?.lessons ?? 0}
                avgRating={course?.rating ?? 0}
              />
            </div>
            <div className="min-w-[280px] max-w-[280px] snap-start">
              <CourseCard
                id="2"
                title="Social Media Masterclass"
                thumbnail={course?.thumbnailUrl || 'https://placehold.co/600x400?text=Course'}
                category={course?.category || 'Marketing'}
                difficulty={course?.difficulty || 'Beginner'}
                instructorName={course?.instructorName || 'Instructor'}
                instructorAvatar={course?.instructorAvatar || 'https://i.pravatar.cc/150?u=2'}
                price={course?.price || 0}
                discountPrice={course?.discountPrice}
                isFree={course?.isFree}
                studentsEnrolled={course?.studentsEnrolled ?? 0}
                estimatedDuration={course?.estimatedDuration}
                lessons={course?.lessons ?? 0}
                avgRating={course?.rating ?? 0}
              />
            </div>
            <div className="min-w-[280px] max-w-[280px] snap-start">
              <CourseCard
                id="3"
                title="Content Marketing 101"
                thumbnail={course?.thumbnailUrl || 'https://placehold.co/600x400?text=Course'}
                category={course?.category || 'Marketing'}
                difficulty={course?.difficulty || 'Beginner'}
                instructorName={course?.instructorName || 'Instructor'}
                instructorAvatar={course?.instructorAvatar || 'https://i.pravatar.cc/150?u=3'}
                price={course?.price || 0}
                discountPrice={course?.discountPrice}
                isFree={course?.isFree}
                studentsEnrolled={course?.studentsEnrolled ?? 0}
                estimatedDuration={course?.estimatedDuration}
                lessons={course?.lessons ?? 0}
                avgRating={course?.rating ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
