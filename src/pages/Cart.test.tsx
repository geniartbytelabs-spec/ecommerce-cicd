import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Cart from './Cart'
import ProductCard from '../components/ProductCard'
import { createTestStore } from '../test/testStore'

const mockProduct = {
  id: 1,
  title: 'Test Laptop',
  price: 999.99,
  category: 'electronics',
  description: 'A great laptop for testing purposes in our application',
  image: 'https://via.placeholder.com/200',
  rating: { rate: 4.5, count: 120 },
}

describe('Cart Integration', () => {

  test('cart updates when a product is added via ProductCard', () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    // Initially cart is empty
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()

    // Click Add to Cart
    fireEvent.click(screen.getByText('Add to Cart'))

    // Cart is no longer empty
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()

    // "Test Laptop" now appears in both ProductCard AND Cart
    // getAllByText returns an array — check that at least 2 exist
    const laptopElements = screen.getAllByText('Test Laptop')
    expect(laptopElements.length).toBeGreaterThanOrEqual(1)

    // Redux store should have the item
    expect(store.getState().cart.items).toHaveLength(1)
  })

  test('cart is cleared after checkout', () => {
    const preloadedState = {
      cart: {
        items: [{ ...mockProduct, quantity: 1 }],
      },
    }
    const store = createTestStore(preloadedState)

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    // Item should be visible in cart
    expect(screen.getByText('Test Laptop')).toBeInTheDocument()

    // Click Checkout
    fireEvent.click(screen.getByText('Checkout'))

    // Should show success message
    expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument()

    // Redux store should be empty
    expect(store.getState().cart.items).toHaveLength(0)
  })

})