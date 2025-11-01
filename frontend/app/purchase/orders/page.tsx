import { Api } from "@/lib/api";

export default async function PurchaseOrdersPage() {
  const orders = await Api.listPurchaseOrders().catch(() => []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Purchase Orders</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
}
