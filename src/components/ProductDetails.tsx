import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product";
import { useCart } from "../hooks/useCart";

const BASE_URL = "https://xeo3221.github.io/Sebastian_Swiderski_Web_Wroclaw";

interface CartItem extends Product {
  quantity: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/api/products.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.products.find(
          (p: Product) => p.id === Number(id)
        );
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Produkt nie znaleziony
        </h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    const price = product.price.toString().split(".");
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: {
        main: parseInt(price[0]),
        fractional: parseInt(price[1] || "0"),
      },
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <div className="mt-8">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.main}.
                {product.price.fractional.toString().padStart(2, "0")} zł
              </span>
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
