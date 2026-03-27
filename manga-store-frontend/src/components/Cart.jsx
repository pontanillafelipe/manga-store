import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Cart() {

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
    <div style={{ marginTop: "40px" }}>
      <h2>Carrito</h2>

      {cart.length === 0 && <p>El carrito está vacío</p>}

      {cart.map((manga) => (
        <div key={manga.id} style={{ marginBottom: "10px" }}>

            <strong>{manga.title}</strong>

            <div>
            <button onClick={() => decreaseQuantity(manga.id)}>
                -
            </button>

            <span style={{ margin: "0 10px" }}>
                {manga.quantity}
            </span>

            <button onClick={() => addToCart(manga)}>
                +
            </button>
            </div>

            <p>${manga.price * manga.quantity}</p>

        </div>
        ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout} style={{ marginTop: "10px" }}>
            Comprar
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;