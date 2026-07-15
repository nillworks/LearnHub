'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addToWishlist, removeFromWishlist } from '@/lib/api/wishlistApi';
import CustomToast from '@/components/shared/CustomToast';

export const WishlistButton = ({
  courseId,
  courseTitle,
  courseThumbnail,
  coursePrice,
  instructorName,
  initialWishlisted = false,
  variant = 'default',
  className,
}: {
  courseId: string;
  courseTitle: string;
  courseThumbnail: string;
  coursePrice: number;
  instructorName: string;
  initialWishlisted?: boolean;
  variant?: 'default' | 'icon';
  className?: string;
}) => {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (wishlisted) {
        const result = await removeFromWishlist(courseId);
        if (result.success) {
          setWishlisted(false);
          CustomToast('success', 'Removed from wishlist');
        } else {
          CustomToast('error', 'Failed', result.message);
        }
      } else {
        const result = await addToWishlist({
          courseId,
          title: courseTitle,
          thumbnailUrl: courseThumbnail,
          price: coursePrice,
          instructorName,
        });
        if (result.success) {
          setWishlisted(true);
          CustomToast('success', 'Added to wishlist');
        } else {
          CustomToast('error', 'Failed', result.message);
        }
      }
    } catch {
      CustomToast('error', 'Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        className={cn(
          'cursor-pointer w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200',
          wishlisted
            ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
            : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20',
          className,
        )}
      >
        <Heart
          className={cn('size-4 transition-all', wishlisted && 'fill-current')}
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        'cursor-pointer w-full bg-transparent hover:bg-primary-light border font-semibold text-base rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors duration-200',
        wishlisted
          ? 'border-red-300 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20'
          : 'border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface',
        className,
      )}
    >
      <Heart
        className={cn('size-5 transition-all', wishlisted && 'fill-current')}
      />
      {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
    </button>
  );
};
