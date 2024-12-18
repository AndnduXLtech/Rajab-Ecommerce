import {
  ClipboardList,
  Download,
  MapPin,
  Home,
  User,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <DashboardCard
        href="/orders"
        icon={<ClipboardList className="h-12 w-12" />}
        title="Orders"
      />
      <DashboardCard
        href="/downloads"
        icon={<Download className="h-12 w-12" />}
        title="Downloads"
      />
      <DashboardCard
        href="/addresses"
        icon={<MapPin className="h-12 w-12" />}
        title="Addresses"
      />
    </div>
  );
}

export function DashboardCard({ href, icon, title }) {
  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
          <div className="text-primary">{icon}</div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
