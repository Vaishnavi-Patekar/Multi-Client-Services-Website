import { useEffect, useState } from "react";
import API from "../api/api";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data?.items || []);
  };

  const removeItem = async (serviceId) => {
    await API.delete(`/cart/remove/${serviceId}`);
    loadCart();
  };

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.service._id}>
            <h4>{item.service.title}</h4>
            <p>Price: ₹{item.service.price}</p>
            <p>Quantity: {item.quantity}</p>

            <button onClick={() => removeItem(item.service._id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
