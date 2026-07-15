import React from 'react';
import Image from 'next/image';
import { Bookmark, Star, Users, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    thumbnailUrl?: string;
    category?: string;
    difficulty?: string;
    instructorName?: string;
    image?: string;
    price?: number;
    discountPrice?: number;
    isFree?: boolean;
    studentsEnrolled?: number;
    estimatedDuration?: string;
    lessons?: number;
    rating?: number;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  const price = course.price || 0;
  const discountPrice = course.discountPrice || 0;
  const hasDiscount = discountPrice > 0;
  const finalPrice = hasDiscount ? (price - discountPrice) : price;
  const discountPercent = hasDiscount ? Math.round((discountPrice / price) * 100) : 0;

  return (
    <Link href={`/courses/${course._id}`} className="block h-full group">
      <div className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col h-full relative">
        
        {/* THUMBNAIL */}
        <div className="relative overflow-hidden aspect-video w-full">
          <Image
            src={course.thumbnailUrl || 'https://via.placeholder.com/600x400?text=Course'}
            alt={course.title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />

          {/* Floating badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm text-primary-dark font-semibold text-xs rounded-full px-2.5 py-1 border border-primary-light/60">
              {course.category}
            </span>
            <span className="bg-secondary/80 text-white text-xs rounded-full px-2.5 py-1">
              {course.difficulty || 'Beginner'}
            </span>
          </div>

          {/* Bookmark icon */}
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#1e293b]/90 rounded-xl p-2 backdrop-blur-sm transition-all cursor-pointer hover:bg-primary-light group/bookmark">
            <Bookmark className="text-text-secondary group-hover/bookmark:text-primary size-4" />
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 right-3">
            {course.isFree ? (
              <span className="bg-primary text-white font-heading font-bold text-sm rounded-xl px-3 py-1.5 shadow-sm">
                FREE
              </span>
            ) : hasDiscount ? (
              <div className="bg-secondary text-white rounded-xl px-3 py-1.5 shadow-sm flex items-center">
                <span className="font-bold text-sm">${typeof finalPrice === 'number' ? finalPrice.toFixed(2) : finalPrice}</span>
                <span className="line-through text-white/60 text-xs ml-1">${price}</span>
              </div>
            ) : (
              <span className="bg-secondary text-white font-heading font-bold text-sm rounded-xl px-3 py-1.5 shadow-sm">
                ${price}
              </span>
            )}
          </div>
        </div>

        {/* CARD BODY */}
        <div className="p-5 flex flex-col flex-1">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-primary text-xs font-semibold uppercase tracking-wide">
              {course.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="text-primary size-3.5 fill-primary" />
              <span className="font-heading font-semibold text-secondary text-sm">
                {course.rating?.toFixed(1) || '0.0'}
              </span>
              <span className="text-text-secondary text-xs">
                (2.4k)
              </span>
            </div>
          </div>

          {/* Course title */}
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-2">
            {course.title}
          </h3>

          {/* Short description */}
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 font-body mb-4">
            Learn the complete essentials and advanced concepts of this topic to become a professional.
          </p>

          {/* Instructor row */}
          <div className="flex items-center gap-2 mb-4 overflow-hidden">
            {course.image && (
              <img
                src={course.image}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-primary-light object-cover shrink-0"
              />
            )}
            <span className="text-secondary dark:text-surface text-xs font-medium truncate">
              {course.instructorName || 'Instructor'}
            </span>
            <span className="text-text-secondary text-xs shrink-0">·</span>
            <span className="text-text-secondary text-xs shrink-0">Instructor</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <Users className="size-3.5 text-primary shrink-0" />
              <span className="truncate">{(course.studentsEnrolled ?? 0).toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <Clock className="size-3.5 text-primary" />
              <span>{course.estimatedDuration || ''}</span>
            </div>
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <BookOpen className="size-3.5 text-primary shrink-0" />
              <span className="truncate">{course.lessons ?? 0} lessons</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-secondary-lighter dark:border-secondary"></div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 mt-auto">
            <div className="flex items-center">
              {course.isFree ? (
                <span className="font-heading font-bold text-primary text-lg">Free</span>
              ) : hasDiscount ? (
                <div className="flex items-center">
                  <span className="font-heading font-bold text-secondary dark:text-surface text-lg">
                    ${typeof finalPrice === 'number' ? finalPrice.toFixed(2) : finalPrice}
                  </span>
                  <span className="text-text-secondary text-xs line-through ml-2">
                    ${price}
                  </span>
                  <span className="bg-primary-light text-primary-dark text-[10px] rounded-full px-2 py-0.5 font-semibold ml-2">
                    {discountPercent}% off
                  </span>
                </div>
              ) : (
                <span className="font-heading font-bold text-secondary dark:text-surface text-lg">
                  ${price}
                </span>
              )}
            </div>

            <button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200">
              Enroll Now
            </button>
          </div>
        </div>

        {/* HOVER STATE OVERLAY (Quick Preview) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-center pointer-events-none">
          <span className="bg-primary text-white text-xs rounded-full px-4 py-1.5 font-semibold shadow-lg backdrop-blur-sm pointer-events-auto cursor-pointer hover:bg-primary-hover transition-colors">
            Quick Preview &rarr;
          </span>
        </div>

      </div>
    </Link>
  );
};

export default CourseCard;
