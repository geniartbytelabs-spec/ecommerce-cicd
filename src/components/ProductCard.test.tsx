import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, test, expect } from 'vitest'
import ProductCard from './ProductCard'
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

function renderProductCard() {
  const store = createTestStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    ),
  }
}

describe('ProductCard', () => {

  test('renders product title and price', () => {
    renderProductCard()
    expect(screen.getByText('Test Laptop')).toBeInTheDocument()
    expect(screen.getByText('$999.99')).toBeInTheDocument()
  })

  test('dispatches addToCart when Add to Cart is clicked', () => {
    const { store } = renderProductCard()

    expect(store.getState().cart.items).toHaveLength(0)

    fireEvent.click(screen.getByText('Add to Cart'))

    expect(store.getState().cart.items).toHaveLength(1)
    expect(store.getState().cart.items[0].title).toBe('Test Laptop')
  })

})
