
# Hoops Predictor Frontend

This is the React + TypeScript frontend for the Hoops Predictor app, built with Vite.

## Getting Started

### 1. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) (v18 or newer recommended) and [npm](https://www.npmjs.com/) installed.

Clone the repo and install dependencies:

```sh
git clone <repo-url>
cd nba-project-frontend
npm install
```

### 2. Configure environment (optional)

If you need to change the backend API URL, edit `src/config/api.ts` or set the `VITE_API_BASE_URL` environment variable in a `.env` file.

### 3. Run the development server

Start the Vite dev server:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Build for production

To build the app for production:

```sh
npm run build
```

## Troubleshooting

- If you get errors about missing dependencies, run `npm install` again.
- If the frontend cannot connect to the backend, check your API URL in `src/config/api.ts` and make sure the backend is running.
