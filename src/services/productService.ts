import { Product, ProductsResponse } from "../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/api/products.json");
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
