import { DashboardPagesLayout } from "@/widgets/dashboard-layout/dashboard-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardPagesLayout>{children}</DashboardPagesLayout>;
}
