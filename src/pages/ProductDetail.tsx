import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { Product } from "../types";
import { addToCart } from "../store/cartSlice";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };

  if (loading) return <div style={styles.centered}>Loading...</div>;

  if (error || !product) {
    return (
      <div style={styles.centered}>
        <p>{error || "Product not found"}</p>
        <button onClick={() => navigate("/")} style={styles.backButton}>Back to Products</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/")} style={styles.backLink}>Back to Products</button>
      <div style={styles.content}>
        <div style={styles.imageWrapper}>
          <img src={product.image} alt={product.title} style={styles.image} />
        </div>
        <div style={styles.info}>
          <p style={styles.category}>{product.category}</p>
          <h1 style={styles.title}>{product.title}</h1>
          <div style={styles.ratingRow}>
            <span style={styles.rating}>{product.rating.rate} ({product.rating.count} reviews)</span>
            <span style={styles.price}>${product.price.toFixed(2)}</span>
          </div>
          <p style={styles.description}>{product.description}</p>
          <button onClick={handleAddToCart} style={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: "1200px", margin: "0 auto", padding: "32px" },
  backLink: { background: "none", border: "none", color: "#1a1a2e", fontSize: "1rem", cursor: "pointer", marginBottom: "24px", fontWeight: "bold" },
  content: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" },
  imageWrapper: { backgroundColor: "#f9f9f9", borderRadius: "12px", padding: "48px", display: "flex", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", maxHeight: "400px", objectFit: "contain" },
  info: { display: "flex", flexDirection: "column", gap: "16px" },
  category: { color: "#888", fontSize: "0.85rem", textTransform: "uppercase", margin: 0, letterSpacing: "0.05em" },
  title: { fontSize: "1.75rem", fontWeight: "bold", margin: 0, lineHeight: "1.3" },
  ratingRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" },
  rating: { fontSize: "0.95rem", color: "#555" },
  price: { fontWeight: "bold", fontSize: "1.5rem", color: "#e94560" },
  description: { fontSize: "1rem", color: "#555", lineHeight: "1.6", margin: 0 },
  button: { backgroundColor: "#1a1a2e", color: "white", border: "none", padding: "14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem", marginTop: "16px" },
  centered: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 32px", gap: "16px" },
  backButton: { backgroundColor: "#1a1a2e", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
};

export default ProductDetail;
