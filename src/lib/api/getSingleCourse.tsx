/**
 * Fetches a single course by its ID from the backend API.
 * @param id The ID of the course to fetch
 */
export const getSingleCourse = async (id: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Try to get auth headers, but don't fail if unavailable (public endpoint)
    let authHeaders: Record<string, string> = {};
    try {
      const { default: headersAuthorization } = await import('../headersAuthorization.server');
      authHeaders = await headersAuthorization();
    } catch {
      // Not logged in or server-only import failed — proceed without auth
    }
    
    const res = await fetch(`${apiUrl}/api/courses/${id}`, {
      cache: 'no-store',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch course: ${res.statusText}`);
    }

    const json = await res.json();
    
    if (json.success) {
      return json.data;
    } else {
      throw new Error(json.message || 'Failed to fetch course');
    }
  } catch (error) {
    console.error(`Error in getSingleCourse for ID ${id}:`, error);
    return null;
  }
};

export default getSingleCourse;
