import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Add up all quantities to show total count in navbar
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        FakeStore
      </Link>
      <Link to="/cart" style={styles.cartLink}>
        🛒 Cart ({totalItems})
      </Link>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#1a1a2e",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  cartLink: {
    color: "#e94560",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default Navbar;