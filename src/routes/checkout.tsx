import { createFileRoute } from '@tanstack/react-router'
import { CheckoutPage } from '../components/CheckoutPage'

export const Route = createFileRoute('/checkout')({
  component: CheckoutRoutePage,
})

export function CheckoutRoutePage() {
  return <CheckoutPage />
}
