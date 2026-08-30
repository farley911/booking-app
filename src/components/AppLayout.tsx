import type { ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from '@tanstack/react-router'
import logo from '../assets/logo.png'

const taxDisclaimer =
  '*Taxes are not included. Prices shown are the lowest available for each night. Prices shown may be available only with multi-night stays or arrival on a specific day.'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <AppBar
        position="static"
        component="header"
        color="inherit"
        elevation={0}
        aria-label="Application header"
        style={{
          width: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
        sx={{
          bgcolor: '#000',
          color: 'common.white',
        }}
      >
        <Toolbar
          sx={{
            minWidth: 'max-content',
            flexWrap: 'nowrap',
            gap: { xs: 1.5, sm: 3 },
            px: { xs: 1, sm: 3 },
          }}
        >
          <Link to="/" aria-label="Airik's Resort home">
            <Box
              component="img"
              src={logo}
              alt="Airik's Resort"
              sx={{
                display: 'block',
                height: { xs: 40, sm: 56 },
                width: 'auto',
              }}
            />
          </Link>

          |

          <Typography
            component="span"
            variant="body1"
            sx={{ flexGrow: 1 }}
          >
            LAS VEGAS
          </Typography>

          <ShoppingCartIcon
            titleAccess="Shopping cart"
            fontSize="large"
          />
        </Toolbar>
      </AppBar>

      <Box
        component="section"
        role="search"
        aria-label="Search and filters"
        style={{ width: '100%' }}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" component="h2">
          Search / Filter Bar
        </Typography>
        <Typography color="text.secondary">Placeholder</Typography>
      </Box>

      <Box
        component="main"
        style={{ width: '100%' }}
        sx={{
          flex: 1,
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        style={{
          width: '100%',
          overflowWrap: 'anywhere',
          whiteSpace: 'normal',
        }}
        sx={{
          py: 2,
          px: 2,
          textAlign: 'center',
          bgcolor: '#000',
          color: 'common.white',
        }}
      >
        <Typography variant="body2" color="inherit">
          <strong>
            {taxDisclaimer}
          </strong>
        </Typography>
        <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
          Copyright © 2026 Airik Resorts International. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
