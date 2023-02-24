import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './stle/style.css'
import Navbar from './Components/Navbar'
import Header from './Components/Header'
import Clock from './Components/Clock'
import Contestant from './Components/Contestant'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <header>
        <Header />
      </header>
      <div id="Gallery" className="m-0">
        <Clock />
        <Contestant />
      </div>
      <Footer />
    </div>
  )
}

export default App
