import headersAuthorization from "../headersAuthorization.server";

export interface PurchaseHistoryItem {
  _id: string;
  courseId: string;
  price: string;
  role: string;
  title: string;
  userEmail: string;
  userId: string;
  userImage: string;
  sessionId: string;
}

export const getPurchaseHistory = async (
  userId: string,
): Promise<PurchaseHistoryItem[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/payment/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(await headersAuthorization()),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch purchase history: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data as PurchaseHistoryItem[];
    }

    return [];
  } catch (error) {
    console.error("Error in getPurchaseHistory:", error);
    return [];
  }
};
