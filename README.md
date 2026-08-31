# Airik's Hotel Booking App
This is a demo built by Airik Farley to showcase a React based travel booking application focused on Hotel management. 

All assets and inspiration was taken from the W resort in Las Vegas.

## Local development

Install dependencies:

```sh
npm install
```

Start the mock API in one terminal:

```sh
npm run dev:api
```

The API listens at `http://127.0.0.1:3001`. Start the React application in a
second terminal:

```sh
npm run dev
```

The Vite development server proxies `/stays` and `/bookings` to the API, so
application code can use same-origin requests such as:

```text
GET /stays?from_date=2026-09-01&to_date=2026-09-02&guests=2
GET /stays/king_suite/reviews
POST /stays/king_suite/reviews
POST /bookings
```

POSTed reviews and bookings are stored in memory and reset when the API
process restarts. The API also permits cross-origin requests for clients that
call port 3001 directly.

## Deploy to Render

This repository includes a Render Blueprint that builds the TanStack Start
application and runs the application server alongside the mock API.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Render, select **New > Blueprint** and connect the repository.
3. Apply the detected `render.yaml` Blueprint.

The deployed mock API still stores submitted reviews and bookings in memory,
so they reset whenever the Render service restarts or redeploys.