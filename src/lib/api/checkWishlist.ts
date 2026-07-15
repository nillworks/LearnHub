import 'server-only';
import headersAuthorization from '../headersAuthorization.server';

export const checkWishlist = async (courseId: string): Promise<boolean> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const authHeaders = await headersAuthorization();

    const res = await fetch(`${apiUrl}/api/wishlist/check/${courseId}`, {
      cache: 'no-store',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) return false;
    const json = await res.json();
    return json.data?.wishlisted === true;
  } catch {
    return false;
  }
};

export default checkWishlist;
