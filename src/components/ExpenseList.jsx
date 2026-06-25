// components/ExpenseList.jsx
// Renders the filtered, sorted list of expense items.
//
// useMemo → derived list is only recomputed when expenses, search,
//           category, or sortBy changes — not on every render.

import React, { useMemo } from 'react'
import ExpenseItem from './ExpenseItem.jsx'
import '../styles/Expense.css'

export default function ExpenseList({ expenses, search, category, sortBy, onDelete }) {
  // ── useMemo: filtered + sorted view ──────────────────────────────────────
  const visible = useMemo(() => {
    let list = [...expenses]

    // 1. Filter by search query (case-insensitive title match)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((e) => e.title.toLowerCase().includes(q))
    }

    // 2. Filter by category
    if (category !== 'All') {
      list = list.filter((e) => e.category === category)
    }

    // 3. Sort
    switch (sortBy) {
      case 'amount-desc':
        list.sort((a, b) => b.amount - a.amount)
        break
      case 'amount-asc':
        list.sort((a, b) => a.amount - b.amount)
        break
      case 'date-asc':
        list.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'date-desc':
      default:
        list.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return list
  }, [expenses, search, category, sortBy])

  if (visible.length === 0) {
    return (
      <div className="list-empty">
        <span className="empty-icon" aria-hidden="true">🔍</span>
        <p>No expenses match your filters.</p>
        {(search || category !== 'All') && (
          <p className="empty-sub">Try clearing the search or changing the category.</p>
        )}
      </div>
    )
  }

  return (
    <ul className="expense-list" role="list">
      {visible.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  )
}
