import { Api } from "@/lib/api";

export default async function SalesOrdersPage() {
  const orders = await Api.listSalesOrders().catch(() => []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Sales Orders</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
}
