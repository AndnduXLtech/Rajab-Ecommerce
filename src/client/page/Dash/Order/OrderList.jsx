import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const orders = [
  { id: 1, customer: "John Doe", status: "pending", total: 125.99 },
  { id: 2, customer: "Jane Smith", status: "delivered", total: 245.5 },
  { id: 3, customer: "Bob Johnson", status: "rejected", total: 99.99 },
  { id: 4, customer: "Alice Brown", status: "successful", total: 175.25 },
];

export default function OrderList() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <div className="flex gap-2 mt-2">
          <select
            className="p-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="rejected">Rejected</option>
            <option value="successful">Successful</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredOrders.map((order) => (
            <div key={order.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.customer}
                </p>
                <p className="text-sm text-muted-foreground">${order.total}</p>
              </div>
              <div
                className={cn(
                  "ml-auto rounded-full px-2 py-1 text-xs font-medium",
                  {
                    "bg-yellow-100 text-yellow-800": order.status === "pending",
                    "bg-green-100 text-green-800": order.status === "delivered",
                    "bg-red-100 text-red-800": order.status === "rejected",
                    "bg-blue-100 text-blue-800": order.status === "successful",
                  }
                )}
              >
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
