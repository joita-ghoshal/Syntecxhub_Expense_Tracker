// App.jsx
// Root component. Owns all shared expense state so it can be passed down
// to Dashboard (display) and ExpenseForm (mutations) without prop-drilling
// through unrelated layers.

import React, { useState, useEffect, useCallback } from 'react'
import Dashboard from './components/Dashboard.jsx'
import './styles/App.css'

// Seed data shown on first load (before the user adds anything)
const SEED_EXPENSES = [
  { id: 1, title: 'MacBook Pro Charger', amount: 89, category: 'Electronics', date: '2025-05-10' },
  { id: 2, title: 'Office Desk Chair',   amount: 340, category: 'Furniture',   date: '2025-05-14' },
  { id: 3, title: 'Adobe CC Subscription', amount: 55, category: 'Software',  date: '2025-05-20' },
  { id: 4, title: 'Team Lunch',          amount: 120, category: 'Food',        date: '2025-06-02' },
  { id: 5, title: 'Domain Renewal',     amount: 14,  category: 'Software',    date: '2025-06-08' },
  { id: 6, title: 'Mechanical Keyboard', amount: 175, category: 'Electronics', date: '2025-06-15' },
]

/** Load persisted expenses from localStorage, falling back to seed data. */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem('expenseiq_expenses')
    return raw ? JSON.parse(raw) : SEED_EXPENSES
  } catch {
    return SEED_EXPENSES
  }
}

export default function App() {
  // ── useState ─────────────────────────────────────────────────────────────
  // Single source of truth for the expense list. Initialised lazily from
  // localStorage so the UI reflects the user's last session immediately.
  const [expenses, setExpenses] = useState(loadFromStorage)

  // ── useEffect ────────────────────────────────────────────────────────────
  // Persist expenses to localStorage whenever the list changes.
  // Using a dedicated effect keeps the persistence concern separate from
  // the state mutations below.
  useEffect(() => {
    localStorage.setItem('expenseiq_expenses', JSON.stringify(expenses))
  }, [expenses])

  // ── useCallback ──────────────────────────────────────────────────────────
  // Stable reference for addExpense so ExpenseForm doesn't re-render
  // every time unrelated App state changes.
  const addExpense = useCallback((expense) => {
    setExpenses((prev) => [
      { ...expense, id: Date.now() },
      ...prev,
    ])
  }, [])

  // Stable reference for deleteExpense passed down to ExpenseList / ExpenseItem.
  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return (
    <div className="app-root">
      <Dashboard
        expenses={expenses}
        onAdd={addExpense}
        onDelete={deleteExpense}
      />
    </div>
  )
}
