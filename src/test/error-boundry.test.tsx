import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
  type ErrorComponentProps,
} from '@tanstack/react-router'

function TestErrorBoundary({ error }: ErrorComponentProps) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  )
}

describe('error boundary', () => {
  test('renders the error UI when a route throws', async () => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
      errorComponent: TestErrorBoundary,
    })

    const brokenRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => {
        throw new Error('Test failure')
      },
    })

    const routeTree = rootRoute.addChildren([brokenRoute])

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ['/'],
      }),
    })

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', {
        name: /something went wrong/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('Test failure')).toBeInTheDocument()
  })
})