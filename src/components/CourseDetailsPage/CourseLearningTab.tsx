import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const CourseLearningTab = ({ course }: { course: any }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-heading font-bold text-secondary dark:text-surface mb-6">
        What You'll Learn
      </h2>
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-relaxed">{course.learningOutcomes?.[0] || "Id ea consequatur S"}</span>
          </div>
          {/* Placeholders for visual completeness as requested */}
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-relaxed">Master the fundamentals and advanced concepts of this topic</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-relaxed">Build real-world projects from scratch following best practices</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-relaxed">Understand industry standards and modern development workflows</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-relaxed">Deploy your applications to production with confidence</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-relaxed">Optimize performance, accessibility, and scalability</span>
          </div>
        </div>
      </div>
    </div>
  );
};
