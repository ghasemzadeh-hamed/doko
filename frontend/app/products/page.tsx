import { Api } from "@/lib/api";

export default async function ProductsPage() {
  const products = await Api.listProducts().catch(() => []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
