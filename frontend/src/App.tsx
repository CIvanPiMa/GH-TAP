import { useState, useEffect, FormEvent } from 'react'
import './App.css'
import { Turn, ApiStatus } from './types'

const API_VERSION = import.meta.env.VITE_GH_TAP_API_VERSION || 'v1'
const API_URL_BASE = import.meta.env.VITE_GH_TAP_API_URL_BASE || 'http://localhost:8000'

const API_URL = `${API_URL_BASE}/api/${API_VERSION}`

function App() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [player, setPlayer] = useState<string>('')
  const [action, setAction] = useState<string>('')
  const [initiative, setInitiative] = useState<string>('')
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking...')

  // Check API health on mount
  useEffect(() => {
    fetch(`${API_URL_BASE}/health`)
      .then(res => res.json())
      .then(() => setApiStatus('connected'))
      .catch(() => setApiStatus('disconnected'))
  }, [])

  // Fetch turns
  const fetchTurns = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/turns`)
      const data: Turn[] = await response.json()
      setTurns(data)
    } catch (error) {
      console.error('Error fetching turns:', error)
    }
  }

  // Add a new turn
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!player || !action || !initiative) return

    try {
      const response = await fetch(`${API_URL}/turns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player,
          action,
          initiative: parseInt(initiative)
        })
      })

      if (response.ok) {
        setPlayer('')
        setAction('')
        setInitiative('')
        fetchTurns()
      }
    } catch (error) {
      console.error('Error creating turn:', error)
    }
  }

  // Delete a turn
  const handleDelete = async (turnId: number): Promise<void> => {
    try {
      await fetch(`${API_URL}/turns/${turnId}`, {
        method: 'DELETE'
      })
      fetchTurns()
    } catch (error) {
      console.error('Error deleting turn:', error)
    }
  }

  // Clear all turns
  const handleClearAll = async (): Promise<void> => {
    try {
      await fetch(`${API_URL}/turns`, {
        method: 'DELETE'
      })
      fetchTurns()
    } catch (error) {
      console.error('Error clearing turns:', error)
    }
  }

  useEffect(() => {
    fetchTurns()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>🎲 GloomHeaven Turn Assistant</h1>
        <p className={`status ${apiStatus === 'connected' ? 'connected' : 'disconnected'}`}>
          API: {apiStatus}
        </p>
      </header>

      <div className="container">
        <div className="add-turn-section">
          <h2>Add Turn</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="player">Player/Character:</label>
              <input
                id="player"
                type="text"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                placeholder="Enter player name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="action">Action:</label>
              <input
                id="action"
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Enter action"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="initiative">Initiative:</label>
              <input
                id="initiative"
                type="number"
                value={initiative}
                onChange={(e) => setInitiative(e.target.value)}
                placeholder="Enter initiative value"
                required
                min="1"
                max="99"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Turn</button>
          </form>
        </div>

        <div className="turns-section">
          <div className="turns-header">
            <h2>Turn Order</h2>
            {turns.length > 0 && (
              <button onClick={handleClearAll} className="btn btn-danger">
                Clear All
              </button>
            )}
          </div>

          {turns.length === 0 ? (
            <p className="empty-message">No turns yet. Add a turn to get started!</p>
          ) : (
            <div className="turns-list">
              {turns.map((turn: Turn) => (
                <div key={turn.id} className="turn-card">
                  <div className="turn-info">
                    <div className="initiative-badge">{turn.initiative}</div>
                    <div className="turn-details">
                      <h3>{turn.player}</h3>
                      <p>{turn.action}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(turn.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
