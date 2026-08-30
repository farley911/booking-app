import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Booking, Stay } from '../types/api'

export interface SearchCriteria {
  fromDate: string
  toDate: string
  guests: number
}

export interface CartItem {
  id: number
  stay: Stay
  fromDate: string
  toDate: string
  guests: number
  totalPrice: number
}

export type CartItemInput = Omit<CartItem, 'id'>

export interface CheckoutConfirmation {
  bookings: Booking[]
  items: CartItem[]
  total: number
}

interface SearchState {
  status: 'idle' | 'loading' | 'success' | 'error'
  criteria: SearchCriteria | null
  stays: Stay[]
  error: string
}

interface BookingContextValue {
  searchState: SearchState
  searchStays: (criteria: SearchCriteria) => Promise<void>
  cartItems: CartItem[]
  addToCart: (item: CartItemInput) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  confirmation: CheckoutConfirmation | null
  setConfirmation: (confirmation: CheckoutConfirmation | null) => void
}

const initialSearchState: SearchState = {
  status: 'idle',
  criteria: null,
  stays: [],
  error: '',
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [searchState, setSearchState] = useState(initialSearchState)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [confirmation, setConfirmation] =
    useState<CheckoutConfirmation | null>(null)
  const nextCartItemId = useRef(1)

  async function searchStays(criteria: SearchCriteria) {
    setSearchState({
      status: 'loading',
      criteria,
      stays: [],
      error: '',
    })

    try {
      const searchParameters = new URLSearchParams({
        from_date: criteria.fromDate,
        to_date: criteria.toDate,
        guests: String(criteria.guests),
      })
      const response = await fetch(`/stays?${searchParameters.toString()}`)

      if (!response.ok) {
        throw new Error('Unable to search for stays.')
      }

      const stays = await response.json() as Stay[]
      setSearchState({
        status: 'success',
        criteria,
        stays,
        error: '',
      })
    } catch (error) {
      setSearchState({
        status: 'error',
        criteria,
        stays: [],
        error: String(error),
      })
    }
  }

  const value = useMemo<BookingContextValue>(() => ({
    searchState,
    searchStays,
    cartItems,
    addToCart: (item) => {
      const id = nextCartItemId.current
      nextCartItemId.current += 1
      setCartItems((items) => [...items, { ...item, id }])
    },
    removeFromCart: (id) => {
      setCartItems((items) => items.filter((item) => item.id !== id))
    },
    clearCart: () => {
      setCartItems([])
    },
    confirmation,
    setConfirmation,
  }), [cartItems, confirmation, searchState])

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)

  if (context === null) {
    throw new Error('useBooking must be used within a BookingProvider.')
  }

  return context
}
