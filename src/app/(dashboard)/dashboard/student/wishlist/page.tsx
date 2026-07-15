import WishlistGrid from '@/components/DashboardLayout/student/Wishlist/WishlistGrid';
import { getWishlist } from '@/lib/api/wishlistApi';
import getUserSession from '@/lib/getUserSection';
import { Heart } from 'lucide-react';

const WishlistPage = async () => {
  const user = await getUserSession();

  if (!user?.id) {
    return (
      <div className="w-full max-w-full min-w-0 overflow-x-hidden">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-secondary dark:text-surface flex items-center gap-3">
            <Heart className="size-7 text-primary" />
            My Wishlist
          </h1>
        </div>
        <WishlistGrid items={[]} />
      </div>
    );
  }

  const items = await getWishlist();

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-secondary dark:text-surface flex items-center gap-3">
          <Heart className="size-7 text-primary" />
          My Wishlist
          {items.length > 0 && (
            <span className="text-sm font-normal text-text-secondary bg-primary-light px-3 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'course' : 'courses'}
            </span>
          )}
        </h1>
      </div>
      <WishlistGrid items={items} />
    </div>
  );
};

export default WishlistPage;
