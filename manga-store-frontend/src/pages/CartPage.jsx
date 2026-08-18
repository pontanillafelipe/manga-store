import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../utils/formatPrice";
import toast from "react-hot-toast";
import "../styles/CartPage.css";

function CartPage() {
  const { cart, clearCart, addToCart, decreaseQuantity } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);

  const total = cart.reduce(
    (sum, manga) => sum + manga.price * manga.quantity,
    0,
  );

  const handleCheckout = async () => {
  if (!user) {
    toast.error("Debes iniciar sesión para realizar la compra.");
    return;
  }

  if (cart.length === 0) {
    toast.error("Tu carrito está vacío.");
    return;
  }

  try {
    const order = {
      userId: user.id,
      items: cart.map((manga) => ({
        mangaId: manga.id,
        quantity: manga.quantity,
      })),
    };

    await createOrder(order);

    clearCart();

    toast.success("¡Orden creada correctamente!");
  } catch (error) {
    console.error("Error al crear la orden:", error);
    toast.error("No se pudo crear la orden.");
  }
};

  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      clearCart();
    }
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
            <div className="cart-title-item">{manga.title}</div>

            <div className="cart-price">Precio: {formatPrice(manga.price)}</div>
          </div>

          <div className="cart-quantity">
            <button onClick={() => decreaseQuantity(manga.id)}>-</button>

            <span>{manga.quantity}</span>

            <button onClick={() => addToCart(manga)}>+</button>
          </div>

          <div className="cart-subtotal">
            {formatPrice(manga.price * manga.quantity)}
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">Total: {formatPrice(total)}</div>

          <div className="cart-actions">
            <button className="clear-btn" onClick={handleClearCart}>
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
