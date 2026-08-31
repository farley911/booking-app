
# Airik's Hotel Booking App

This is a demo built by Airik Farley to showcase a React based hotel booking application.

All assets and inspiration was taken from the W resort in Las Vegas.

## Render Deployment
You can view the application deployed to Render here: https://airiks-resort.onrender.com/ _(My free instance will spin down with inactivity, which can delay requests by 50 seconds or more.)_

## Local development

Install dependencies:
```sh
npm  install
```

Start the mock API in one terminal:
```sh
npm  run  dev:api
```
The API listens at `http://127.0.0.1:3001`. Start the React application in a second terminal:
```sh
npm  run  dev
```
The Vite development server proxies `/stays` and `/bookings` to the API, so application code can use same-origin requests such as:
```text
GET /stays?from_date=2026-09-01&to_date=2026-09-02&guests=2
GET /stays/king_suite/reviews
POST /stays/king_suite/reviews
POST /bookings
```
POSTed reviews and bookings are stored in memory and reset when the API process restarts. The API also permits cross-origin requests for clients that call port 3001 directly.

## Notable Scripts

Run development server
```bash
npm run dev
```
Run development API server
```bash
npm run dev:api
```
Build
```bash
npm run build
```
Lint
```bash
npm run lint
```
Test
```bash
npm run test
```
Test w/ Coverage
```bash
npm run test:coverage
```
Stylelint
```bash
npm run lint:styles
```
Betterer
```bash
npm run betterer
```
Typecheck
```bash
npm run typecheck
```
Check (Typecheck, Lint, Stylelint, Test(Coverage), Build
```bash
npm run check
```

## Architecture Decisions
* I don't trust LLMs so guardrails and AI guidance is built into the foundation of the app before any code is generated.
* To help enforce those guardrails I install and incorporate Stylelint, ESLint, Jest, Code Coverage, Betterer and Typecheck as part of the workflow.
* The backend API is simplistic, not production ready and serves only the bare minimum to complete the app. 
	* This decision was made because I didn't want the API to distract from a Frontend React showcase.
* Lazy loading and code splitting wasn't really needed, but I decided to break the app in features and lazy load the checkout process as an example of the approach I'd use for a larger app.

## Tradeoffs
* Much of the design and UX represents a partial experience.
	* Example: Rooms don't actually have an availability so the search always shows all rooms as available. 
		* This particular decision was because adding availability would have added an additional endpoint and more code that wouldn't have shown anything that wasn't already visible elsewhere. 
* Some views aren't optimal with content being covered by other elements.
	* Example: The landing page has an empty state, but it's hidden by the date picker.
		* Reason: Polishing the app is a rabbit hole I didn't want to fall into.
* Because I choose to have my process be driven heavily by LLMs I spent the majority of my time working on defining Feature docs and providing them as LLM prompts.
	* Impact: This created a front heavy lift where most of the time was invested prior to writing code, and not much time remained to build the features out, limiting my polish.

## What Next?
I would build out the missing UX. Particularly around the search, I don't like that there is a missing /availability endpoint and that the rooms aren't filtered by guest count. I would also spend more time mapping out the actual error/loading states and improve validation and user feedback. I'd clean up some CSS and responsive behaviors like the image size, or the oblong carousel buttons.

## LLM Usage
I wanted to recreate how I work in a professional environment. To this end I used LLMs the same as I would professionally.

I began be establishing guardrails and rules for the LLM to adhere to using ESLint, Stylelint, Typecheck, Jest, Coverage, and Betterer. 

Additionally I added rules to enforce those gates whenever an agent completed a task ensuring it followed a strict ruleset for how to validate a task is complete and hasn't introduced any issues.

Once I had established that I broke the Epic down into smaller tasks and wrote up tech specs, acceptance criteria, swagger, and gherkin scenarios. Those technical docs were provided to the LLM as the prompt for it to use.

After the LLM had completed the task I manually reviewed the output for any issues and manually tested in the browser.