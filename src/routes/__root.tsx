import type { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { Button, Container, Typography } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'My App',
      },
    ],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootErrorComponent({ error, reset }: {
  error: Error,
  reset: () => void
}) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        paddingTop: 4,
      }}
    >
      <Typography variant="h4">
        Something went wrong
      </Typography>

      <Typography>
        {error.message}
      </Typography>

      <Button
        variant="contained"
        onClick={reset}
      >
        Try Again
      </Button>
    </Container>
  )
}