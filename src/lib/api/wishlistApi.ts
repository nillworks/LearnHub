export interface WishlistItem {
  _id: string;
  userId: string;
  courseId: string;
  title: string;
  thumbnailUrl: string;
  price: number;
  instructorName: string;
  createdAt: string;
}

export const addToWishlist = async (course: {
  courseId: string;
  title: string;
  thumbnailUrl: string;
  price: number;
  instructorName: string;
}): Promise<{ success: boolean; message: string }> => {
  const res = await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course),
  });

  const json = await res.json();
  if (!res.ok) return { success: false, message: json.message || 'Failed to add' };
  return { success: true, message: 'Added to wishlist' };
};

export const removeFromWishlist = async (
  courseId: string,
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`/api/wishlist/${courseId}`, {
    method: 'DELETE',
  });

  const json = await res.json();
  if (!res.ok) return { success: false, message: json.message || 'Failed to remove' };
  return { success: true, message: 'Removed from wishlist' };
};

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const res = await fetch('/api/wishlist', {
    cache: 'no-store',
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
};
