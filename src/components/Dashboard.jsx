// components/Dashboard.jsx
// Layout shell that arranges all feature panels.
// Does not own business logic — it just wires children together.

import React, { useState } from 'react'
import SummaryCards from './SummaryCards.jsx'
import ExpenseForm from './ExpenseForm.jsx'
import SearchFilter from './SearchFilter.jsx'
import ExpenseList from './ExpenseList.jsx'
import ApiData from './ApiData.jsx'
import '../styles/Dashboard.css'

export default function Dashboard({ expenses, onAdd, onDelete }) {
  // Search / filter / sort state lives here so SearchFilter and ExpenseList
  // share it without lifting it all the way to App.
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [sortBy, setSortBy]       = useState('date-desc')

  return (
    <div className="dashboard">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="dashboard-header">
        <div className="header-brand">
          <span className="header-logo" aria-hidden="true">◈</span>
          <div>
            <h1 className="header-title">ExpenseIQ</h1>
            <p className="header-subtitle">Smart expense tracking for modern teams</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="header-badge">{expenses.length} transactions</span>
        </div>
      </header>

      <main className="dashboard-main">
        {/* ── Summary KPI row ─────────────────────────────── */}
        <SummaryCards expenses={expenses} />

        {/* ── Two-column: form + list ──────────────────────── */}
        <div className="dashboard-grid">
          <section className="panel panel-form">
            <h2 className="panel-title">Add Expense</h2>
            <ExpenseForm onAdd={onAdd} />
          </section>

          <section className="panel panel-list">
            <h2 className="panel-title">Transactions</h2>
            <SearchFilter
              search={search}
              category={category}
              sortBy={sortBy}
              onSearch={setSearch}
              onCategory={setCategory}
              onSort={setSortBy}
            />
            <ExpenseList
              expenses={expenses}
              search={search}
              category={category}
              sortBy={sortBy}
              onDelete={onDelete}
            />
          </section>
        </div>

        {/* ── API demo section ─────────────────────────────── */}
        <ApiData />
      </main>
    </div>
  )
}
