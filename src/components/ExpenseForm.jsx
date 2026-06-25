// components/ExpenseForm.jsx
// Controlled form for adding new expenses.
//
// useRef  → auto-focuses the Title field on mount (better UX than autoFocus attr,
//           since useRef gives us imperative DOM access whenever we need it).
// useState → tracks field values and per-field validation errors.

import React, { useState, useRef, useEffect } from 'react'
import '../styles/Expense.css'

const CATEGORIES = ['Electronics', 'Food', 'Furniture', 'Software', 'Travel', 'Health', 'Other']

const EMPTY_FORM = { title: '', amount: '', category: '', date: '' }
const EMPTY_ERRORS = { title: '', amount: '', category: '', date: '' }

export default function ExpenseForm({ onAdd }) {
  // ── useState: form field values ──────────────────────────────────────────
  const [form, setForm] = useState(EMPTY_FORM)

  // ── useState: validation messages ────────────────────────────────────────
  const [errors, setErrors] = useState(EMPTY_ERRORS)

  // ── useState: success flash ───────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false)

  // ── useRef: DOM reference to the Title input ──────────────────────────────
  // We use useRef instead of autoFocus so we can re-focus after each
  // successful submission — autoFocus only fires once on mount.
  const titleRef = useRef(null)

  // ── useEffect: focus title on mount ──────────────────────────────────────
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  // ── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const e = { ...EMPTY_ERRORS }
    let valid = true

    if (!form.title.trim()) {
      e.title = 'Title is required.'
      valid = false
    }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      e.amount = 'Enter a positive amount.'
      valid = false
    }
    if (!form.category) {
      e.category = 'Select a category.'
      valid = false
    }
    if (!form.date) {
      e.date = 'Pick a date.'
      valid = false
    }

    setErrors(e)
    return valid
  }

  // ── Submit handler ────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    onAdd({ ...form, amount: Number(form.amount) })
    setForm(EMPTY_FORM)
    setErrors(EMPTY_ERRORS)
    setSubmitted(true)

    // Re-focus title for rapid entry
    setTimeout(() => {
      titleRef.current?.focus()
      setSubmitted(false)
    }, 1800)
  }

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      // Clear the field's error on change so feedback is live
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  // Today's date string for the max attribute (no future dates)
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      {submitted && (
        <div className="form-success" role="status">
          ✓ Expense added successfully
        </div>
      )}

      {/* Title */}
      <div className="form-group">
        <label className="form-label" htmlFor="title">Expense Title</label>
        <input
          id="title"
          ref={titleRef}
          type="text"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          placeholder="e.g. Team lunch, Domain renewal"
          value={form.title}
          onChange={handleChange('title')}
        />
        {errors.title && <span className="error-msg">{errors.title}</span>}
      </div>

      {/* Amount */}
      <div className="form-group">
        <label className="form-label" htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          className={`form-input ${errors.amount ? 'input-error' : ''}`}
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange('amount')}
        />
        {errors.amount && <span className="error-msg">{errors.amount}</span>}
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label" htmlFor="category">Category</label>
        <select
          id="category"
          className={`form-input form-select ${errors.category ? 'input-error' : ''}`}
          value={form.category}
          onChange={handleChange('category')}
        >
          <option value="">Select category…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <span className="error-msg">{errors.category}</span>}
      </div>

      {/* Date */}
      <div className="form-group">
        <label className="form-label" htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          max={today}
          className={`form-input ${errors.date ? 'input-error' : ''}`}
          value={form.date}
          onChange={handleChange('date')}
        />
        {errors.date && <span className="error-msg">{errors.date}</span>}
      </div>

      <button type="submit" className="btn-primary">
        + Add Expense
      </button>
    </form>
  )
}
