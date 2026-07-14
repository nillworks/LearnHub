"use server";

import headersAuthorization from "../headersAuthorization.server";

export type ActionResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export async function createCoursePostApi(
  courseData: any,
  status: "draft" | "pending"
): Promise<ActionResponse> {
  try {
    const payload = { ...courseData, status };
    
    // Replace this URL with your actual backend endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await headersAuthorization()),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to create course");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Error creating course:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}
