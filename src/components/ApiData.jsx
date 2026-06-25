// components/ApiData.jsx
// Fetches and displays sample user data from JSONPlaceholder.
//
// useEffect → triggers the fetch once on mount (empty dependency array).
//             The cleanup flag prevents setState on an unmounted component
//             — a common React pattern when dealing with async effects.

import React, { useState, useEffect } from 'react'
import { fetchSampleUsers } from '../services/api.js'
import '../styles/Dashboard.css'

export default function ApiData() {
  // ── useState: async data lifecycle ───────────────────────────────────────
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── useEffect: fetch on mount ─────────────────────────────────────────────
  useEffect(() => {
    // Guard flag: if the component unmounts before the fetch resolves,
    // we skip the setState call to avoid a React warning.
    let cancelled = false

    async function load() {
      try {
        const data = await fetchSampleUsers()
        if (!cancelled) {
          setUsers(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    // Cleanup: mark as cancelled when component unmounts
    return () => { cancelled = true }
  }, []) // empty array → run once on mount only

  return (
    <section className="api-section">
      <div className="api-header">
        <div>
          <h2 className="panel-title">Sample API Data</h2>
          <p className="api-subtitle">
            Fetched via <code>useEffect</code> from{' '}
            <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noreferrer">
              jsonplaceholder.typicode.com/users
            </a>
          </p>
        </div>
        {!loading && !error && (
          <span className="api-badge">{users.length} users loaded</span>
        )}
      </div>

      {loading && (
        <div className="api-loading">
          <span className="loader" aria-hidden="true" />
          Fetching users…
        </div>
      )}

      {error && (
        <div className="api-error" role="alert">
          ⚠ Failed to load: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="api-table-wrap">
          <table className="api-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="td-id">{u.id}</td>
                  <td className="td-name">{u.name}</td>
                  <td className="td-email">{u.email}</td>
                  <td>{u.company}</td>
                  <td>{u.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
