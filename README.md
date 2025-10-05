# CloudQuery Monorepo

This is the monorepo for the CloudQuery project.

[Challenge Link](https://www.spaceappschallenge.org/2025/challenges/will-it-rain-on-my-parade/?tab=details)

## Packages

- `web-app`: React Router v7 web application with TypeScript and Tailwind CSS.
- `docs`: Documentation.
- `analytics-engine`: Python analytics engine with FastAPI.

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- Python (v3.8 or higher)

## Getting Started

1.  Install dependencies. This will also set up the Python environment for the `analytics-engine`.
    ```bash
    pnpm install
    ```
2.  Start the development environment:
    ```bash
    pnpm dev:all
    ```
    This will start:
    - React Router development server (web-app)
    - FastAPI analytics engine
