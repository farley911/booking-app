import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Stay } from '../types/api'

export interface SearchCriteria {
  fromDate: string
  toDate: string
  guests: number
}

export interface CartItem {
  stay: Stay
  fromDate: string
  toDate: string
  guests: number
  totalPrice: number
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
  addToCart: (item: CartItem) => void
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
      setCartItems((items) => [...items, item])
    },
  }), [cartItems, searchState])

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
