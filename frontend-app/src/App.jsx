import React, { useState } from 'react'
import FilterPanel from './components/FilterPanel'
import ResultsList from './components/ResultsList'
import './App.css'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchType, setSearchType] = useState('matches')

  const handleSearch = async (filters) => {
    setLoading(true)
    setError(null)
    
    try {
      setResults(filters.results || [])
    } catch (err) {
      setError('Error al realizar la búsqueda. Por favor, intenta nuevamente.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>API de Fútbol</h1>
        <p>Consulta y filtra información sobre equipos, jugadores y partidos</p>
      </header>

      <main className="app-main">
        <FilterPanel 
          onSearch={handleSearch}
          searchType={searchType}
          setSearchType={setSearchType}
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
        />
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando resultados...</p>
          </div>
        ) : (
          <ResultsList 
            results={results} 
            searchType={searchType}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Desarrollado por Ignacio Lopez, Nicolas Paez, Paco Fontana</p>
      </footer>
    </div>
  )
}

export default App
