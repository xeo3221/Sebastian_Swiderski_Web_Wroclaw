import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/priceFormat";
import { fetchProducts } from "../services/productService";
import { useEffect, useState, useCallback } from "react";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading products:", error);
          setError(
            "Nie udało się załadować produktów. Spróbuj ponownie później."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
      };
      addToCart(cartItem);
    },
    [addToCart]
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Ładowanie produktów...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Brak dostępnych produktów.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Dostępne produkty
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {formatPrice(product.price)} zł
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
