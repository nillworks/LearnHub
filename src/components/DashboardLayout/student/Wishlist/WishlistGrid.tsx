'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart, ExternalLink } from 'lucide-react';
import { removeFromWishlist, WishlistItem } from '@/lib/api/wishlistApi';
import CustomToast from '@/components/shared/CustomToast';

const WishlistGrid = ({ items: initialItems }: { items: WishlistItem[] }) => {
  const [items, setItems] = useState(initialItems);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (courseId: string) => {
    setRemovingId(courseId);
    try {
      const result = await removeFromWishlist(courseId);
      if (result.success) {
        setItems((prev) => prev.filter((item) => item.courseId !== courseId));
        CustomToast('success', 'Removed from wishlist');
      } else {
        CustomToast('error', 'Failed', result.message);
      }
    } catch {
      CustomToast('error', 'Error', 'Something went wrong');
    } finally {
      setRemovingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-6">
          <Heart className="size-10 text-primary" />
        </div>
        <h3 className="font-heading font-bold text-xl text-secondary dark:text-surface mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-text-secondary text-sm mb-6">
          Browse courses and save your favorites
        </p>
        <Link
          href="/courses"
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white dark:bg-[#1e293b] rounded-3xl overflow-hidden border border-secondary-lighter dark:border-secondary group"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video w-full">
            <Image
              src={
                item.thumbnailUrl ||
                'https://i.ibb.co/zVQqHs5k/Screenshot-2026-07-08-170200.png'
              }
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 right-3">
              <button
                onClick={() => handleRemove(item.courseId)}
                disabled={removingId === item.courseId}
                className="cursor-pointer w-9 h-9 rounded-full bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h4 className="font-heading font-bold text-secondary dark:text-surface text-sm line-clamp-2 mb-2 min-h-[40px]">
              {item.title}
            </h4>
            {item.instructorName && (
              <p className="text-text-secondary text-xs mb-3">
                by {item.instructorName}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-lg text-primary">
                ${Number(item.price) || 0}
              </span>
              <Link
                href={`/courses/${item.courseId}`}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
              >
                View Course
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;
