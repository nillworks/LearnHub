import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Globe,
  BarChart,
  Smartphone,
  Award,
  RefreshCw,
  Heart,
  ShieldCheck,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const getVal = (field: any, defaultVal: string) => {
  if (!field) return defaultVal;
  if (typeof field === 'string') return field;
  return field.label || field.value || defaultVal;
};

export const CoursePurchaseCard = ({
  course,
  isEnrolled = false,
  className,
}: {
  course: any;
  isEnrolled?: boolean;
  className?: string;
}) => {
  const price = Number(course.price) || 42;
  const discountAmount = Number(course.discountPrice) || 0;
  const finalPrice = Math.max(price - discountAmount, 0);
  const discountPercent =
    discountAmount > 0 ? Math.round((discountAmount / price) * 100) : 0;
  const saveAmount = discountAmount.toFixed(2);

  return (
    <div
      className={cn(
        'bg-white dark:bg-[#1e293b] rounded-3xl overflow-hidden shadow-sm border border-secondary-lighter dark:border-secondary sticky top-6',
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full group cursor-pointer">
        <Image
          src={
            course.thumbnailUrl ||
            'https://i.ibb.co/zVQqHs5k/Screenshot-2026-07-08-170200.png'
          }
          alt={course.title || 'Course Thumbnail'}
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center pl-1">
              <svg
                className="w-6 h-6 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Price Section — hidden when enrolled */}
        {!isEnrolled && (
          <div className="mb-6">
            <div className="flex items-end gap-3 mb-1">
              <span className="text-4xl font-heading font-bold text-secondary dark:text-surface">
                ${finalPrice.toFixed(2)}
              </span>
              {discountAmount > 0 && (
                <>
                  <span className="text-text-secondary text-lg line-through mb-1">
                    ${price}
                  </span>
                  <span className="bg-primary/10 text-primary-dark font-semibold px-2 py-0.5 rounded text-sm mb-1">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            {discountAmount > 0 && (
              <p className="text-primary font-medium text-sm">
                You save ${saveAmount}
              </p>
            )}
          </div>
        )}

        {/* Enrolled banner */}
        {isEnrolled && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0">
              <Play className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-heading font-bold text-green-700 dark:text-green-300 text-sm">
                You&apos;re enrolled!
              </p>
              <p className="text-green-600 dark:text-green-400 text-xs">
                Continue where you left off
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {isEnrolled ? (
            <Link
              href={`/dashboard/student`}
              className="block w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-lg rounded-xl py-3.5 text-center transition-colors duration-200"
            >
              Continue Course
            </Link>
          ) : (
            <form action="/api/checkout_sessions" method="POST">
              <input
                type="hidden"
                name="price"
                defaultValue={finalPrice.toFixed(2)}
              />
              <input type="hidden" name="title" value={course?.title || 'Course'} />
              <input type="hidden" name="courseId" value={course._id} />
              <section>
                <button
                  className="cursor-pointer w-full bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-xl py-3.5 transition-colors duration-200"
                  type="submit"
                  role="link"
                >
                  Enroll Now — ${finalPrice.toFixed(2)}
                </button>
              </section>
            </form>
          )}

          {!isEnrolled && (
            <button className="cursor-pointer w-full bg-transparent hover:bg-primary-light border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface font-semibold text-base rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors duration-200">
              <Heart className="size-5" />
              Add to Wishlist
            </button>
          )}
        </div>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2 text-text-secondary text-sm mb-6">
          <ShieldCheck className="size-4 text-primary" />
          <span>30-Day Money-Back Guarantee</span>
        </div>

        <div className="border-t border-secondary-lighter dark:border-secondary my-6"></div>

        {/* What's Included */}
        <div>
          <h4 className="font-heading font-bold text-secondary dark:text-surface mb-4">
            This course includes:
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-text-secondary">
              <Clock className="size-4 text-primary shrink-0" />
              <span>{course.estimatedDuration || 'Enim sit deserunt do'}</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-text-secondary">
              <Globe className="size-4 text-primary shrink-0" />
              <span>Language: {getVal(course.language, 'Spanish')}</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-text-secondary">
              <BarChart className="size-4 text-primary shrink-0" />
              <span>Level: {getVal(course.difficulty, 'Intermediate')}</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-text-secondary">
              <Smartphone className="size-4 text-primary shrink-0" />
              <span>Full lifetime access</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-text-secondary">
              <Award className="size-4 text-primary shrink-0" />
              <span>Certificate of completion</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-text-secondary">
              <RefreshCw className="size-4 text-primary shrink-0" />
              <span>Access on all devices</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-secondary-lighter dark:border-secondary my-6"></div>

        {/* Share Row */}
        <div>
          <p className="text-center text-text-secondary text-sm mb-3">
            Share this course:
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="w-10 h-10 rounded-full border border-secondary-lighter dark:border-secondary flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-light transition-colors">
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.557z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-secondary-lighter dark:border-secondary flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-light transition-colors">
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-secondary-lighter dark:border-secondary flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-light transition-colors">
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
