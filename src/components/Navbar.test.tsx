import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Navbar from './Navbar'
import { createTestStore } from '../test/testStore'

function renderNavbar(preloadedState = {}) {
  const store = createTestStore(preloadedState)
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  )
}

describe('Navbar', () => {

  test('renders FakeStore brand name', () => {
    renderNavbar()
    expect(screen.getByText('FakeStore')).toBeInTheDocument()
  })

  test('shows Cart (0) when cart is empty', () => {
    renderNavbar()
    expect(screen.getByText(/Cart \(0\)/)).toBeInTheDocument()
  })

  test('shows correct total count when cart has items', () => {
    const preloadedState = {
      cart: {
        items: [
          {
            id: 1,
            title: 'Laptop',
            price: 999,
            quantity: 2,
            category: 'electronics',
            description: 'test',
            image: '',
            rating: { rate: 4.5, count: 100 },
          },
        ],
      },
    }
    renderNavbar(preloadedState)
    expect(screen.getByText(/Cart \(2\)/)).toBeInTheDocument()
  })

})