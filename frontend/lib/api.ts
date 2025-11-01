export const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const Api = {
  listProducts: () => json("/catalog/products/"),
  listSalesOrders: () => json("/sales/sales-orders/"),
  listPurchaseOrders: () => json("/purchase/purchase-orders/"),
  confirmSO: (id: string) =>
    json(`/sales/sales-orders/${id}/confirm/`, { method: "POST" }),
};
