# Mohamed Habib Portfolio

A bilingual (Arabic/English) developer portfolio for Mohamed Habib. Designed to showcase specialized expertise in full-stack development, systems engineering, automation, and AI infrastructure.

## Key Features

- **Interactive 3D Systems Visualizer**: Built with **Three.js** patterns, displaying real-time configurable architecture nodes with interactive particle fields.
- **Bilingual (LTR / RTL) Layout**: Complete side-by-side Arabic and English support, designed to match typography scales across linguistic layouts.
- **Direct Messaging**: Built-in contact form that directly initiates a local email client draft using mailto routing.
- **Responsive Modular Components**: Custom-crafted layout, navigation, and section modules styled exclusively with modern Tailwind CSS utilities.
- **Optimized Architecture**: Lazy-loaded 3D graphics using React Suspense and IntersectionObserver to improve initial bundle delivery and maintain smooth client rendering.

## Technology Stack

- **Frontend**: React (v19), TypeScript, Tailwind CSS
- **3D Graphics**: Three.js
- **Icons**: Inline optimized SVGs
- **Packaging & Build System**: Vite, npm

## Local Development Instructions

Follow these steps to run the portfolio locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system (v18+ recommended).

### 1. Install Dependencies

Clone the repository and run:

```bash
npm install
```

### 2. Run the Development Server

Start the local server with hot module replacement:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 3. Production Build

To compile a static build:

```bash
npm run build
```

This will output the static files to the `/dist` directory.

### 4. Local Preview of Production Build

To preview the compiled production build locally:

```bash
npm run preview
```

## Deployment Notes

Since this is a client-side Single Page Application (SPA), it can be deployed to any static web hosting provider (such as Vercel, Netlify, GitHub Pages, or AWS S3).

### Direct Deploy to Vercel/Netlify

1. Connect your repository to **Vercel** or **Netlify**.
2. Configure the following build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click deploy. No environment variables are required.

## Privacy & Security

The contact form runs entirely client-side and does not utilize any third-party databases. Submitting the form opens the user's default email client with a prepared draft, allowing messages to be sent directly and transparently.
