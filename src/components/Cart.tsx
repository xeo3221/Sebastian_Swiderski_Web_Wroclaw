import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { formatPrice } from "../utils/priceFormat";
import { useState } from "react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) =>
      sum + (item.price.main + item.price.fractional / 100) * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, newQuantity: string) => {
    try {
      const quantity = parseInt(newQuantity);
      if (isNaN(quantity)) {
        setError("Wprowadź poprawną liczbę");
        return;
      }
      if (quantity < 1) {
        setError("Ilość musi być większa niż 0");
        return;
      }
      updateQuantity(id, quantity);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Twój koszyk jest pusty
        </h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Wróć do listy produktów
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Koszyk zakupowy
      </h2>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-1">
                Cena: {formatPrice(item.price)} zł
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                max="99"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                onBlur={(e) => {
                  if (!e.target.value) {
                    handleQuantityChange(item.id, "1");
                  }
                }}
                className="w-20 mr-4 p-2 border rounded"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Usuń produkt"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Suma:</span>
            <span className="text-2xl font-bold text-gray-900">
              {total.toFixed(2)} zł
            </span>
          </div>
          <div className="mt-6 space-y-4">
            <Link
              to="/order-summary"
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Przejdź do podsumowania
            </Link>
            <Link
              to="/"
              className="block w-full text-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Kontynuuj zakupy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
