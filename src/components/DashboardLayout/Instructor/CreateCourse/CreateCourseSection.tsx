import React from "react";
import { ChevronRight } from "lucide-react";
import CreateCourseFrom from "./CreateCourseFrom";
import { createCoursePostApi } from "@/lib/api/createCoursePostApi";
import getUserSession from "@/lib/getUserSection";

const CreateCourseSection = async () => {

  const user= await getUserSession()
  
  // Rule 32: Create the submit handler or server action in the parent/server component.
  const handleCourseSubmit = async (data: any, status: "draft" | "published") => {
    "use server";

    const coursePost = {
      ...data,
      image: user?.image,
      instructorName: user?.name,
      role: user?.role,
      studentEnroll: 0,
      lessons: 0,
      rating: 0,
      totalReviews: 0,
    }

    return await createCoursePostApi(coursePost, status);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-bg py-10">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center text-text-secondary text-sm mb-4">
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 mx-1" />
            <span>My Courses</span>
            <ChevronRight className="w-3.5 h-3.5 mx-1" />
            <span className="text-primary font-medium">Create New Course</span>
          </div>

          <h1 className="text-secondary dark:text-surface font-heading font-bold text-3xl">
            Create a New Course
          </h1>
          <p className="text-text-secondary font-body text-sm mt-1">
            Fill in all steps carefully. Your course will be reviewed before going live.
          </p>
        </div>

        {/* Form Card wrapper */}
        <div className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary rounded-3xl p-8 shadow-sm">
          {/* Rule 32: Pass the handler function to the child form component through props. */}
          <CreateCourseFrom onSubmitForm={handleCourseSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateCourseSection;
