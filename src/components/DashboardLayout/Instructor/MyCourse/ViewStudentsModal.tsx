'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Users, Mail, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';

interface EnrolledStudent {
  _id: string;
  userId: string;
  userEmail: string;
  userImage: string | null;
  title: string;
  courseId: string;
  price: string | number;
  sessionId: string;
}

interface ViewStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string | null;
  courseTitle: string;
}

export function ViewStudentsModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
}: ViewStudentsModalProps) {
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !courseId) {
      setStudents([]);
      return;
    }

    const fetchStudents = async () => {
      setLoading(true);
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enrollment/students/${courseId}`,
          {
            headers: {
              ...(token ? { authorization: `Bearer ${token}` } : {}),
              'Content-Type': 'application/json',
            },
          },
        );

        if (res.ok) {
          const json = await res.json();
          setStudents(json.success ? json.data : []);
        }
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [isOpen, courseId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e293b] w-full max-w-3xl rounded-3xl p-6 md:p-8 shadow-xl border border-border dark:border-secondary max-h-[85vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-text-secondary hover:text-danger hover:bg-danger-light rounded-full transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-heading font-bold text-text-primary dark:text-surface mb-1 pr-12">
          Enrolled Students
        </h3>
        <p className="text-text-secondary text-sm mb-6 pb-4 border-b border-secondary-lighter dark:border-secondary font-body">
          {courseTitle}
        </p>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="size-8 text-primary animate-spin" />
              <p className="text-text-secondary text-sm font-body">Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                <Users className="size-8 text-primary-dark" />
              </div>
              <p className="text-text-primary dark:text-surface font-heading font-semibold">
                No students enrolled yet
              </p>
              <p className="text-text-secondary text-sm font-body">
                Students will appear here after they purchase this course
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-light dark:bg-primary-dark/20 border-b border-secondary-lighter dark:border-secondary">
                      <th className="text-left py-3 px-4 font-heading font-semibold text-secondary dark:text-surface rounded-tl-xl">
                        #
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-secondary dark:text-surface">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-secondary dark:text-surface hidden sm:table-cell">
                        Email
                      </th>
                      <th className="text-right py-3 px-4 font-heading font-semibold text-secondary dark:text-surface rounded-tr-xl hidden md:table-cell">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-lighter dark:divide-secondary/50">
                    {students.map((student, index) => (
                      <tr
                        key={student._id}
                        className={cn(
                          'hover:bg-primary-light/50 dark:hover:bg-primary-dark/10 transition-colors duration-200',
                        )}
                      >
                        <td className="py-3.5 px-4 text-text-secondary font-body">
                          {index + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {student.userImage ? (
                              <Image
                                src={student.userImage}
                                alt={student.userEmail || 'Student'}
                                width={36}
                                height={36}
                                className="w-9 h-9 rounded-full object-cover border border-secondary-lighter dark:border-secondary shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0 font-heading">
                                {student.userEmail?.charAt(0).toUpperCase() || '?'}
                              </div>
                            )}
                            <span className="font-medium text-text-primary dark:text-surface truncate font-body">
                              {student.userEmail?.split('@')[0] || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-text-secondary hidden sm:table-cell font-body">
                          <div className="flex items-center gap-1.5">
                            <Mail className="size-3.5 shrink-0 text-secondary-light" />
                            <span className="truncate">{student.userEmail}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-text-primary dark:text-surface hidden md:table-cell font-body">
                          ${Number(student.price || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-secondary-lighter dark:border-secondary flex items-center justify-between">
                <p className="text-text-secondary text-sm font-body">
                  Total:{' '}
                  <span className="font-semibold text-text-primary dark:text-surface">
                    {students.length}
                  </span>{' '}
                  {students.length === 1 ? 'student' : 'students'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
