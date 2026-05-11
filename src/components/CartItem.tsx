import { useDispatch } from "react-redux";
import type { CartItem as CartItemType } from "../types";
import { removeFromCart } from "../store/cartSlice.ts";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <div style={styles.row}>
      <img
        src={item.image}
        alt={item.title}
        style={styles.image}
      />
      <div style={styles.details}>
        <p style={styles.title}>{item.title}</p>
        <p style={styles.quantity}>Qty: {item.quantity}</p>
      </div>
      <p style={styles.price}>
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        style={styles.removeBtn}
      >
        Remove
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    borderBottom: "1px solid #eee",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    backgroundColor: "#f9f9f9",
    padding: "4px",
    borderRadius: "4px",
  },
  details: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "0.95rem",
  },
  quantity: {
    margin: "4px 0 0",
    color: "#666",
    fontSize: "0.9rem",
  },
  price: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#e94560",
    minWidth: "80px",
    textAlign: "right",
    margin: 0,
  },
  removeBtn: {
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CartItem;