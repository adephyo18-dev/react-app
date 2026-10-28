import { useState } from 'react'
import LogIn from './components/LoginComponent'
import Counter from './components/Counter'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LogIn />
      <Counter count={count} setCount={setCount} />
    </>
  )
}

export default App
