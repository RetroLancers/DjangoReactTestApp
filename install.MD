# Project Installation Guide

This document explains how to set up the backend (Python) and frontend (Vite + React) for local development.

## Prerequisites
- Windows 10/11 (other OS notes included where relevant)
- Python 3.9+ installed and on PATH
- Node.js 18+ installed
- pnpm (preferred package manager for the frontend on Windows)

## Repository layout
- `backend/` — Django backend
  - `requirements/base.txt` — base Python dependencies for local dev
- `frontend/` — Vite + React frontend

---

## Backend setup (Python / .venv)
We recommend using a local virtual environment in the project root named `.venv`.

1) Create a virtual environment in the project root
- Windows (PowerShell):
  - `python -m venv .venv`

2) Activate the virtual environment
- Windows (PowerShell):
  - `./.venv/Scripts/Activate.ps1`

3) Upgrade pip (optional but recommended)
- `python -m pip install --upgrade pip`

4) Install dependencies from base.txt
- `python -m pip install -r backend/requirements/base.txt`

5) Environment variables
- If the backend uses environment variables, copy or create `backend/.env` as needed and set values accordingly.

6) Run backend (example)
- From the `backend/` directory:
  - `python manage.py migrate`
  - `python manage.py runserver`

---

## Frontend setup (Vite + React)
On Windows, you must use pnpm to install and run the frontend. The project uses the latest Vite, which currently has issues with some Windows/npm setups. pnpm works reliably here and is also faster and more efficient for development.

1) Install pnpm (if not installed)


2) Install frontend dependencies
- From the `frontend/` directory:
  - `pnpm install`

3) Start the dev server
- From the `frontend/` directory:
  - `pnpm dev`

The dev server will print a local URL (e.g., http://localhost:5173). If the backend runs on a different port, configure your frontend accordingly (e.g., via Vite proxy or environment files).

---

## Notes & Troubleshooting
- If activation of the virtual environment is blocked on Windows by execution policy, you can run PowerShell as Administrator and execute: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (understand the security implications before changing this setting), then try activating again.
- For Linux/macOS users:
  - Create venv: `python3 -m venv .venv`
  - Activate: `source .venv/bin/activate`
  - Install deps: `python -m pip install -r backend/requirements/base.txt`
  - Frontend still works with pnpm; npm may also work on non-Windows environments, but pnpm is recommended for consistency.
- If ports conflict (e.g., 8000 for Django or 5173 for Vite), change the port when launching the servers or stop the conflicting process.

---

## Quick start (Windows)
- Backend
  1. `python -m venv .venv`
  2. `./.venv/Scripts/Activate.ps1`
  3. `python -m pip install --upgrade pip`
  4. `python -m pip install -r backend/requirements/base.txt`
  5. `cd backend`
  6. `python manage.py migrate && python manage.py runserver`

- Frontend
  1. `cd frontend`
  2`pnpm install`
  3`pnpm dev`
