import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { clearCart } from "../store/cartSlice.ts";
import CartItem from "../components/CartItem.tsx";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Calculate total quantity of all items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price of all items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckoutSuccess(true);
  };

  // Show success screen after checkout
  if (checkoutSuccess) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successBox}>
          <p style={styles.successIcon}>✅</p>
          <h2 style={styles.successTitle}>Order Placed Successfully!</h2>
          <p style={styles.successMsg}>
            Your cart has been cleared. Thank you for your purchase!
          </p>
          <a href="/" style={styles.continueBtn}>
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // Show empty cart message
  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyIcon}>🛒</p>
        <h2>Your cart is empty</h2>
        <a href="/" style={styles.continueBtn}>
          Go Shopping
        </a>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shopping Cart</h1>

      {/* List of cart items */}
      <div style={styles.itemList}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Order summary */}
      <div style={styles.summary}>
        <div style={styles.summaryRow}>
          <span>Total Items:</span>
          <strong>{totalItems}</strong>
        </div>
        <div style={styles.summaryRow}>
          <span>Total Price:</span>
          <strong style={{ color: "#e94560" }}>
            ${totalPrice.toFixed(2)}
          </strong>
        </div>
        <button onClick={handleCheckout} style={styles.checkoutBtn}>
          Checkout
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px 16px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "24px",
  },
  itemList: {
    border: "1px solid #eee",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
  },
  summary: {
    marginTop: "24px",
    padding: "24px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.1rem",
    marginBottom: "12px",
  },
  checkoutBtn: {
    width: "100%",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "16px",
  },
  emptyContainer: {
    textAlign: "center",
    padding: "80px 24px",
  },
  emptyIcon: {
    fontSize: "4rem",
    margin: "0 0 16px",
  },
  successContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    padding: "24px",
  },
  successBox: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "48px",
    borderRadius: "12px",
    border: "1px solid #eee",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  successIcon: {
    fontSize: "4rem",
    margin: "0 0 16px",
  },
  successTitle: {
    fontSize: "1.5rem",
    marginBottom: "8px",
  },
  successMsg: {
    color: "#666",
    marginBottom: "24px",
  },
  continueBtn: {
    display: "inline-block",
    backgroundColor: "#1a1a2e",
    color: "white",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: "bold",
    marginTop: "8px",
  },
};

export default Cart;