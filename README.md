# ExpenseIQ — React Expense Tracker

A production-style expense tracking web app built with **React + Vite**, demonstrating all core React hooks, component architecture, local persistence, and live API integration.

---

## Quick Start

```bash
# 1. Navigate into the project
cd expense-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Other commands

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Folder Structure

```
src/
├── components/
│   ├── Dashboard.jsx      ← Layout shell, wires all panels together
│   ├── SummaryCards.jsx   ← KPI cards + category bar chart (useMemo)
│   ├── ExpenseForm.jsx    ← Add expense form (useRef, useState)
│   ├── SearchFilter.jsx   ← Search/filter/sort controls
│   ├── ExpenseList.jsx    ← Filtered sorted list (useMemo)
│   ├── ExpenseItem.jsx    ← Single expense row (useCallback)
│   └── ApiData.jsx        ← JSONPlaceholder API demo (useEffect)
│
├── services/
│   └── api.js             ← Centralised fetch functions
│
├── styles/
│   ├── App.css            ← Design tokens, reset, shared primitives
│   ├── Dashboard.css      ← Header, grid, cards, API table
│   └── Expense.css        ← Form, filter, list, item
│
├── App.jsx                ← Root: expense state + localStorage sync
└── main.jsx               ← ReactDOM entry point
```

---

## React Hooks — Where & Why

| Hook | File | Purpose |
|---|---|---|
| `useState` | App.jsx, ExpenseForm.jsx, ApiData.jsx | Expense list, form fields, API lifecycle |
| `useEffect` | App.jsx, ExpenseForm.jsx, ApiData.jsx | localStorage sync, auto-focus, API fetch |
| `useRef` | ExpenseForm.jsx | Imperative focus on the Title input |
| `useMemo` | SummaryCards.jsx, ExpenseList.jsx | Derived totals, filtered/sorted list |
| `useCallback` | App.jsx, ExpenseItem.jsx | Stable add/delete handlers |

---

## Features

- **Dashboard** with 4 live KPI cards (total, count, highest, average)
- **Category breakdown** animated progress bars
- **Add Expense** form with per-field validation and success flash
- **Auto-focus** on Title field via `useRef` (re-focuses after each submission)
- **Search** by title (live, case-insensitive)
- **Filter** by category
- **Sort** by date or amount (asc/desc)
- **Delete** with animated removal
- **localStorage persistence** — survives page refresh
- **Sample API Data** table fetched from JSONPlaceholder
- **Responsive** — mobile / tablet / desktop layouts
- **Accessible** — ARIA labels, keyboard navigable, reduced-motion safe

---

## Tech Stack

- React 18 (functional components only)
- Vite 5
- Plain CSS (no Tailwind, no CSS-in-JS)
- JavaScript ES2022+
- Google Fonts: Inter + Space Grotesk



Created By JOITA GHOSHAL