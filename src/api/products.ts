import axios from "axios";
import type { Product } from "../types";

// Base URL for all API requests
const BASE_URL = "https://fakestoreapi.com";

// Get all products
export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BASE_URL}/products`);
  return response.data;
};

// Get all category names
export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${BASE_URL}/products/categories`);
  return response.data;
};

// Get products filtered by category
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `${BASE_URL}/products/category/${category}`
  );
  return response.data;
};