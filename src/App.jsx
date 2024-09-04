import { useState } from 'react'
import Tasks from './components/Tasks/Tasks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tasks></Tasks>
    </>
  )
}

export default App
