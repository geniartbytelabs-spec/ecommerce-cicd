import { useState } from "react";
import { useDispatch } from "react-redux";
import type { Product } from "../types";
import { addToCart } from "../store/cartSlice";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div style={styles.card}>
      <img
        src={
          imgError
            ? "https://via.placeholder.com/200x200?text=No+Image"
            : product.image
        }
        alt={product.title}
        style={styles.image}
        onError={() => setImgError(true)}
      />
      <div style={styles.info}>
        <p style={styles.category}>{product.category}</p>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.description}>
          {product.description.slice(0, 80)}...
        </p>
        <div style={styles.ratingRow}>
          <span>⭐ {product.rating.rate}</span>
          <span style={styles.price}>${product.price.toFixed(2)}</span>
        </div>
        <button onClick={handleAddToCart} style={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    padding: "16px",
    backgroundColor: "#f9f9f9",
  },
  info: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  category: {
    color: "#888",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    margin: 0,
  },
  title: {
    fontSize: "0.95rem",
    fontWeight: "bold",
    margin: 0,
    lineHeight: "1.3",
  },
  description: {
    fontSize: "0.85rem",
    color: "#555",
    margin: 0,
  },
  ratingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#e94560",
  },
  button: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "auto",
  },
};

export default ProductCard;