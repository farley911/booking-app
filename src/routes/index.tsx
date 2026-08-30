import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

export function HomePage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 6, sm: 10 },
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Main Content
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Placeholder
      </Typography>
    </Container>
  )
}
