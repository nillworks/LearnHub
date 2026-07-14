import RequireRole from "@/lib/RequireRole";

const StudentDashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  await RequireRole('student');
  return (
    <div>
      {children}
    </div>
  )
}

export default StudentDashboardLayout
