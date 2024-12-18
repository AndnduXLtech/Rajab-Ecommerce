import {
  BarChart,
  Users,
  Package,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import OverviewCard from "./Metrics/OverviewCard";
import RevenueChart from "./Metrics/RevenueChart";
import OrderList from "./Order/OrderList";

const overviewCards = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: BarChart,
  },
  {
    title: "Total Users",
    value: "2,350",
    description: "+180 new users",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "1,200",
    description: "50 products added this month",
    icon: Package,
  },
  {
    title: "Pending Orders",
    value: "12",
    description: "6 orders need attention",
    icon: ShoppingCart,
  },
  {
    title: "Orders Rejected",
    value: "23",
    description: "-5% from last month",
    icon: AlertCircle,
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {overviewCards.map((card) => (
          <OverviewCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <OrderList />
      </div>
    </div>
  );
}
