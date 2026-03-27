import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  const addToCart = (manga) => {

  const existing = cart.find(item => item.id === manga.id);

  if (existing) {

    const updatedCart = cart.map(item =>
      item.id === manga.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);

  } else {

    setCart([...cart, { ...manga, quantity: 1 }]);

  }
  };

  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
  
};

const decreaseQuantity = (id) => {

  const updatedCart = cart
    .map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);

  setCart(updatedCart);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, decreaseQuantity}}>
      {children}
    </CartContext.Provider>
  );

}