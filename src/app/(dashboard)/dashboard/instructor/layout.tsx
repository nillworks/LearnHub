import RequireRole from '@/lib/RequireRole';
import React from 'react'

const InstructorDashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  await RequireRole('instructor');
  return (
    <div>
      {children}
    </div>
  )
}

export default InstructorDashboardLayout
