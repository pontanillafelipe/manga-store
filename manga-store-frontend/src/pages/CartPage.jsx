import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../utils/formatPrice";
import "./CartPage.css";

function CartPage() {

  const { cart, clearCart, addToCart, decreaseQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (sum, manga) => sum + manga.price * manga.quantity,
    0
  );

  const handleCheckout = async () => {

    const order = {
      userId: 1,
      items: cart.map(manga => ({
        mangaId: manga.id,
        quantity: manga.quantity
      }))
    };

    await createOrder(order);

    clearCart();

    alert("Orden creada!");
  };

  return (

    <div className="cart-container">

      <h2 className="cart-title">Carrito</h2>

      {cart.length === 0 && <p>Tu carrito está vacío</p>}

      {cart.map((manga) => (

        <div key={manga.id} className="cart-item">

          <img
            src={`http://localhost:8080${manga.imageUrl}`}
            alt={manga.title}
            className="cart-image"
          />

          <div className="cart-info">

            <div className="cart-title-item">
              {manga.title}
            </div>

            <div className="cart-price">
              Precio: {formatPrice(manga.price)}
            </div>

          </div>

          <div className="cart-quantity">

            <button onClick={() => decreaseQuantity(manga.id)}>
              -
            </button>

            <span>{manga.quantity}</span>

            <button onClick={() => addToCart(manga)}>
              +
            </button>

          </div>

          <div className="cart-subtotal">
            {formatPrice(manga.price * manga.quantity)}
          </div>

        </div>

      ))}

      {cart.length > 0 && (

        <div className="cart-summary">

          <div className="cart-total">
            Total: ${formatPrice(total)}
          </div>

          <div className="cart-actions">

            <button className="clear-btn" onClick={clearCart}>
              Vaciar carrito
            </button>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default CartPage;