import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    // Validar que el producto tenga un identificador único
    if (!producto.id && !producto.nombre) {
      console.error("Producto sin identificador único:", producto);
      return;
    }

    // Usar id si existe, sino usar nombre como fallback
    const identifier = producto.id || producto.nombre;

    setCartItems((prevItems) => {
      const itemExistente = prevItems.find(
        (item) => item.id === identifier || item.nombre === identifier
      );

      if (itemExistente) {
        return prevItems.map((item) =>
          item.id === identifier || item.nombre === identifier
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...producto,
            id: producto.id || identifier, // Asegurar que tenga id
            quantity: 1,
          },
        ];
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === id);

      if (itemExistente && itemExistente.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
