import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/products.ts";
import ProductCard from "../components/ProductCard.tsx";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch category list for dropdown
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch all products (only runs when "all" is selected)
  const { data: allProducts = [], isLoading: loadingAll } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    enabled: selectedCategory === "all",
  });

  // Fetch products by category (only runs when a category is selected)
  const { data: categoryProducts = [], isLoading: loadingCategory } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: selectedCategory !== "all",
  });

  const products = selectedCategory === "all" ? allProducts : categoryProducts;
  const isLoading = loadingAll || loadingCategory;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Products</h1>

      {/* Category dropdown - dynamically populated from API */}
      <div style={styles.filterRow}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 16px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "16px",
  },
  filterRow: {
    marginBottom: "24px",
  },
  select: {
    padding: "10px 16px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "24px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
    marginTop: "48px",
  },
};

export default Home;