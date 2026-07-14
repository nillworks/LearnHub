import React from 'react';
import Image from 'next/image';
import { Bookmark, Star, Users, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  difficulty?: string;
  instructorName?: string;
  instructorAvatar?: string;
  price: number;
  discountPrice?: number;
  isFree?: boolean;
  studentsEnrolled: number;
  estimatedDuration?: string;
  lessons?: number;
  avgRating: number;
}

const CourseCard = ({
  id,
  title,
  thumbnail,
  category,
  difficulty = 'Beginner',
  instructorName = 'Instructor',
  instructorAvatar = 'https://i.pravatar.cc/150?u=' + id, // default placeholder
  price,
  discountPrice,
  isFree,
  studentsEnrolled,
  estimatedDuration = '24 hours',
  lessons = 42,
  avgRating,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`} className="block h-full group">
      <div className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col h-full relative">
        
        {/* THUMBNAIL */}
        <div className="relative overflow-hidden aspect-video w-full">
          <Image
            src={thumbnail || 'https://via.placeholder.com/600x400?text=Course'}
            alt={title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />

          {/* Floating badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm text-primary-dark font-semibold text-xs rounded-full px-2.5 py-1 border border-primary-light/60">
              {category}
            </span>
            <span className="bg-secondary/80 text-white text-xs rounded-full px-2.5 py-1">
              {difficulty}
            </span>
          </div>

          {/* Bookmark icon */}
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#1e293b]/90 rounded-xl p-2 backdrop-blur-sm transition-all cursor-pointer hover:bg-primary-light group/bookmark">
            <Bookmark className="text-text-secondary group-hover/bookmark:text-primary size-4" />
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 right-3">
            {isFree ? (
              <span className="bg-primary text-white font-heading font-bold text-sm rounded-xl px-3 py-1.5 shadow-sm">
                FREE
              </span>
            ) : discountPrice ? (
              <div className="bg-secondary text-white rounded-xl px-3 py-1.5 shadow-sm flex items-center">
                <span className="font-bold text-sm">${discountPrice}</span>
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
              {category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="text-primary size-3.5 fill-primary" />
              <span className="font-heading font-semibold text-secondary text-sm">
                {avgRating?.toFixed(1) || '0.0'}
              </span>
              <span className="text-text-secondary text-xs">
                (2.4k)
              </span>
            </div>
          </div>

          {/* Course title */}
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-2">
            {title}
          </h3>

          {/* Short description */}
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 font-body mb-4">
            Learn the complete essentials and advanced concepts of this topic to become a professional.
          </p>

          {/* Instructor row */}
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={instructorAvatar}
              alt={instructorName}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full border-2 border-primary-light object-cover"
            />
            <span className="text-secondary dark:text-surface text-xs font-medium">
              {instructorName}
            </span>
            <span className="text-text-secondary text-xs">·</span>
            <span className="text-text-secondary text-xs">Instructor</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <Users className="size-3.5 text-primary" />
              <span>{studentsEnrolled?.toLocaleString() || 0} students</span>
            </div>
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <Clock className="size-3.5 text-primary" />
              <span>{estimatedDuration}</span>
            </div>
            <div className="flex items-center gap-1 text-text-secondary text-xs">
              <BookOpen className="size-3.5 text-primary" />
              <span>{lessons} lessons</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-secondary-lighter dark:border-secondary"></div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 mt-auto">
            <div className="flex items-center">
              {isFree ? (
                <span className="font-heading font-bold text-primary text-lg">Free</span>
              ) : discountPrice ? (
                <div className="flex items-center">
                  <span className="font-heading font-bold text-secondary dark:text-surface text-lg">
                    ${discountPrice}
                  </span>
                  <span className="text-text-secondary text-xs line-through ml-2">
                    ${price}
                  </span>
                  <span className="bg-primary-light text-primary-dark text-[10px] rounded-full px-2 py-0.5 font-semibold ml-2">
                    {Math.round(((price - discountPrice) / price) * 100)}% off
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
