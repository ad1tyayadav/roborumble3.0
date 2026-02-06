
import { Metadata } from 'next';
import AdminSidebar from "../components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Console | Robo Rumble 3.0",
  description: "Restricted Access Area",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 w-full relative overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
