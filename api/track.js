export default async function handler(req, res) {
  try {
    const store = process.env.SHOPIFY_STORE;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;

    const response = await fetch(`https://${store}/admin/api/2024-01/orders.json?limit=1`, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      orders_count: data.orders.length,
      sample_order: data.orders[0] || null,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
