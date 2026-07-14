/**
 * Fetches ALL published courses from the backend.
 * Supports pagination and filtering.
 */
const getAllCourse = async (params: Record<string, any> = {}) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Clean up empty params
    const cleanParams: Record<string, string> = {};
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        cleanParams[key] = String(params[key]);
      }
    });
    
    const query = new URLSearchParams(cleanParams).toString();
    const url = `${apiUrl}/api/courses/all-published${query ? `?${query}` : ''}`;

    const res = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch all courses: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.success) {
      // Return the full JSON (data + pagination info) if needed, 
      // but for backward compatibility we can also just return data if pagination is missing.
      return json; 
    } else {
      throw new Error(json.message || 'Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error in getAllCourse:', error);
    return { data: [], pagination: { hasMore: false } }; // Return empty structure on error
  }
};

export default getAllCourse;
