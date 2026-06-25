// components/ExpenseItem.jsx
// Single expense row with title, category badge, date, amount, and delete.
//
// useCallback → the delete handler has a stable reference so React.memo
//               (if added later) can skip re-renders when only other rows change.

import React, { useCallback } from 'react'
import '../styles/Expense.css'

const CATEGORY_COLORS = {
  Electronics: '#6366f1',
  Food:        '#f59e0b',
  Furniture:   '#10b981',
  Software:    '#3b82f6',
  Travel:      '#ec4899',
  Health:      '#14b8a6',
  Other:       '#8b5cf6',
}

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export default function ExpenseItem({ expense, onDelete }) {
  const { id, title, amount, category, date } = expense

  // ── useCallback: stable delete handler per expense item ───────────────────
  // Wrapping in useCallback means the function reference stays the same
  // between renders as long as id and onDelete don't change.
  const handleDelete = useCallback(() => {
    onDelete(id)
  }, [id, onDelete])

  const color = CATEGORY_COLORS[category] ?? '#64748b'

  return (
    <li className="expense-item">
      <div className="item-left">
        <span
          className="item-dot"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div>
          <p className="item-title">{title}</p>
          <div className="item-meta">
            <span className="item-badge" style={{ color, borderColor: color }}>
              {category}
            </span>
            <span className="item-date">{fmtDate(date)}</span>
          </div>
        </div>
      </div>

      <div className="item-right">
        <span className="item-amount">{fmt(amount)}</span>
        <button
          className="btn-delete"
          onClick={handleDelete}
          aria-label={`Delete ${title}`}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </li>
  )
}
