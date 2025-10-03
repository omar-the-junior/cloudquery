# CloudQuery Monorepo

This is the monorepo for the CloudQuery project.

[Challenge Link](https://www.spaceappschallenge.org/2025/challenges/will-it-rain-on-my-parade/?tab=details)

## Packages

- `web-app`: Laravel web application.
- `docs`: Documentation.
- `analytics-engine`: Python analytics engine with FastAPI.

## Prerequisites

- Docker
- pnpm
- PHP, Composer
- Python

## Getting Started

1.  Install dependencies. This will also set up the Python environment for the `analytics-engine`.
    ```bash
    pnpm install
    ```
2.  Copy the environment file for the web-app:
    ```bash
    cp web-app/.env.example web-app/.env
    ```
3.  Start the development environment:
    ```bash
    pnpm dev
    ```
    This will start:
    - MySQL database in Docker.
    - Laravel web server.
    - FastAPI analytics engine.
