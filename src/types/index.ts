// Shape of the rating object inside each product
export interface Rating {
  rate: number;
  count: number;
}

// Shape of a product from FakeStoreAPI
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

// CartItem = Product + quantity field
export interface CartItem extends Product {
  quantity: number;
}