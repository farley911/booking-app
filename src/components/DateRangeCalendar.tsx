import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})
const dayFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function dateKey(year: number, month: number, day: number) {
  return [
    String(year),
    String(month + 1).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-')
}

function CalendarMonth({
  month,
  fromDate,
  toDate,
  onSelect,
}: {
  month: Date
  fromDate: string
  toDate: string
  onSelect: (date: string) => void
}) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const leadingDays = new Date(year, monthIndex, 1).getDay()
  const numberOfDays = new Date(year, monthIndex + 1, 0).getDate()

  return (
    <Box
      role="group"
      aria-label={monthFormatter.format(month)}
      sx={{ minWidth: 0, width: '100%' }}
    >
      <Typography
        component="h3"
        variant="h6"
        sx={{ mb: 2, textAlign: 'center' }}
      >
        {monthFormatter.format(month)}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(36px, 1fr))',
          rowGap: 0.5,
          textAlign: 'center',
        }}
      >
        {weekdays.map((weekday) => (
          <Typography
            key={weekday}
            component="span"
            color="text.secondary"
            sx={{ fontWeight: 500, py: 1 }}
          >
            {weekday}
          </Typography>
        ))}

        {Array.from({ length: leadingDays }, (_, index) => (
          <Box key={`empty-${index}`} aria-hidden="true" />
        ))}

        {Array.from({ length: numberOfDays }, (_, index) => {
          const day = index + 1
          const value = dateKey(year, monthIndex, day)
          const isEndpoint = value === fromDate || value === toDate
          const isInRange = value > fromDate && value < toDate

          return (
            <Box
              component="button"
              type="button"
              key={value}
              aria-label={`Choose ${dayFormatter.format(new Date(year, monthIndex, day))}`}
              aria-pressed={isEndpoint}
              onClick={() => {
                onSelect(value)
              }}
              sx={{
                appearance: 'none',
                bgcolor: isEndpoint
                  ? 'primary.main'
                  : isInRange
                    ? 'primary.50'
                    : 'transparent',
                border: 0,
                borderRadius: isEndpoint ? 1 : 0,
                color: isEndpoint ? 'primary.contrastText' : 'text.primary',
                cursor: 'pointer',
                font: 'inherit',
                minHeight: 44,
                p: 0.5,
                '&:focus-visible': {
                  outline: '3px solid',
                  outlineColor: 'primary.light',
                  outlineOffset: 1,
                },
                '&:hover': {
                  bgcolor: isEndpoint ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              {day}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export function DateRangeCalendar({
  displayedMonth,
  fromDate,
  toDate,
  onChangeMonth,
  onSelect,
}: {
  displayedMonth: Date
  fromDate: string
  toDate: string
  onChangeMonth: (offset: number) => void
  onSelect: (date: string) => void
}) {
  const nextMonth = new Date(
    displayedMonth.getFullYear(),
    displayedMonth.getMonth() + 1,
    1,
  )

  return (
    <Box
      id="stay-dates-picker"
      aria-label="Stay date picker"
      sx={{
        bgcolor: 'background.paper',
        boxSizing: 'border-box',
        boxShadow: 4,
        left: '50%',
        maxWidth: 920,
        p: { xs: 2, sm: 3 },
        position: 'absolute',
        top: '100%',
        transform: 'translateX(-50%)',
        width: '100%',
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'auto minmax(0, 1fr) auto',
        }}
      >
        <IconButton
          aria-label="Show previous months"
          onClick={() => {
            onChangeMonth(-1)
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              md: 'repeat(2, minmax(0, 1fr))',
            },
          }}
        >
          <CalendarMonth
            month={displayedMonth}
            fromDate={fromDate}
            toDate={toDate}
            onSelect={onSelect}
          />
          <CalendarMonth
            month={nextMonth}
            fromDate={fromDate}
            toDate={toDate}
            onSelect={onSelect}
          />
        </Box>

        <IconButton
          aria-label="Show next months"
          onClick={() => {
            onChangeMonth(1)
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
