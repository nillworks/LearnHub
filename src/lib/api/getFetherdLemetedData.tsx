/**
 * Fetches the most recent published courses with a specified limit.
 * @param limit Number of courses to fetch (e.g., 6 or 3). Default is 6.
 */
const getFetherdLemetedData = async (limit: number = 6) => {
  try {
    // Determine the API URL from environment variables or fallback to localhost
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Fetch from the new /api/courses/published endpoint
    const res = await fetch(`${apiUrl}/api/courses/published?limit=${limit}`, {
      cache: 'no-store', // Ensures fresh data is always fetched
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch published courses: ${res.statusText}`);
    }

    const json = await res.json();
    
    if (json.success) {
      return json.data;
    } else {
      throw new Error(json.message || 'Failed to fetch');
    }
  } catch (error) {
    console.error('Error in getFetherdLemetedData:', error);
    return []; // Return empty array as fallback on error
  }
};

export default getFetherdLemetedData;
