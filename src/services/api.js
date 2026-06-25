// services/api.js
// Centralized API service for all external data fetching.
// Keeps fetch logic out of components so they stay focused on rendering.

const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Fetch a list of sample users to demonstrate useEffect-based API integration.
 * Returns a cleaned-up subset of fields from the JSONPlaceholder /users endpoint.
 */
export async function fetchSampleUsers() {
  const response = await fetch(`${BASE_URL}/users`)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const users = await response.json()

  // Shape the data so components only receive what they need
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company?.name ?? '—',
    city: user.address?.city ?? '—',
  }))
}
