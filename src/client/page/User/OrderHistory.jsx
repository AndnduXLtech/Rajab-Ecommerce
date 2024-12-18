import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { api } from "../utils/fetcher";

export default function OrderHistory() {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.get("/api/orders").then((res) => res.data),
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Order placed{" "}
                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 py-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
