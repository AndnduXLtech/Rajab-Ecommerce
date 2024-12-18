import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Users as UsersIcon,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import Products from "./Products";
import Analytics from "./Analytics";

function Da_Ly() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: UsersIcon },
    { id: "products", label: "Products", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      case "products":
        return <Products />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={cn(
            "h-screen fixed left-0 top-0 z-50 bg-card border-r transition-all duration-300",
            isSidebarOpen ? "w-64" : "w-16"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h1
              className={cn(
                "font-bold transition-all duration-300",
                isSidebarOpen ? "text-xl" : "hidden"
              )}
            >
              Admin Panel
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <Sidebar
            items={navigationItems}
            isOpen={isSidebarOpen}
            currentView={currentView}
            onNavigate={setCurrentView}
          />
        </div>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 min-h-screen bg-background",
            isSidebarOpen ? "ml-64" : "ml-16"
          )}
        >
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default Da_Ly;
