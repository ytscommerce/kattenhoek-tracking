export default async function handler(req, res) {
  try {
    const store = process.env.SHOPIFY_STORE;
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

    const query = `
      query {
        shop {
          name
        }
      }
    `;

    const response = await fetch(
      `https://${store}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();

    res.status(200).json({
      status: response.status,
      data: data,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
