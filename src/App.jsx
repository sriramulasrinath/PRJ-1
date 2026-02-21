import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) {
      setSubmittedName(trimmed)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>DevOps Practice App</h1>
      </header>

      <section className="description">
        <h2>About</h2>
        <p>
          This is a simple frontend-only application for practicing Docker and Kubernetes.
          Enter your name below and submit to see it displayed on the page. No backend or database—everything runs in the browser.
        </p>
      </section>

      <section className="form-section">
        <h2>Say Hello</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            maxLength={100}
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      {submittedName && (
        <section className="result" aria-live="polite">
          <h2>Hello, {submittedName}!</h2>
          <p>Your name has been displayed dynamically on this page.</p>
        </section>
      )}
    </div>
  )
}

export default App
