import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Boxen AI</p>
    </div>
  )
}

function Mailbox() {
  return (
    <div>
      <h1>Mailbox</h1>
      <p>Your emails will appear here</p>
    </div>
  )
}

function Chat() {
  return (
    <div>
      <h1>Chat Assistant</h1>
      <p>Ask questions about your emails</p>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Boxen AI</h1>
        <nav>
          <SignedIn>
            <Link to="/">Dashboard</Link>
            <Link to="/mailbox">Mailbox</Link>
            <Link to="/chat">Chat</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </nav>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mailbox" element={<Mailbox />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
