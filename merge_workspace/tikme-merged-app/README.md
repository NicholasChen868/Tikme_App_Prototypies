# TikMe Merged App

React application converted from TikMe HTML prototypes - Phase 4 Implementation.

## Overview

This application merges two TikMe prototypes into a unified React application:
- **PreClass Dashboard** - Student management and readiness tracking
- **InClass Teaching** - Live teaching interface with 4C ChopChep method

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **React Router DOM** - Client-side routing
- **CSS Variables** - Design system

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at http://localhost:3000

### Build

```bash
npm run build
```

Build output: `../builds/production/`

## Routes

- `/` - Redirects to `/preclass`
- `/preclass` - PreClass Dashboard
- `/inclass` - InClass Teaching

## Features

### PreClass Dashboard
- Student cards with metrics visualization
- Filtering by readiness status
- Student detail modal with skills breakdown
- Stats overview

### InClass Teaching
- 90-minute countdown timer
- 5 phase navigation (Warmup, Check, Drill, Practice, Wrapup)
- Tools palette (6 teaching tools)
- Student panel with live status
- Collapsible student panel

## Project Structure

```
src/
├── components/
│   ├── shared/          # Navigation
│   ├── preclass/        # PreClass components
│   └── inclass/         # InClass components
├── pages/
│   ├── PreClassDashboard/
│   └── InClassTeaching/
├── styles/              # CSS variables
├── utils/               # Helpers & mock data
└── App.jsx              # Main app with routing
```

## Path Aliases

- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@styles/` → `src/styles/`
- `@utils/` → `src/utils/`

## Contact

PM: ClaudeK | Dev: ClaudeCode | Date: 30/11/2025
