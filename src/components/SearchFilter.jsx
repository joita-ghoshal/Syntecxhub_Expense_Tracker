// components/SearchFilter.jsx
// Controls for searching, filtering by category, and sorting.
// All state lives in the parent (Dashboard) so ExpenseList can read it too.

import React from 'react'
import '../styles/Expense.css'

const CATEGORIES = ['All', 'Electronics', 'Food', 'Furniture', 'Software', 'Travel', 'Health', 'Other']

const SORT_OPTIONS = [
  { value: 'date-desc',   label: 'Newest first' },
  { value: 'date-asc',    label: 'Oldest first' },
  { value: 'amount-desc', label: 'Highest amount' },
  { value: 'amount-asc',  label: 'Lowest amount' },
]

export default function SearchFilter({ search, category, sortBy, onSearch, onCategory, onSort }) {
  return (
    <div className="search-filter">
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="text"
          className="form-input search-input"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search expenses"
        />
        {search && (
          <button className="search-clear" onClick={() => onSearch('')} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      <div className="filter-row">
        <select
          className="form-input form-select filter-select"
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="form-input form-select filter-select"
          value={sortBy}
          onChange={(e) => onSort(e.target.value)}
          aria-label="Sort expenses"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
