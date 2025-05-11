import { Product, ProductsResponse } from "../types/product";

const BASE_URL = "https://xeo3221.github.io/Sebastian_Swiderski_Web_Wroclaw";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/products.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
