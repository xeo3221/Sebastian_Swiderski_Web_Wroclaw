import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { formatPrice, calculateItemTotal } from "../utils/priceFormat";

const OrderSummary = () => {
  const { items, placeOrder } = useCart();

  const total = items.reduce(
    (sum, item) =>
      sum + (item.price.main + item.price.fractional / 100) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    placeOrder();
    window.location.href = "/order-confirmation.html";
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
        Podsumowanie zamówienia
      </h2>
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
              <p className="text-gray-600 mt-1">Ilość: {item.quantity}</p>
              <p className="text-gray-600">
                Cena: {formatPrice(item.price)} zł
              </p>
              <p className="text-gray-800 font-medium">
                Suma częściowa: {calculateItemTotal(item.price, item.quantity)}{" "}
                zł
              </p>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">
              Suma całkowita:
            </span>
            <span className="text-2xl font-bold text-gray-900">
              {total.toFixed(2)} zł
            </span>
          </div>
          <div className="mt-6 space-y-4">
            <button
              onClick={handlePlaceOrder}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Złóż zamówienie
            </button>
            <Link
              to="/cart"
              className="block w-full text-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Wróć do koszyka
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
