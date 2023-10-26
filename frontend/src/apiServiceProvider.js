"use strict";

const API_URL = "https://amarantfrog.com";

const apiServiceProvider = {
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/products`);

      if (!response.ok) throw new Error("Error: Cannot Fetch Products");
      const contentType = response.headers.get("content-type");
      console.log(response);
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  },

  addProducts: async (data) => {
    try {
      console.log(data);
      const response = await fetch(`${API_URL}/api/v1/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(JSON.stringify(data));
      if (response.status === 200) {
        const newProduct = true;
        return newProduct;
      }
      throw new Error("Error: Cannot Add Product!");
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  },
  deleteProducts: async (skus) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/products/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ skus }),
      });
      if (!response.ok) throw new Error("Error: Cannot Delete Products");

      return true;
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  },

  checkIfSkuExists: async (sku) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/products/checksku`);
      if (response.status === 200) {
        const product = await response.json();
        return product;
      }
      throw new Error("Error: Product SKU doesnt exist!");
    } catch (err) {
      throw new Error(`Error: ${err.message}`);
    }
  },
};
export default apiServiceProvider;
