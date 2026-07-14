import RequireRole from '@/lib/RequireRole'

const AdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  await RequireRole('admin');
  return (
    <div>
      {children}
    </div>
  )
}

export default AdminDashboardLayout
