// components/SummaryCards.jsx
// Computes and displays four KPI summary cards.
//
// useMemo is used for every derived value so calculations only re-run
// when the expenses array changes — not on every parent render cycle.

import React, { useMemo } from 'react'
import '../styles/Dashboard.css'

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function SummaryCards({ expenses }) {
  // ── useMemo: Total ───────────────────────────────────────────────────────
  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
    [expenses]
  )

  // ── useMemo: Average ─────────────────────────────────────────────────────
  const average = useMemo(
    () => (expenses.length === 0 ? 0 : total / expenses.length),
    [total, expenses.length]
  )

  // ── useMemo: Highest single expense ──────────────────────────────────────
  const highest = useMemo(
    () => (expenses.length === 0 ? 0 : Math.max(...expenses.map((e) => Number(e.amount)))),
    [expenses]
  )

  // ── useMemo: Category breakdown (used in analytics strip) ────────────────
  const categoryTotals = useMemo(() => {
    const map = {}
    for (const e of expenses) {
      map[e.category] = (map[e.category] ?? 0) + Number(e.amount)
    }
    // Sort by value descending for the progress bars
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [expenses])

  const cards = [
    {
      label: 'Total Expenses',
      value: fmt(total),
      icon: '₹',
      accent: 'blue',
      sub: `across ${expenses.length} items`,
    },
    {
      label: 'Transactions',
      value: expenses.length,
      icon: '#',
      accent: 'indigo',
      sub: 'recorded so far',
    },
    {
      label: 'Highest Expense',
      value: fmt(highest),
      icon: '↑',
      accent: 'violet',
      sub: 'single transaction',
    },
    {
      label: 'Average Expense',
      value: fmt(average),
      icon: '~',
      accent: 'sky',
      sub: 'per transaction',
    },
  ]

  return (
    <div className="summary-section">
      <div className="summary-cards">
        {cards.map((card) => (
          <div key={card.label} className={`summary-card accent-${card.accent}`}>
            <div className="card-icon-wrap">
              <span className="card-icon">{card.icon}</span>
            </div>
            <div className="card-body">
              <span className="card-label">{card.label}</span>
              <span className="card-value">{card.value}</span>
              <span className="card-sub">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category analytics strip */}
      {categoryTotals.length > 0 && (
        <div className="analytics-strip">
          <h3 className="strip-title">Category Breakdown</h3>
          <div className="category-bars">
            {categoryTotals.map(([cat, val]) => (
              <div key={cat} className="cat-row">
                <span className="cat-name">{cat}</span>
                <div className="cat-bar-track">
                  <div
                    className="cat-bar-fill"
                    style={{ width: `${(val / total) * 100}%` }}
                  />
                </div>
                <span className="cat-amount">{fmt(val)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
