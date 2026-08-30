import { createFileRoute } from '@tanstack/react-router'
import { BookingConfirmationPage } from '../components/BookingConfirmationPage'

export const Route = createFileRoute('/confirmation')({
  component: ConfirmationRoutePage,
})

export function ConfirmationRoutePage() {
  return <BookingConfirmationPage />
}
