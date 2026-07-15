import React from 'react';
import { ChevronRight, Globe, BarChart, Tag, Calendar, Users, Star, Clock } from 'lucide-react';
import Link from 'next/link';

const getVal = (field: any, defaultVal: string) => {
  if (!field) return defaultVal;
  if (typeof field === 'string') return field;
  return field.label || field.value || defaultVal;
};

export const CourseHero = ({ course }: { course: any }) => {
  return (
    <div className="w-full bg-[#0f172a] text-white pt-8 pb-12 px-4 md:px-6">
      <div className="container mx-auto lg:max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6 text-white/60">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="size-4 mx-2" />
          <Link href="/courses" className="hover:text-white transition-colors">All Courses</Link>
          <ChevronRight className="size-4 mx-2" />
          <span className="text-primary">{getVal(course.category, "Digital Marketing")}</span>
        </div>

        {/* Badge Row */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-primary/20 border border-primary text-primary-light font-semibold text-xs rounded-full px-3 py-1">
            {getVal(course.category, "Digital Marketing")}
          </span>
          <span className="bg-white/10 text-white text-xs rounded-full px-3 py-1">
            {getVal(course.difficulty, "Intermediate")}
          </span>
          <span className="bg-white/10 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1.5">
            <Globe className="size-3.5" />
            {getVal(course.language, "Spanish")}
          </span>
        </div>

        <div className="max-w-4xl">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 leading-tight">
            {course.title || "Untitled Course"}
          </h1>

          {/* Short Description */}
          <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-3xl font-body">
            {course.shortDescription || "No description provided."}
          </p>

          {/* Rating Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-primary text-white font-semibold text-xs rounded-md px-2 py-1 uppercase tracking-wide">
              Bestseller
            </span>
            <div className="flex items-center text-primary">
              <Star className="size-4 fill-primary" />
              <Star className="size-4 fill-primary" />
              <Star className="size-4 fill-primary" />
              <Star className="size-4 fill-primary" />
              <Star className="size-4 fill-primary" />
            </div>
            <span className="font-heading font-bold text-white text-lg">
              {course.avgRating ? course.avgRating.toFixed(1) : "4.8"}
            </span>
            <span className="text-white/60 text-sm">
              (2,432 ratings)
            </span>
            <div className="flex items-center text-white/60 text-sm ml-2">
              <Users className="size-4 mr-1.5" />
              {(course.studentsEnrolled ?? 0).toLocaleString()} students
            </div>
          </div>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Clock className="size-4 text-primary" />
              <span>{course.estimatedDuration || "Enim sit deserunt do"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Globe className="size-4 text-primary" />
              <span>{getVal(course.language, "Spanish")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <BarChart className="size-4 text-primary" />
              <span>{getVal(course.difficulty, "Intermediate")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Tag className="size-4 text-primary" />
              <span>{getVal(course.category, "Digital Marketing")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Calendar className="size-4 text-primary" />
              <span>Last updated {course.lastUpdated || "Jul 14, 2026"}</span>
            </div>
          </div>

          {/* Instructor Row */}
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm">Created by</span>
            <div className="flex items-center gap-2 cursor-pointer group">
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.instructorName || "Instructor"}
                  className="w-8 h-8 rounded-full object-cover border border-primary/30"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  {course.instructorName ? course.instructorName.charAt(0).toUpperCase() : 'I'}
                </div>
              )}
              <span className="text-primary hover:text-primary-light transition-colors font-medium">
                {course.instructorName || "Instructor Name"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
